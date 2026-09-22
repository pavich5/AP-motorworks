import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { createShareUrl, parseSharedBuild } from "../../../domain/sharing";
import { useBuildStore } from "../../../state/useBuildStore";

export function useSharedConfiguration() {
  const { draft, setDraft, notify } = useBuildStore();
  const [params, setParams] = useSearchParams();
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    if (!params.has("paint")) return;

    const sharedBuild = parseSharedBuild(params);
    if (sharedBuild) {
      setDraft(sharedBuild);
      notify("Shared configuration loaded.");
    } else {
      notify("That paint is unavailable. Your current build is unchanged.");
    }
    setParams({}, { replace: true });
  }, [params, setParams, setDraft, notify]);

  async function shareBuild() {
    const url = createShareUrl(draft, window.location.origin);
    try {
      await navigator.clipboard.writeText(url);
      notify("Configuration link copied.");
    } catch {
      notify("Copy the configuration link from your address bar.");
      window.history.replaceState(null, "", url);
    }
  }

  return { shareBuild };
}
