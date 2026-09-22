import { Check } from "lucide-react";
import { ChoicePrice } from "../components/ChoicePrice";
import { paints } from "../../../domain/catalog";
import { getBuildSelections } from "../../../domain/configuration";
import type { ConfigurationStepProps } from "../types";

export function ExteriorStep({ draft, update }: ConfigurationStepProps) {
  const { paint } = getBuildSelections(draft);
  return (
    <>
      <div className="options-heading">
        <span className="eyebrow">01 / EXTERIOR</span>
        <h2>Set the tone.</h2>
        <p>Some colors are seen. Others are felt.</p>
      </div>
      <div className="selected-paint">
        <div>
          <span className="large-swatch" style={{ background: paint.color }} />
          <strong>
            {paint.name}
            <small>{paint.family}</small>
          </strong>
        </div>
        <ChoicePrice value={paint.price} />
      </div>
      <div className="paint-grid" aria-label="Exterior paint">
        {paints.map((p) => (
          <button
            className={`paint-choice ${draft.paint === p.id ? "selected" : ""}`}
            key={p.id}
            aria-pressed={draft.paint === p.id}
            aria-label={p.name}
            onClick={() => update({ paint: p.id })}
          >
            <span className="paint-swatch" style={{ background: p.color }}>
              {p.id === draft.paint && (
                <Check
                  size={19}
                  color={
                    p.id === "white" || p.id === "silver" ? "#222" : "white"
                  }
                />
              )}
            </span>
            <span>{p.name}</span>
          </button>
        ))}
      </div>
      <div className="option-note">
        <span className="tiny-line" />
        <p>
          A shade for every side of you.
          <br />
          Explore all six curated finishes.
        </p>
      </div>
    </>
  );
}
