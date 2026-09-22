import { CONFIGURATION_STEPS } from "../constants";
import type { ConfigurationStep } from "../types";

type StepNavigationProps = {
  step: ConfigurationStep;
  onStepChange: (step: ConfigurationStep) => void;
};

export function StepNavigation({ step, onStepChange }: StepNavigationProps) {
  return (
    <nav className="step-nav" aria-label="Configuration steps">
      {CONFIGURATION_STEPS.map(({ id, label }, index) => (
        <button
          key={id}
          onClick={() => onStepChange(id)}
          className={step === id ? "active" : ""}
          aria-current={step === id ? "step" : undefined}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}
