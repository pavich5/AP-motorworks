import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import ts from "typescript";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Compile pure domain modules into an isolated temporary directory, without a browser or bundler.
const outputDirectory = await mkdtemp(join(tmpdir(), "ap-motorworks-check-"));
const sourceDirectory = fileURLToPath(new URL("../src", import.meta.url));
const program = ts.createProgram(
  [
    join(sourceDirectory, "domain/models.ts"),
    join(sourceDirectory, "domain/sharing.ts"),
    join(sourceDirectory, "state/storage.ts"),
  ],
  {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    rootDir: sourceDirectory,
    outDir: outputDirectory,
    strict: true,
    skipLibCheck: true,
    noEmitOnError: true,
  },
);
try {
  const result = program.emit();
  assert.equal(
    result.emitSkipped,
    false,
    ts.formatDiagnosticsWithColorAndContext(ts.getPreEmitDiagnostics(program), {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => "\n",
    }),
  );
  await writeFile(join(outputDirectory, "package.json"), '{"type":"commonjs"}');
  const require = createRequire(join(outputDirectory, "check.cjs"));
  const {
    paints,
    wheels,
    interiors,
    packages,
  } = require("./domain/catalog.js");
  const {
    createBuild,
    isBuild,
    calculateBuildPrice,
    getVehicleImage,
  } = require("./domain/configuration.js");
  const { models } = require("./domain/models.js");
  const { createShareUrl, parseSharedBuild } = require("./domain/sharing.js");
  const { loadGarage, loadDraft, STORAGE_KEYS } = require("./state/storage.js");

  const build = createBuild();
  assert.equal(calculateBuildPrice(build), 177980);
  assert.equal(isBuild(build), true);
  assert.equal(calculateBuildPrice({ ...build, paint: "white" }), 175000);
  assert.equal(
    calculateBuildPrice({
      ...build,
      paint: "green",
      wheels: "exclusive",
      interior: "red",
      options: ["sound"],
    }),
    185420,
  );
  assert.equal(
    calculateBuildPrice({ ...build, options: packages.map((p) => p.id) }),
    187950,
  );
  assert.equal(isBuild({ ...build, paint: "unknown" }), false);
  assert.equal(isBuild({ ...build, options: ["sound", "sound"] }), false);
  assert.equal(isBuild({ ...build, options: ["invented"] }), false);
  assert.equal(isBuild({ ...build, name: "a".repeat(61) }), false);
  assert.equal(isBuild(null), false);
  const assets = new Set([
    "/images/hero.webp",
    "/images/driving.webp",
    "/images/interior.webp",
    "/images/wheel-standard.webp",
    "/images/wheel-exclusive.webp",
    ...models.map((m) => m.image),
  ]);
  for (const paint of paints)
    for (const wheel of wheels)
      for (const angle of ["front", "side", "rear"])
        assets.add(
          getVehicleImage({ paint: paint.id, wheels: wheel.id }, angle),
        );
  for (const interior of interiors)
    assets.add(`/images/interior-${interior.id}.webp`);
  for (const file of assets)
    await access(new URL(`../public${file}`, import.meta.url));
  console.log(
    `Passed configuration pricing, input validation, and ${assets.size} local asset checks.`,
  );

  const sharedBuild = {
    ...build,
    paint: "green",
    wheels: "exclusive",
    interior: "red",
    options: ["sound"],
  };
  const sharedUrl = new URL(
    createShareUrl(sharedBuild, "https://example.test"),
  );
  const decoded = parseSharedBuild(sharedUrl.searchParams);
  for (const field of ["paint", "wheels", "interior", "options"])
    assert.deepEqual(decoded[field], sharedBuild[field]);
  assert.notEqual(decoded.id, build.id);
  assert.equal(parseSharedBuild(new URLSearchParams("paint=unknown")), null);
  const sanitized = parseSharedBuild(
    new URLSearchParams(
      "paint=white&wheels=unknown&interior=unknown&options=sound,sound,unknown",
    ),
  );
  assert.equal(sanitized.wheels, "standard");
  assert.equal(sanitized.interior, "black");
  assert.deepEqual(sanitized.options, ["sound"]);
  const stored = {
    getItem: (key) =>
      key === STORAGE_KEYS.garage
        ? JSON.stringify([build, { ...build, paint: "unknown" }])
        : JSON.stringify(sharedBuild),
  };
  assert.equal(STORAGE_KEYS.garage, "nine-eleven-garage-v1");
  assert.equal(STORAGE_KEYS.draft, "nine-eleven-draft-v1");
  assert.deepEqual(loadGarage(stored), [build]);
  assert.deepEqual(loadDraft(stored), sharedBuild);
  assert.equal(
    loadGarage({
      getItem: () =>
        JSON.stringify(Array.from({ length: 35 }, () => createBuild())),
    }).length,
    30,
  );
  for (const storage of [
    { getItem: () => "broken json" },
    {
      getItem: () => {
        throw Error("Storage denied");
      },
    },
  ]) {
    assert.deepEqual(loadGarage(storage), []);
    assert.equal(isBuild(loadDraft(storage)), true);
  }
  console.log(
    "Passed shared-link round trips, sanitization, legacy storage compatibility, and storage failure recovery.",
  );
} finally {
  await rm(outputDirectory, { recursive: true, force: true });
}
