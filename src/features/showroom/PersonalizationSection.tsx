import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { paints } from "../../domain/catalog";
import { Reveal } from "../../components/shared/Reveal";

export function PersonalizationSection() {
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
          src="/images/green-side.webp"
          alt="Oak Green Metallic Neo Carrera GTS"
          loading="lazy"
        />
        <div className="sample-swatches" aria-hidden="true">
          {paints.map((p) => (
            <span
              key={p.id}
              style={{ background: p.color }}
              className={p.id === "green" ? "selected" : ""}
            />
          ))}
        </div>
        <p>Oak Green Metallic Neo</p>
      </Reveal>
    </section>
  );
}
