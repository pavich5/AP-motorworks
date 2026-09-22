import { Check, Plus } from "lucide-react";
import { ChoicePrice } from "../components/ChoicePrice";
import { packages } from "../../../domain/catalog";
import type { ConfigurationStepProps } from "../types";

export function OptionsStep({ draft, update }: ConfigurationStepProps) {
  return (
    <>
      <div className="options-heading">
        <span className="eyebrow">04 / OPTIONS</span>
        <h2>A little more you.</h2>
        <p>The details that make every drive yours.</p>
      </div>
      <div className="packages">
        {packages.map((p) => (
          <label
            className={`package ${draft.options.includes(p.id) ? "selected" : ""}`}
            key={p.id}
          >
            <input
              type="checkbox"
              checked={draft.options.includes(p.id)}
              onChange={() =>
                update({
                  options: draft.options.includes(p.id)
                    ? draft.options.filter((id) => id !== p.id)
                    : [...draft.options, p.id],
                })
              }
            />
            <span>
              <strong>{p.name}</strong>
              <small>{p.description}</small>
              <ChoicePrice value={p.price} />
            </span>
            <span className="checkbox-mark">
              {draft.options.includes(p.id) ? (
                <Check size={15} />
              ) : (
                <Plus size={15} />
              )}
            </span>
          </label>
        ))}
      </div>
      <p className="fine-print">
        Options are included in your estimate and build summary. Exterior
        preview shows selected paint and wheels.
      </p>
    </>
  );
}
