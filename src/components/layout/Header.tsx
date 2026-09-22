import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useBuildStore } from "../../state/useBuildStore";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { garage } = useBuildStore();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header
      className={`header ${location.pathname !== "/" ? "header-solid" : ""}`}
    >
      <Link className="wordmark" to="/" aria-label="AP MOTORWORKS home">
        AP<span>MOTORWORKS</span>
      </Link>
      <nav
        id="main-navigation"
        className={`nav ${open ? "open" : ""}`}
        aria-label="Main navigation"
      >
        <Link to="/#collection">The collection</Link>
        <Link to="/#story">The 911 story</Link>
        <NavLink to="/compare">Compare</NavLink>
        <NavLink className="garage-nav" to="/garage">
          My garage <span>{garage.length.toString().padStart(2, "0")}</span>
        </NavLink>
        <NavLink className="nav-cta" to="/configure">
          Configure yours <ArrowUpRight size={15} />
        </NavLink>
      </nav>
      <button
        className="menu-toggle icon-button"
        aria-controls="main-navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
