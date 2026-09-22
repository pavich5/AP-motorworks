import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  LoaderCircle,
  Heart,
  Share2,
} from "lucide-react";
import { packages, basePrice } from "../../../domain/catalog";
import {
  formatPrice,
  calculateBuildPrice,
  getBuildSelections,
} from "../../../domain/configuration";
import type { SummaryStepProps } from "../types";

export function SummaryStep({
  draft,
  update,
  onStepChange,
  onSave,
  isSaved,
  isExporting,
  onExport,
  onShare,
}: SummaryStepProps) {
  const { paint, wheel, interior } = getBuildSelections(draft);
  return (
    <>
      <div className="options-heading">
        <span className="eyebrow">05 / YOUR CONFIGURATION</span>
        <h2>One of your kind.</h2>
        <p>A 911, with your signature on it.</p>
      </div>
      <label className="build-name">
        Give your build a name
        <input
          maxLength={60}
          value={draft.name}
          onChange={(e) => update({ name: e.target.value })}
          onBlur={() => {
            if (!draft.name.trim()) update({ name: "My Carrera GTS" });
          }}
          placeholder="My Carrera GTS"
        />
      </label>
      <div className="summary-list">
        <div>
          <span>911 Carrera GTS</span>
          <span>{formatPrice(basePrice)}</span>
        </div>
        {[
          { name: paint.name, price: paint.price, step: "exterior" as const },
          { name: wheel.name, price: wheel.price, step: "wheels" as const },
          {
            name: interior.name,
            price: interior.price,
            step: "interior" as const,
          },
          ...packages
            .filter((item) => draft.options.includes(item.id))
            .map((item) => ({
              name: item.name,
              price: item.price,
              step: "options" as const,
            })),
        ].map((item) => (
          <button key={item.name} onClick={() => onStepChange(item.step)}>
            <span>{item.name}</span>
            <span>
              {item.price === 0 ? "Included" : formatPrice(item.price)}
              <ChevronRight size={13} />
            </span>
          </button>
        ))}
      </div>
      <div className="summary-total">
        <span>Your configuration</span>
        <strong>{formatPrice(calculateBuildPrice(draft))}</strong>
      </div>
      <button className="button button-light save-build" onClick={onSave}>
        {isSaved ? <Check size={17} /> : <Heart size={17} />}{" "}
        {isSaved ? "Saved to your garage" : "Save to my garage"}
        <ArrowUpRight size={17} />
      </button>
      <div className="summary-actions">
        <button onClick={onExport} disabled={isExporting}>
          {isExporting ? (
            <LoaderCircle className="spin" size={16} />
          ) : (
            <Download size={16} />
          )}
          Download build card
        </button>
        <button onClick={onShare}>
          <Share2 size={15} />
          Share build
        </button>
      </div>
      <p className="fine-print">
        All prices are illustrative concept estimates, not official Porsche
        pricing or an offer to sell. Your saved builds stay on this device.
      </p>
    </>
  );
}
