import {
  formatPrice,
  getVehicleImage,
  calculateBuildPrice,
} from "../domain/configuration";
import { interiors, paints, wheels, packages } from "../domain/catalog";
import type { Build } from "../domain/types";
export async function downloadBuild(build: Build) {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw Error("Canvas is unavailable");
  ctx.fillStyle = "#141617";
  ctx.fillRect(0, 0, 1600, 1200);
  ctx.fillStyle = "#f1f1ed";
  ctx.font = "600 25px Arial";
  ctx.fillText("AP MOTORWORKS", 80, 85);
  ctx.fillStyle = "#aaa";
  ctx.font = "18px Arial";
  ctx.fillText("YOUR PERSONAL CONFIGURATION", 80, 127);
  ctx.fillStyle = "#fff";
  ctx.font = "64px Arial";
  ctx.fillText("911 Carrera GTS", 80, 220);
  const image = new Image();
  image.src = getVehicleImage(build);
  await image.decode();
  ctx.drawImage(image, 70, 205, 1460, 820);
  ctx.fillStyle = "#242729";
  ctx.fillRect(80, 880, 1440, 1);
  ctx.fillStyle = "#fff";
  ctx.font = "28px Arial";
  ctx.fillText(build.name, 80, 950);
  ctx.font = "21px Arial";
  ctx.fillStyle = "#bbb";
  ctx.fillText(paints.find((p) => p.id === build.paint)!.name, 80, 1000);
  ctx.fillText(wheels.find((w) => w.id === build.wheels)!.name, 580, 1000);
  ctx.fillText(
    interiors.find((i) => i.id === build.interior)!.name,
    1040,
    1000,
  );
  ctx.font = "18px Arial";
  const options = packages
    .filter((p) => build.options.includes(p.id))
    .map((p) => p.name)
    .join(" · ");
  ctx.fillText(
    options.slice(0, 130) || "Pure GTS. No additional options.",
    80,
    1050,
  );
  ctx.fillStyle = "#fff";
  ctx.font = "32px Arial";
  ctx.fillText(formatPrice(calculateBuildPrice(build)), 80, 1120);
  ctx.fillStyle = "#999";
  ctx.font = "16px Arial";
  ctx.fillText(
    "Illustrative concept pricing · Independent design study · Not affiliated with Porsche AG",
    460,
    1120,
  );
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw Error("Unable to create build card");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ap-motorworks-911-${build.paint}-build.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
