import { basePrice, paints, wheels, interiors, packages } from "./catalog";
import type { Build, Angle } from "./types";
export const createBuild = (): Build => ({
  id: crypto.randomUUID(),
  name: "My Carrera GTS",
  paint: "slate",
  wheels: "standard",
  interior: "black",
  options: [],
  createdAt: Date.now(),
});
export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
export const calculateBuildPrice = (build: Build) =>
  basePrice +
  (paints.find((paint) => paint.id === build.paint)?.price ?? 0) +
  (wheels.find((wheel) => wheel.id === build.wheels)?.price ?? 0) +
  (interiors.find((interior) => interior.id === build.interior)?.price ?? 0) +
  packages
    .filter((option) => build.options.includes(option.id))
    .reduce((sum, option) => sum + option.price, 0);
export const getVehicleImage = (
  build: Pick<Build, "paint" | "wheels">,
  angle: Angle = "front",
) =>
  `/images/${build.paint}${build.wheels === "exclusive" ? "-exclusive" : ""}-${angle}.webp`;
export function isBuild(value: unknown): value is Build {
  if (!value || typeof value !== "object") return false;
  const build = value as Build;
  return (
    typeof build.id === "string" &&
    typeof build.name === "string" &&
    build.name.length <= 60 &&
    paints.some((paint) => paint.id === build.paint) &&
    wheels.some((wheel) => wheel.id === build.wheels) &&
    interiors.some((interior) => interior.id === build.interior) &&
    Array.isArray(build.options) &&
    build.options.every((id) => packages.some((p) => p.id === id)) &&
    new Set(build.options).size === build.options.length &&
    Number.isFinite(build.createdAt)
  );
}
export function getBuildSelections(build: Build) {
  return {
    paint: paints.find((paint) => paint.id === build.paint)!,
    wheel: wheels.find((wheel) => wheel.id === build.wheels)!,
    interior: interiors.find((interior) => interior.id === build.interior)!,
  };
}
