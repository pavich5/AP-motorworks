import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toast } from "../shared/Toast";
import { useBuildStore } from "../../state/useBuildStore";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";

export function AppLayout() {
  const { pathname } = useLocation();
  const { toast, storageError } = useBuildStore();
  useScrollRestoration();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="page-loading">
              <LoaderCircle className="spin" />
              <span>Preparing your 911.</span>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      {pathname !== "/configure" && <Footer />}
      <Toast message={toast} />
      {storageError && (
        <div className="storage-warning" role="status">
          Browser storage is unavailable. Download your build card to keep your
          configuration.
        </div>
      )}
    </>
  );
}
