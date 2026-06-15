interface Props {
  currencies: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CurrencySelect({ currencies, value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
      border
      rounded
      p-2
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      "
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}
