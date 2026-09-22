import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import { ModelCard } from "./ModelCard";
import { models } from "../../domain/models";
import { Reveal } from "../../components/shared/Reveal";

export function ModelCollection() {
  const [filter, setFilter] = useState("All models");
  return (
    <section id="collection" className="section collection">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow">ONE ICON. MANY EXPRESSIONS.</p>
          <h2>Your kind of 911.</h2>
        </div>
        <p>
          Different characters.
          <br />
          The same unmistakable feeling.
        </p>
      </Reveal>
      <div className="collection-toolbar">
        <div className="filter-tabs" aria-label="Filter models">
          {["All models", "Everyday icons", "Track inspired"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <Link className="text-link" to="/compare">
          <SlidersHorizontal size={15} /> Compare models
        </Link>
      </div>
      <motion.div layout className="model-grid">
        <AnimatePresence mode="popLayout">
          {models
            .filter((m) => filter === "All models" || m.category === filter)
            .map((m, i) => (
              <ModelCard key={m.id} model={m} index={i} />
            ))}
        </AnimatePresence>
      </motion.div>
      <p className="fine-print">
        Illustrative concept prices. Specifications shown for PDK; Carrera
        acceleration without Sport Chrono. This is an independent design
        experience, not a vehicle offer.
      </p>
    </section>
  );
}
