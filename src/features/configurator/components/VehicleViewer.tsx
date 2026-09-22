import { useEffect } from "react";
import {
  getBuildSelections,
  getVehicleImage,
} from "../../../domain/configuration";
import type { Angle, Build } from "../../../domain/types";
import { VIEW_ANGLES } from "../constants";
import { VehicleStage } from "./VehicleStage";
import { VehicleViewControls } from "./VehicleViewControls";

type VehicleViewerProps = {
  draft: Build;
  showInterior: boolean;
  angle: Angle;
  expanded: boolean;
  onAngleChange: (angle: Angle) => void;
  onToggleExpanded: () => void;
};

export function VehicleViewer({
  draft,
  showInterior,
  angle,
  expanded,
  onAngleChange,
  onToggleExpanded,
}: VehicleViewerProps) {
  const { paint, wheel, interior } = getBuildSelections(draft);
  const { paint: paintId, wheels: wheelId } = draft;
  const image = showInterior
    ? `/images/interior-${draft.interior}.webp`
    : getVehicleImage(draft, angle);
  const alt = showInterior
    ? `${interior.name} interior`
    : `${paint.name} 911 Carrera GTS, ${angle} view, ${wheel.name}`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      for (const view of VIEW_ANGLES) {
        const image = new Image();
        image.src = getVehicleImage({ paint: paintId, wheels: wheelId }, view);
      }
    }, 500);
    return () => window.clearTimeout(timer);
  }, [paintId, wheelId]);

  function turn(direction: number) {
    const nextIndex =
      (VIEW_ANGLES.indexOf(angle) + direction + VIEW_ANGLES.length) %
      VIEW_ANGLES.length;
    onAngleChange(VIEW_ANGLES[nextIndex]);
  }

  return (
    <section className="config-viewer" aria-label="Vehicle preview">
      <div className="viewer-title">
        <p className="eyebrow">PERFORMANCE. WITH PERSONALITY.</p>
        <h1>911 Carrera GTS</h1>
        <span className="viewer-tag">T-Hybrid</span>
      </div>
      <VehicleStage
        src={image}
        alt={alt}
        showInterior={showInterior}
        onTurn={turn}
      />
      <VehicleViewControls
        angle={angle}
        showInterior={showInterior}
        caption={showInterior ? interior.name : paint.name}
        expanded={expanded}
        onAngleChange={onAngleChange}
        onTurn={turn}
        onToggleExpanded={onToggleExpanded}
      />
      <div className="viewer-performance">
        <div>
          <strong>
            541 <small>PS</small>
          </strong>
          <span>Combined power</span>
        </div>
        <div>
          <strong>
            3.0 <small>s</small>
          </strong>
          <span>0–100 km/h</span>
        </div>
        <div>
          <strong>
            312 <small>km/h</small>
          </strong>
          <span>Top speed</span>
        </div>
      </div>
    </section>
  );
}
