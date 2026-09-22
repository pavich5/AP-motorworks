import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function NotFoundPage() {
  return (
    <section className="section not-found">
      <p className="eyebrow">404 · A WRONG TURN.</p>
      <h1>
        Let's get back
        <br />
        to the drive.
      </h1>
      <Link to="/" className="button button-light">
        Back to the showroom
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
