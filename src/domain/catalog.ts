import type { PaintId } from "./types";

export const paints: {
  id: PaintId;
  name: string;
  color: string;
  price: number;
  family: string;
}[] = [
  {
    id: "slate",
    name: "Slate Grey Neo",
    color: "#797d78",
    price: 2980,
    family: "Shades",
  },
  {
    id: "silver",
    name: "GT Silver Metallic",
    color: "#b9bab8",
    price: 1250,
    family: "Shades",
  },
  {
    id: "black",
    name: "Jet Black Metallic",
    color: "#232425",
    price: 1250,
    family: "Shades",
  },
  {
    id: "white",
    name: "White",
    color: "#ecece7",
    price: 0,
    family: "Contrasts",
  },
  {
    id: "red",
    name: "Carmine Red",
    color: "#a3222f",
    price: 2980,
    family: "Dreams",
  },
  {
    id: "green",
    name: "Oak Green Metallic Neo",
    color: "#374b3c",
    price: 2980,
    family: "Dreams",
  },
];
export const wheels = [
  {
    id: "standard",
    name: "Carrera GTS wheels",
    detail: "20 / 21-inch · Satin black",
    price: 0,
  },
  {
    id: "exclusive",
    name: "RS Spyder wheels",
    detail: "20 / 21-inch · Lightweight sport design",
    price: 2490,
  },
] as const;
export const interiors = [
  {
    id: "black",
    name: "Black leather & Race-Tex",
    detail: "Understated. Driver-focused.",
    color: "#29292a",
    price: 0,
  },
  {
    id: "red",
    name: "Black & Bordeaux Red leather",
    detail: "A distinctly sporting character.",
    color: "#65282e",
    price: 3460,
  },
] as const;
export const packages = [
  {
    id: "lift",
    name: "Front axle lift system",
    description: "Extra clearance at the touch of a button.",
    price: 2840,
  },
  {
    id: "sound",
    name: "BOSE® Surround Sound System",
    description: "A rich, detailed soundtrack for every drive.",
    price: 1490,
  },
  {
    id: "roof",
    name: "Electric slide / tilt glass sunroof",
    description: "Let a little more of the outside in.",
    price: 2390,
  },
  {
    id: "seats",
    name: "Adaptive Sports Seats Plus",
    description: "18-way adjustment. Support in every corner.",
    price: 3250,
  },
];
export const basePrice = 175000;
