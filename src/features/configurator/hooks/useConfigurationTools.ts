import { useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { interiors, packages, paints, wheels } from "../../../domain/catalog";
import { calculateBuildPrice } from "../../../domain/configuration";
import type { Build } from "../../../domain/types";
type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean };
  execute: (input: unknown) => unknown;
};
type Context = {
  registerTool: (
    tool: Tool,
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};
export function useConfigurationTools(
  build: Build,
  setBuild: Dispatch<SetStateAction<Build>>,
) {
  const latest = useRef(build);
  latest.current = build;
  useEffect(() => {
    const context = (document as Document & { modelContext?: Context })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: Tool) => {
      try {
        void Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch(() => {});
      } catch {}
    };
    register({
      name: "get_911_configuration",
      description:
        "Read the current Carrera GTS configuration and illustrative EUR estimate.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: () => ({
        ...latest.current,
        estimateEUR: calculateBuildPrice(latest.current),
      }),
    });
    register({
      name: "configure_911",
      description:
        "Update the visible Carrera GTS paint, wheels, interior, or optional equipment. Does not save a garage build.",
      inputSchema: {
        type: "object",
        properties: {
          paint: { type: "string", enum: paints.map((p) => p.id) },
          wheels: { type: "string", enum: wheels.map((w) => w.id) },
          interior: { type: "string", enum: interiors.map((i) => i.id) },
          options: {
            type: "array",
            items: { type: "string", enum: packages.map((p) => p.id) },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: async (input) => {
        if (!input || typeof input !== "object" || Array.isArray(input))
          throw Error("Expected configuration object");
        const patch = input as Partial<Build>;
        if (
          Object.keys(patch).some(
            (k) => !["paint", "wheels", "interior", "options"].includes(k),
          )
        )
          throw Error("Unknown configuration field");
        if (
          patch.paint !== undefined &&
          !paints.some((p) => p.id === patch.paint)
        )
          throw Error("Invalid paint");
        if (
          patch.wheels !== undefined &&
          !wheels.some((w) => w.id === patch.wheels)
        )
          throw Error("Invalid wheels");
        if (
          patch.interior !== undefined &&
          !interiors.some((i) => i.id === patch.interior)
        )
          throw Error("Invalid interior");
        if (
          patch.options !== undefined &&
          (!Array.isArray(patch.options) ||
            patch.options.some((id) => !packages.some((p) => p.id === id)) ||
            new Set(patch.options).size !== patch.options.length)
        )
          throw Error("Invalid options");
        const next = { ...latest.current, ...patch };
        setBuild(next);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
        return { ...next, estimateEUR: calculateBuildPrice(next) };
      },
    });
    return () => lifecycle.abort();
  }, [setBuild]);
}
