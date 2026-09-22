import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Share2 } from "lucide-react";

type ConfigToolbarProps = { onReset: () => void; onShare: () => void };
export function ConfigToolbar({ onReset, onShare }: ConfigToolbarProps) {
  return (
    <div className="config-topbar">
      <Link to="/#collection" className="back-link">
        <ArrowLeft size={16} />
        <span>The collection</span>
      </Link>
      <span>YOUR 911. YOUR RULES.</span>
      <div>
        <button
          className="icon-button"
          aria-label="Reset configuration"
          onClick={onReset}
        >
          <RotateCcw size={16} />
        </button>
        <button
          className="icon-button"
          aria-label="Share configuration"
          onClick={onShare}
        >
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}
