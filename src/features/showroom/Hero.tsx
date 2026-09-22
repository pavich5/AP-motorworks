import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const slides = [
  {
    image: "hero",
    label: "911 Carrera GTS",
    tag: "T-Hybrid",
    alt: "Slate Grey Porsche 911 Carrera GTS beneath modern architecture",
  },
  {
    image: "driving",
    label: "Made for the long way",
    tag: "The drive",
    alt: "Porsche 911 Carrera GTS driving along a mountain road",
  },
  {
    image: "interior",
    label: "A place like no other",
    tag: "The cockpit",
    alt: "Driver-focused Porsche 911 cockpit",
  },
];
export function Hero() {
  const [slide, setSlide] = useState(0);
  return (
    <section className={`hero hero-slide-${slide}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={slide}
          className="hero-image"
          src={`/images/${slides[slide].image}.webp`}
          alt={slides[slide].alt}
          fetchPriority="high"
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow">
          <span />
          THE PORSCHE 911 COLLECTION
        </p>
        <h1>
          Never
          <br />
          not driving.
        </h1>
        <p className="hero-description">
          Some things move you.
          <br />
          Others become part of you.
        </p>
        <Link className="button button-light" to="/configure">
          Create your 911 <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="hero-bottom">
        <a href="#collection" className="scroll-hint">
          <ArrowDown size={17} /> SCROLL TO DISCOVER
        </a>
        <div className="hero-caption">
          <span className="micro">
            {slide === 0 ? "FEATURED MODEL" : "THE 911 EXPERIENCE"}
          </span>
          <p>
            {slides[slide].label}
            <span>{slides[slide].tag}</span>
          </p>
        </div>
        <div className="slide-controls" aria-label="Showroom gallery">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Show ${slides[i].label}`}
              aria-pressed={slide === i}
              className={slide === i ? "active" : ""}
              onClick={() => setSlide(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
