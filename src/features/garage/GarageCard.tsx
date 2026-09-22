import { Trash2, Download, Pencil, LoaderCircle } from "lucide-react";
import { paints, interiors } from "../../domain/catalog";
import {
  formatPrice,
  calculateBuildPrice,
  getVehicleImage,
} from "../../domain/configuration";
import type { Build } from "../../domain/types";

type GarageCardProps = {
  build: Build;
  isExporting: boolean;
  onRemove: (build: Build) => void;
  onEdit: (build: Build) => void;
  onExport: (build: Build) => void;
};
export function GarageCard({
  build,
  isExporting,
  onRemove,
  onEdit,
  onExport,
}: GarageCardProps) {
  return (
    <article className="garage-card">
      <div className="garage-card-heading">
        <span className="model-category">911 CARRERA GTS</span>
        <button
          className="icon-button"
          aria-label={`Remove ${build.name}`}
          onClick={() => onRemove(build)}
        >
          <Trash2 size={17} />
        </button>
      </div>
      <img
        src={getVehicleImage(build)}
        alt={`${paints.find((p) => p.id === build.paint)!.name} Carrera GTS`}
      />
      <div className="garage-card-content">
        <h2>{build.name}</h2>
        <p>
          {paints.find((p) => p.id === build.paint)!.name} <span>·</span>{" "}
          {interiors.find((i) => i.id === build.interior)!.name}
        </p>
        <strong>
          {formatPrice(calculateBuildPrice(build))}
          <small>Concept estimate</small>
        </strong>
        <div className="garage-card-actions">
          <button
            className="button button-outline"
            onClick={() => onEdit(build)}
          >
            <Pencil size={16} /> Edit build
          </button>
          <button
            className="icon-button"
            disabled={isExporting}
            aria-label={`Download ${build.name} build card`}
            onClick={() => onExport(build)}
          >
            {isExporting ? (
              <LoaderCircle className="spin" size={19} />
            ) : (
              <Download size={19} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
