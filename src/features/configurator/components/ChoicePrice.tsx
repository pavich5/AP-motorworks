import { formatPrice } from "../../../domain/configuration";

export function ChoicePrice({ value }: { value: number }) {
  return (
    <span className="choice-price">
      {value === 0 ? "Included" : `+ ${formatPrice(value)}`}
    </span>
  );
}
