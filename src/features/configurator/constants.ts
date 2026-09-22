import type { Angle } from "../../domain/types";
import type { ConfigurationStep } from "./types";

export const CONFIGURATION_STEPS: { id: ConfigurationStep; label: string }[] = [
  { id: "exterior", label: "Exterior" },
  { id: "wheels", label: "Wheels" },
  { id: "interior", label: "Interior" },
  { id: "options", label: "Options" },
  { id: "summary", label: "Summary" },
];
export const VIEW_ANGLES: Angle[] = ["front", "side", "rear"];

export function getNextStep(current: ConfigurationStep): ConfigurationStep {
  const index = CONFIGURATION_STEPS.findIndex((step) => step.id === current);
  return CONFIGURATION_STEPS[
    Math.min(index + 1, CONFIGURATION_STEPS.length - 1)
  ].id;
}
