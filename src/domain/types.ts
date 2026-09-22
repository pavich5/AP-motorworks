export type PaintId = "slate" | "silver" | "black" | "white" | "red" | "green";
export type Angle = "front" | "side" | "rear";
export type Build = {
  id: string;
  name: string;
  paint: PaintId;
  wheels: "standard" | "exclusive";
  interior: "black" | "red";
  options: string[];
  createdAt: number;
};
export type BuildPatch = Partial<
  Pick<Build, "name" | "paint" | "wheels" | "interior" | "options">
>;
