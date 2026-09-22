import { useState } from "react";
import type { Build } from "../domain/types";
import { downloadBuild } from "../lib/exportBuildCard";
import { useBuildStore } from "../state/useBuildStore";

export function useBuildExport() {
  const [exportingId, setExportingId] = useState<string | null>(null);
  const { notify } = useBuildStore();

  async function exportBuild(build: Build) {
    setExportingId(build.id);
    try {
      await downloadBuild(build);
      notify("Your build card is ready.");
    } catch {
      notify("The build card could not be created. Please try again.");
    } finally {
      setExportingId(null);
    }
  }

  return { exportingId, exportBuild };
}
