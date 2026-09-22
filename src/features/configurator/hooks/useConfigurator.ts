import { useEffect, useState } from "react";
import { createBuild } from "../../../domain/configuration";
import type { Angle, BuildPatch } from "../../../domain/types";
import { useBuildStore } from "../../../state/useBuildStore";
import { useBuildExport } from "../../../hooks/useBuildExport";
import { useSharedConfiguration } from "./useSharedConfiguration";
import { useConfigurationTools } from "./useConfigurationTools";
import type { ConfigurationStep } from "../types";

export function useConfigurator() {
  const { draft, setDraft, garage, save, notify } = useBuildStore();
  const [step, setStep] = useState<ConfigurationStep>("exterior");
  const [angle, setAngle] = useState<Angle>("front");
  const [expanded, setExpanded] = useState(false);
  const [resetting, setResetting] = useState(false);
  const { exportingId, exportBuild } = useBuildExport();
  const { shareBuild } = useSharedConfiguration();
  useConfigurationTools(draft, setDraft);

  useEffect(() => {
    if (!expanded) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [expanded]);

  function updateBuild(patch: BuildPatch) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function resetBuild() {
    setDraft(createBuild());
    setStep("exterior");
    setAngle("front");
    setResetting(false);
    notify("Ready for a fresh interpretation.");
  }

  function saveBuild() {
    save({ ...draft, name: draft.name.trim() || "My Carrera GTS" });
  }

  const isSaved = garage.some(
    (saved) =>
      saved.id === draft.id && JSON.stringify(saved) === JSON.stringify(draft),
  );

  return {
    draft,
    step,
    setStep,
    angle,
    setAngle,
    expanded,
    setExpanded,
    resetting,
    setResetting,
    updateBuild,
    resetBuild,
    saveBuild,
    shareBuild,
    exportBuild: () => exportBuild(draft),
    isExporting: exportingId === draft.id,
    isSaved,
  };
}
