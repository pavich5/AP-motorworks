import type { Build, BuildPatch } from "../../domain/types";

export type ConfigurationStep =
  | "exterior"
  | "wheels"
  | "interior"
  | "options"
  | "summary";
export type ConfigurationStepProps = {
  draft: Build;
  update: (patch: BuildPatch) => void;
};
export type SummaryStepProps = ConfigurationStepProps & {
  onStepChange: (step: ConfigurationStep) => void;
  onSave: () => void;
  onExport: () => void;
  onShare: () => void;
  isSaved: boolean;
  isExporting: boolean;
};
