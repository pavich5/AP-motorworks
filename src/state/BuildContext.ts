import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Build } from "../domain/types";

export type BuildStore = {
  garage: Build[];
  draft: Build;
  setDraft: Dispatch<SetStateAction<Build>>;
  save: (build: Build) => boolean;
  remove: (id: string) => void;
  restore: (build: Build) => void;
  notify: (message: string) => void;
  toast: string;
  storageError: boolean;
};

export const BuildContext = createContext<BuildStore | null>(null);
