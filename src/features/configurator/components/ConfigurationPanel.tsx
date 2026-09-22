import { AnimatePresence, motion } from "motion/react";
import type { ConfigurationStep, SummaryStepProps } from "../types";
import { ExteriorStep } from "../steps/ExteriorStep";
import { WheelsStep } from "../steps/WheelsStep";
import { InteriorStep } from "../steps/InteriorStep";
import { OptionsStep } from "../steps/OptionsStep";
import { SummaryStep } from "../steps/SummaryStep";
import { StepNavigation } from "./StepNavigation";

type ConfigurationPanelProps = SummaryStepProps & {
  step: ConfigurationStep;
  onWheelChange: () => void;
};

export function ConfigurationPanel({
  step,
  onWheelChange,
  ...props
}: ConfigurationPanelProps) {
  const stepProps = { draft: props.draft, update: props.update };
  const content = {
    exterior: <ExteriorStep {...stepProps} />,
    wheels: <WheelsStep {...stepProps} onWheelChange={onWheelChange} />,
    interior: <InteriorStep {...stepProps} />,
    options: <OptionsStep {...stepProps} />,
    summary: <SummaryStep {...props} />,
  }[step];

  return (
    <aside className="config-panel">
      <StepNavigation step={step} onStepChange={props.onStepChange} />
      <div className="config-options">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
