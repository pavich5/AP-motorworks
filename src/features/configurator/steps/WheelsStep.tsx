import { Check } from "lucide-react";
import { ChoicePrice } from "../components/ChoicePrice";
import { wheels } from "../../../domain/catalog";
import type { ConfigurationStepProps } from "../types";

export function WheelsStep({
  draft,
  update,
  onWheelChange,
}: ConfigurationStepProps & { onWheelChange: () => void }) {
  return (
    <>
      <div className="options-heading">
        <span className="eyebrow">02 / WHEELS</span>
        <h2>Grounded in detail.</h2>
        <p>A defining finishing touch.</p>
      </div>
      <div className="choice-list">
        {wheels.map((w) => (
          <button
            key={w.id}
            className={`equipment-choice ${draft.wheels === w.id ? "selected" : ""}`}
            aria-pressed={draft.wheels === w.id}
            onClick={() => {
              update({ wheels: w.id });
              onWheelChange();
            }}
          >
            <img
              className="wheel-thumbnail"
              src={`/images/wheel-${w.id}.webp`}
              alt=""
            />
            <span>
              <strong>{w.name}</strong>
              <small>{w.detail}</small>
              <ChoicePrice value={w.price} />
            </span>
            <span className="radio-mark">
              {draft.wheels === w.id && <Check size={13} />}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
