import { useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Build } from "../domain/types";
import { BuildContext } from "./BuildContext";
import {
  loadGarage,
  loadDraft,
  saveGarage,
  saveDraft,
  MAX_SAVED_BUILDS,
} from "./storage";

export function BuildProvider({ children }: { children: ReactNode }) {
  const [garage, setGarage] = useState(() => loadGarage());
  const [draft, setDraft] = useState(() => loadDraft());
  const [toast, setToast] = useState("");
  const [storageError, setStorageError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const notify = useCallback((message: string) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 4000);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    try {
      saveDraft(draft);
    } catch {
      setStorageError(true);
    }
  }, [draft]);
  const save = useCallback(
    (build: Build) => {
      const next = [build, ...garage.filter((b) => b.id !== build.id)].slice(
        0,
        MAX_SAVED_BUILDS,
      );
      try {
        saveGarage(next);
        setGarage(next);
        notify("Your 911 is saved to your garage.");
        return true;
      } catch {
        setStorageError(true);
        notify("Browser storage is full. Download your build card to keep it.");
        return false;
      }
    },
    [garage, notify],
  );
  const remove = (id: string) => {
    const next = garage.filter((b) => b.id !== id);
    try {
      saveGarage(next);
      setGarage(next);
      notify("Build removed from your garage.");
    } catch {
      notify("Unable to update browser storage.");
    }
  };
  const restore = (build: Build) => {
    setDraft(build);
  };
  return (
    <BuildContext.Provider
      value={{
        garage,
        draft,
        setDraft,
        save,
        remove,
        restore,
        notify,
        toast,
        storageError,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}
