import { useContext } from "react";
import { BuildContext } from "./BuildContext";

export function useBuildStore() {
  const context = useContext(BuildContext);
  if (!context)
    throw new Error("useBuildStore must be used inside BuildProvider");
  return context;
}
