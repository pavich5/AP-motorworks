import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <Link className="wordmark" to="/" aria-label="AP MOTORWORKS">
          AP<span>MOTORWORKS</span>
        </Link>
        <p>For the love of the drive.</p>
        <Link to="/configure" className="text-link">
          Make it yours <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="footer-bottom">
        <p>
          Independent concept by{" "}
          <a href="https://github.com/pavich5" target="_blank" rel="noreferrer">
            Antonio Pavic
          </a>
          .
        </p>
        <p>Not affiliated with Porsche AG. Imagery © Porsche AG.</p>
        <span>© {new Date().getFullYear()} AP MOTORWORKS</span>
      </div>
    </footer>
  );
}
