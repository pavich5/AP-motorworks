import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { paints } from "../../domain/catalog";
import { Reveal } from "../../components/shared/Reveal";

export function PersonalizationSection() {
  const [selectedPaint, setSelectedPaint] = useState(
    () => paints.find((paint) => paint.id === "green") ?? paints[0],
  );

  return (
    <section className="section personal-section">
      <Reveal className="personal-copy">
        <p className="eyebrow">NO TWO DRIVERS ARE THE SAME.</p>
        <h2>
          Make it
          <br />
          <em>unmistakably yours.</em>
        </h2>
        <p>
          The right shade. The perfect details.
          <br />A 911 that feels like you, before the first mile.
        </p>
        <Link className="button button-light" to="/configure">
          Enter the configurator <ArrowUpRight size={18} />
        </Link>
      </Reveal>
      <Reveal className="personal-car">
        <span className="outline-number" aria-hidden="true">
          911
        </span>
        <img
          src={`/images/${selectedPaint.id}-side.webp`}
          alt={`${selectedPaint.name} Carrera GTS`}
          loading="lazy"
        />
        <div className="sample-swatches" aria-label="Preview exterior paint">
          {paints.map((p) => (
            <button
              type="button"
              key={p.id}
              aria-label={p.name}
              aria-pressed={selectedPaint.id === p.id}
              title={p.name}
              onClick={() => setSelectedPaint(p)}
              style={{ background: p.color }}
              className={selectedPaint.id === p.id ? "selected" : ""}
            />
          ))}
        </div>
        <p aria-live="polite">{selectedPaint.name}</p>
      </Reveal>
    </section>
  );
}
