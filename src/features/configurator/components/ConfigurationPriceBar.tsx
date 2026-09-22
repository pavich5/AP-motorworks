import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  formatPrice,
  calculateBuildPrice,
} from "../../../domain/configuration";
import type { Build } from "../../../domain/types";
import { getNextStep } from "../constants";
import type { ConfigurationStep } from "../types";

type ConfigurationPriceBarProps = {
  draft: Build;
  step: ConfigurationStep;
  onStepChange: (step: ConfigurationStep) => void;
};

export function ConfigurationPriceBar({
  draft,
  step,
  onStepChange,
}: ConfigurationPriceBarProps) {
  return (
    <div className="config-bottom">
      <div aria-live="polite">
        <span>YOUR CONFIGURATION</span>
        <strong>{formatPrice(calculateBuildPrice(draft))}</strong>
        <small>Illustrative concept price</small>
      </div>
      {step !== "summary" ? (
        <button
          className="button button-light"
          onClick={() => onStepChange(getNextStep(step))}
        >
          Continue <ArrowRight size={18} />
        </button>
      ) : (
        <Link className="button button-outline" to="/garage">
          My garage <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
