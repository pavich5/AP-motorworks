import { formatPrice } from "../../domain/configuration";
import type { CarModel } from "../../domain/models";

const compareRows: [string, (m: CarModel) => string][] = [
  ["Power", (m) => `${m.power} PS`],
  ["0–100 km/h", (m) => `${m.time} seconds`],
  ["Top speed", (m) => `${m.speed} km/h`],
  ["Engine", (m) => m.engine],
  ["Transmission", (m) => m.transmission],
  ["Drivetrain", (m) => m.drive],
  ["Concept price", (m) => formatPrice(m.price)],
];
type ComparisonTableProps = {
  leftModel: CarModel;
  rightModel: CarModel;
  differencesOnly: boolean;
};
export function ComparisonTable({
  leftModel,
  rightModel,
  differencesOnly,
}: ComparisonTableProps) {
  return (
    <div
      className="comparison-table"
      role="table"
      aria-label="Porsche 911 model comparison"
    >
      <div role="row" className="sr-only">
        <span role="columnheader">Specification</span>
        <span role="columnheader">{leftModel.name}</span>
        <span role="columnheader">{rightModel.name}</span>
      </div>
      {compareRows
        .filter(
          ([, read]) =>
            !differencesOnly || read(leftModel) !== read(rightModel),
        )
        .map(([label, read]) => (
          <div className="comparison-row" role="row" key={label}>
            <span role="rowheader">{label}</span>
            <span role="cell">{read(leftModel)}</span>
            <span role="cell">{read(rightModel)}</span>
          </div>
        ))}
    </div>
  );
}
