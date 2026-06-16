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
      bg-[#252730]
      text-white
      px-4
      py-2
      rounded-xl
      outline-none
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
