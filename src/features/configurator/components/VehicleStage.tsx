import { useRef } from "react";
import { AnimatePresence } from "motion/react";
import { VehicleImage } from "./VehicleImage";

type VehicleStageProps = {
  src: string;
  alt: string;
  showInterior: boolean;
  onTurn: (direction: number) => void;
};
const SWIPE_THRESHOLD = 45;

export function VehicleStage({
  src,
  alt,
  showInterior,
  onTurn,
}: VehicleStageProps) {
  const touchStartX = useRef<number | null>(null);

  return (
    <div
      className={`car-stage ${showInterior ? "interior-stage" : ""}`}
      tabIndex={0}
      aria-label={
        showInterior
          ? "Interior preview"
          : "Vehicle views. Use left and right arrow keys or swipe to rotate."
      }
      onKeyDown={(event) => {
        if (showInterior || !["ArrowLeft", "ArrowRight"].includes(event.key))
          return;
        event.preventDefault();
        onTurn(event.key === "ArrowRight" ? 1 : -1);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (!showInterior && touchStartX.current !== null) {
          const distance =
            event.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(distance) > SWIPE_THRESHOLD)
            onTurn(distance < 0 ? 1 : -1);
        }
        touchStartX.current = null;
      }}
    >
      {!showInterior && (
        <span className="viewer-watermark" aria-hidden="true">
          911
        </span>
      )}
      <AnimatePresence initial={false} mode="sync">
        <VehicleImage key={src} src={src} alt={alt} />
      </AnimatePresence>
    </div>
  );
}
