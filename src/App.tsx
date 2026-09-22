import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { BuildProvider } from "./state/BuildProvider";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ModelDetailPage } from "./features/models/ModelDetailPage";
import { ComparePage } from "./features/comparison/ComparePage";
import { GaragePage } from "./features/garage/GaragePage";

const ConfiguratorPage = lazy(
  () => import("./features/configurator/ConfiguratorPage"),
);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BuildProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="models/:id" element={<ModelDetailPage />} />
            <Route path="configure" element={<ConfiguratorPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="garage" element={<GaragePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BuildProvider>
    </MotionConfig>
  );
}
