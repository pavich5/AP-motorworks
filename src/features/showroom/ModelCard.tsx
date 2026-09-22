import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { formatPrice } from "../../domain/configuration";
import type { CarModel } from "../../domain/models";

type ModelCardProps = { model: CarModel; index: number };

// AnimatePresence's popLayout mode needs access to the article element.
export const ModelCard = forwardRef<HTMLElement, ModelCardProps>(
  function ModelCard({ model, index }, ref) {
    return (
      <motion.article
        ref={ref}
        layout
        key={model.id}
        className={`model-card model-${model.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
      >
        <div className="model-top">
          <span className="model-category">
            {model.id === "gts"
              ? "T-HYBRID"
              : model.id === "gt3"
                ? "MOTORSPORT"
                : "THE ORIGINAL"}
          </span>
          <Link
            className="icon-button"
            to={`/models/${model.id}`}
            aria-label={`Explore ${model.name}`}
          >
            <ArrowUpRight size={21} />
          </Link>
        </div>
        <h3>{model.name}</h3>
        <p className="model-tagline">{model.label}</p>
        <Link
          to={`/models/${model.id}`}
          className="model-image-link"
          aria-label={`Discover ${model.name}`}
        >
          <img
            src={model.image}
            alt={model.name}
            loading="lazy"
            width="1440"
            height="810"
          />
        </Link>
        <div className="model-specs">
          <div>
            <strong>
              {model.power}
              <small>PS</small>
            </strong>
            <span>Power</span>
          </div>
          <div>
            <strong>
              {model.time}
              <small>s</small>
            </strong>
            <span>0–100 km/h</span>
          </div>
          <div>
            <strong>
              {model.speed}
              <small>km/h</small>
            </strong>
            <span>Top speed</span>
          </div>
        </div>
        <div className="model-card-bottom">
          <p>
            Concept price from <strong>{formatPrice(model.price)}</strong>
          </p>
          <Link
            to={model.id === "gts" ? "/configure" : `/models/${model.id}`}
            className="text-link"
          >
            {model.id === "gts" ? "Configure" : "Discover"}
            <ArrowRight size={17} />
          </Link>
        </div>
      </motion.article>
    );
  },
);
