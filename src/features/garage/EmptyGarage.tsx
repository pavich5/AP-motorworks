import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function EmptyGarage() {
  return (
    <div className="garage-empty">
      <span className="outline-number" aria-hidden="true">
        911
      </span>
      <img
        src="/images/silver-side.webp"
        alt="Silver Porsche 911 waiting for your personal touch"
      />
      <h2>
        Your next obsession
        <br />
        starts here.
      </h2>
      <p>Create your first 911 and give it a place in your garage.</p>
      <Link className="button button-light" to="/configure">
        Configure your 911 <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}
