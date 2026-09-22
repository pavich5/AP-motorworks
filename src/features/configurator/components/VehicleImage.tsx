import { useState } from "react";
import { motion } from "motion/react";
import { LoaderCircle } from "lucide-react";

// The parent keys this component by source, keeping loading state isolated
// while the previous image completes its exit animation.
export function VehicleImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  function retry() {
    setFailed(false);
    setLoaded(false);
    setAttempt((previous) => previous + 1);
  }

  return (
    <>
      <motion.img
        key={attempt}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
      {!loaded && !failed && (
        <LoaderCircle className="image-loading spin" size={24} />
      )}
      {failed && (
        <div className="image-error">
          The preview could not load.<button onClick={retry}>Try again</button>
        </div>
      )}
    </>
  );
}
