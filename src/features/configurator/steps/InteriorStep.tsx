import { Check } from "lucide-react";
import { ChoicePrice } from "../components/ChoicePrice";
import { interiors } from "../../../domain/catalog";
import type { ConfigurationStepProps } from "../types";

export function InteriorStep({ draft, update }: ConfigurationStepProps) {
  return (
    <>
      <div className="options-heading">
        <span className="eyebrow">03 / INTERIOR</span>
        <h2>Your inner world.</h2>
        <p>A cockpit that feels like home.</p>
      </div>
      <div className="choice-list">
        {interiors.map((i) => (
          <button
            className={`equipment-choice interior-choice ${draft.interior === i.id ? "selected" : ""}`}
            key={i.id}
            aria-pressed={draft.interior === i.id}
            onClick={() => update({ interior: i.id })}
          >
            <span className="trim-swatch" style={{ background: i.color }} />
            <span>
              <strong>{i.name}</strong>
              <small>{i.detail}</small>
              <ChoicePrice value={i.price} />
            </span>
            <span className="radio-mark">
              {draft.interior === i.id && <Check size={13} />}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
