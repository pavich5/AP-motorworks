import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ComparisonTable } from "./ComparisonTable";
import { models } from "../../domain/models";

export function ComparePage() {
  const location = useLocation();
  const leftParam = new URLSearchParams(location.search).get("left");
  const [left, setLeft] = useState(
    models.some((m) => m.id === leftParam) ? leftParam! : "carrera",
  );
  const [right, setRight] = useState(leftParam === "gts" ? "gt3" : "gts");
  const [differences, setDifferences] = useState(false);
  const leftModel = models.find((m) => m.id === left)!;
  const rightModel = models.find((m) => m.id === right)!;
  function changeModel(which: "left" | "right", value: string) {
    if (which === "left") {
      if (value === right) setRight(left);
      setLeft(value);
    } else {
      if (value === left) setLeft(right);
      setRight(value);
    }
  }
  return (
    <section className="section compare-page">
      <div className="page-heading">
        <p className="eyebrow">THE DETAILS MAKE THE DIFFERENCE.</p>
        <h1>Find your expression.</h1>
        <p>Two personalities. One unmistakable DNA.</p>
      </div>
      <div className="compare-controls">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={differences}
            onChange={(e) => setDifferences(e.target.checked)}
          />
          <span className="toggle-track" />
          Show differences only
        </label>
        <Link to="/#collection" className="text-link">
          All models <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="comparison-grid">
        <div className="comparison-empty">
          <span>
            911
            <br />
            vs.
            <br />
            911
          </span>
        </div>
        {[leftModel, rightModel].map((m, i) => (
          <div className="compare-model" key={i}>
            <label htmlFor={`model-${i}`} className="sr-only">
              {i === 0 ? "First model" : "Second model"}
            </label>
            <select
              id={`model-${i}`}
              value={i === 0 ? left : right}
              onChange={(e) =>
                changeModel(i === 0 ? "left" : "right", e.target.value)
              }
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <img src={m.image} alt={m.name} />
            <span>{m.label}</span>
          </div>
        ))}
      </div>
      <ComparisonTable
        leftModel={leftModel}
        rightModel={rightModel}
        differencesOnly={differences}
      />
      <div className="comparison-actions">
        <span />
        <Link className="button button-outline" to={`/models/${leftModel.id}`}>
          Explore {leftModel.name.replace("911 ", "")}
          <ArrowUpRight size={16} />
        </Link>
        <Link
          className="button button-light"
          to={
            rightModel.id === "gts" ? "/configure" : `/models/${rightModel.id}`
          }
        >
          {rightModel.id === "gts"
            ? "Configure GTS"
            : `Explore ${rightModel.name.replace("911 ", "")}`}
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <p className="fine-print">
        Prices are illustrative concept estimates. PDK performance figures;
        Carrera acceleration without Sport Chrono. Actual availability and
        specifications vary by market.
      </p>
    </section>
  );
}
