import { createBuild, isBuild } from "../domain/configuration";
import type { Build } from "../domain/types";

// Preserve the original keys so saved builds survive the brand and code changes.
export const STORAGE_KEYS = {
  garage: "nine-eleven-garage-v1",
  draft: "nine-eleven-draft-v1",
} as const;
export const MAX_SAVED_BUILDS = 30;

type ReadableStorage = Pick<Storage, "getItem">;

export function loadGarage(storage?: ReadableStorage): Build[] {
  try {
    const value: unknown = JSON.parse(
      (storage ?? localStorage).getItem(STORAGE_KEYS.garage) || "[]",
    );
    return Array.isArray(value)
      ? value.filter(isBuild).slice(0, MAX_SAVED_BUILDS)
      : [];
  } catch {
    return [];
  }
}

export function loadDraft(storage?: ReadableStorage): Build {
  try {
    const value: unknown = JSON.parse(
      (storage ?? localStorage).getItem(STORAGE_KEYS.draft) || "null",
    );
    if (isBuild(value)) return value;
  } catch {
    // Missing, malformed, or unavailable storage starts a fresh configuration.
  }
  return createBuild();
}

export function saveGarage(builds: Build[]) {
  localStorage.setItem(STORAGE_KEYS.garage, JSON.stringify(builds));
}

export function saveDraft(build: Build) {
  localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(build));
}
