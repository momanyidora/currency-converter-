import Select from "react-select";

interface Props {
  currencies: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CurrencySelect({ currencies, value, onChange }: Props) {
  const options = currencies.map((currency) => ({
    value: currency,
    label: currency,
  }));

  return (
    <Select
      value={{
        value,
        label: value,
      }}
      options={options}
      onChange={(option) => {
        if (option) {
          onChange(option.value);
        }
      }}
      isSearchable
      className="min-w-[140px]"
    />
  );
}
