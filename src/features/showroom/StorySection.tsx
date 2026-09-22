import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../../components/shared/Reveal";

export function StorySection() {
  return (
    <section id="story" className="story-section">
      <div className="story-image">
        <img
          src="/images/driving.webp"
          alt="911 Carrera GTS taking the scenic route through the mountains"
          loading="lazy"
        />
        <span>THE ROAD IS THE REASON.</span>
      </div>
      <div className="story-copy">
        <Reveal>
          <p className="eyebrow">MORE THAN SIX DECADES. ONE FEELING.</p>
          <h2>
            Everything changes.
            <br />
            The feeling stays.
          </h2>
          <p>
            That unmistakable silhouette. The engine behind you. The road ahead.
            Since 1963, the 911 has evolved with a singular purpose: to make
            every drive feel like the first.
          </p>
          <p>
            In the Carrera GTS, a new T-Hybrid powertrain takes that feeling
            further. Progress you can feel. Character you already know.
          </p>
          <Link className="text-link" to="/models/gts">
            Meet the Carrera GTS <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
