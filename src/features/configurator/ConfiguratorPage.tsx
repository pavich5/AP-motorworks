import { RotateCcw } from "lucide-react";
import { ConfirmDialog } from "../../components/shared/ConfirmDialog";
import { useConfigurator } from "./hooks/useConfigurator";
import { ConfigToolbar } from "./components/ConfigToolbar";
import { VehicleViewer } from "./components/VehicleViewer";
import { ConfigurationPanel } from "./components/ConfigurationPanel";
import { ConfigurationPriceBar } from "./components/ConfigurationPriceBar";

export default function ConfiguratorPage() {
  const configuration = useConfigurator();
  const {
    draft,
    step,
    setStep,
    angle,
    setAngle,
    expanded,
    setExpanded,
    resetting,
    setResetting,
  } = configuration;

  return (
    <div className={`configurator ${expanded ? "viewer-expanded" : ""}`}>
      <ConfigToolbar
        onReset={() => setResetting(true)}
        onShare={configuration.shareBuild}
      />
      <div className="config-layout">
        <VehicleViewer
          draft={draft}
          showInterior={step === "interior"}
          angle={angle}
          expanded={expanded}
          onAngleChange={setAngle}
          onToggleExpanded={() => setExpanded((value) => !value)}
        />
        <ConfigurationPanel
          draft={draft}
          step={step}
          update={configuration.updateBuild}
          onStepChange={setStep}
          onWheelChange={() => setAngle("front")}
          onSave={configuration.saveBuild}
          onShare={configuration.shareBuild}
          onExport={configuration.exportBuild}
          isSaved={configuration.isSaved}
          isExporting={configuration.isExporting}
        />
      </div>
      <ConfigurationPriceBar draft={draft} step={step} onStepChange={setStep} />
      <ConfirmDialog
        open={resetting}
        title="A fresh start?"
        icon={<RotateCcw size={24} />}
        confirmLabel="Start fresh"
        cancelLabel="Keep building"
        closeLabel="Close reset dialog"
        onCancel={() => setResetting(false)}
        onConfirm={configuration.resetBuild}
      >
        Your current configuration will reset. Builds already saved to your
        garage will stay there.
      </ConfirmDialog>
    </div>
  );
}
