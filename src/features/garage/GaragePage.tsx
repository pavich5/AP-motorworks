import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, CarFront } from "lucide-react";
import { GarageCard } from "./GarageCard";
import { EmptyGarage } from "./EmptyGarage";
import { createBuild } from "../../domain/configuration";
import { useBuildStore } from "../../state/useBuildStore";
import { useBuildExport } from "../../hooks/useBuildExport";
import { ConfirmDialog } from "../../components/shared/ConfirmDialog";
import type { Build } from "../../domain/types";

export function GaragePage() {
  const { garage, remove, restore } = useBuildStore();
  const navigate = useNavigate();
  const [removing, setRemoving] = useState<Build | null>(null);
  const { exportingId, exportBuild } = useBuildExport();
  const editBuild = (build: Build) => {
    restore(build);
    navigate("/configure");
  };
  return (
    <section className="section garage-page">
      <div className="page-heading garage-heading">
        <div>
          <p className="eyebrow">A SPACE FOR YOUR OBSESSION.</p>
          <h1>
            My garage
            <span className="heading-count">
              {garage.length.toString().padStart(2, "0")}
            </span>
          </h1>
          <p>Your personal collection. Saved on this device.</p>
        </div>
        <button
          className="button button-light"
          onClick={() => {
            restore(createBuild());
            navigate("/configure");
          }}
        >
          <Plus size={18} /> Create a build
        </button>
      </div>
      {!garage.length ? (
        <EmptyGarage />
      ) : (
        <div className="garage-grid">
          {garage.map((build) => (
            <GarageCard
              key={build.id}
              build={build}
              isExporting={exportingId === build.id}
              onRemove={setRemoving}
              onEdit={editBuild}
              onExport={exportBuild}
            />
          ))}
        </div>
      )}
      <ConfirmDialog
        open={removing !== null}
        title="Remove this build?"
        icon={<CarFront size={26} />}
        cancelLabel="Keep it"
        confirmLabel="Remove build"
        closeOnBackdrop
        onCancel={() => setRemoving(null)}
        onConfirm={() => {
          if (removing) remove(removing.id);
          setRemoving(null);
        }}
      >
        “{removing?.name}” will be removed from your saved garage.
      </ConfirmDialog>
    </section>
  );
}
