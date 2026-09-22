import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { models } from "../../domain/models";

export function ModelDetailPage() {
  const { id } = useParams();
  const model = models.find((m) => m.id === id);
  if (!model) return <NotFoundPage />;
  return (
    <div className="detail-page">
      <section className="section detail-intro">
        <Link className="back-link" to="/#collection">
          <ArrowLeft size={16} /> Back to the collection
        </Link>
        <div className="detail-title">
          <div>
            <p className="eyebrow">{model.category}</p>
            <h1>{model.name}</h1>
            <p>{model.label}</p>
          </div>
          <span className="model-category">PORSCHE 911</span>
        </div>
        <div className="detail-car">
          <span aria-hidden="true">{model.id === "gt3" ? "GT3" : "911"}</span>
          <img src={model.image} alt={model.name} />
        </div>
        <div className="detail-specs">
          {[
            [model.power, "PS", "Power"],
            [model.time, "seconds", "0–100 km/h"],
            [model.speed, "km/h", "Top speed"],
          ].map(([value, unit, label]) => (
            <div key={label}>
              <strong>
                {value}
                <small>{unit}</small>
              </strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
        <div className="detail-description">
          <h2>{model.label}</h2>
          <div>
            <p>{model.description}</p>
            <dl>
              <div>
                <dt>Engine</dt>
                <dd>{model.engine}</dd>
              </div>
              <div>
                <dt>Transmission</dt>
                <dd>{model.transmission}</dd>
              </div>
              <div>
                <dt>Drivetrain</dt>
                <dd>{model.drive}</dd>
              </div>
            </dl>
            <div className="button-row">
              <Link className="button button-light" to="/configure">
                {model.id === "gts"
                  ? "Configure yours"
                  : "Configure a Carrera GTS"}
                <ArrowUpRight size={17} />
              </Link>
              <Link
                className="button button-outline"
                to={`/compare?left=${model.id}`}
              >
                Compare models
              </Link>
            </div>
          </div>
        </div>
        <p className="fine-print">
          PDK specifications. Carrera 0–100 km/h without Sport Chrono.
          Specifications vary by market and equipment.
        </p>
      </section>
    </div>
  );
}
