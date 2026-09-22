import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import type { Angle } from "../../../domain/types";
import { VIEW_ANGLES } from "../constants";

type VehicleViewControlsProps = {
  angle: Angle;
  showInterior: boolean;
  caption: string;
  expanded: boolean;
  onAngleChange: (angle: Angle) => void;
  onTurn: (direction: number) => void;
  onToggleExpanded: () => void;
};

export function VehicleViewControls({
  angle,
  showInterior,
  caption,
  expanded,
  onAngleChange,
  onTurn,
  onToggleExpanded,
}: VehicleViewControlsProps) {
  return (
    <div className="viewer-bottom">
      <div className="angle-controls">
        {showInterior ? (
          <span>Interior view</span>
        ) : (
          <>
            <button
              className="icon-button"
              onClick={() => onTurn(-1)}
              aria-label="Previous view"
            >
              <ChevronLeft size={18} />
            </button>
            <div aria-label="Vehicle angle">
              {VIEW_ANGLES.map((view) => (
                <button
                  key={view}
                  className={view === angle ? "active" : ""}
                  aria-label={`${view} view`}
                  aria-pressed={view === angle}
                  onClick={() => onAngleChange(view)}
                >
                  <span />
                </button>
              ))}
            </div>
            <button
              className="icon-button"
              onClick={() => onTurn(1)}
              aria-label="Next view"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
      <span className="viewer-caption">{caption}</span>
      <button
        className="icon-button expand-button"
        aria-label={expanded ? "Exit full preview" : "Expand vehicle preview"}
        onClick={onToggleExpanded}
      >
        {expanded ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
      </button>
    </div>
  );
}
