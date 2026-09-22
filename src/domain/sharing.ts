import { paints, wheels, interiors, packages } from "./catalog";
import { createBuild } from "./configuration";
import type { Build } from "./types";

export function parseSharedBuild(params: URLSearchParams): Build | null {
  const paint = paints.find((paint) => paint.id === params.get("paint"));
  if (!paint) return null;

  const wheel = wheels.find((wheel) => wheel.id === params.get("wheels"));
  const interior = interiors.find(
    (interior) => interior.id === params.get("interior"),
  );
  const options = [...new Set((params.get("options") || "").split(","))].filter(
    (id) => packages.some((option) => option.id === id),
  );

  return {
    ...createBuild(),
    paint: paint.id,
    wheels: wheel?.id ?? "standard",
    interior: interior?.id ?? "black",
    options,
  };
}

export function createShareUrl(build: Build, origin: string): string {
  const query = new URLSearchParams({
    paint: build.paint,
    wheels: build.wheels,
    interior: build.interior,
    options: build.options.join(","),
  });
  return `${origin}/configure?${query}`;
}
