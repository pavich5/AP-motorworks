import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Wait for the destination route to mount before finding its anchor.
    const timer = window.setTimeout(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
      });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
}
