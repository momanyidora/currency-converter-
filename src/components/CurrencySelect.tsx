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
      className="min-w-35"
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: "#ffffff",
          borderColor: "#2d3748",
          minHeight: "48px",
        }),

        singleValue: (provided) => ({
          ...provided,
          color: "#000000",
          fontWeight: 500,
        }),

        input: (provided) => ({
          ...provided,
          color: "#000000",
        }),

        menu: (provided) => ({
          ...provided,
          backgroundColor: "#ffffff",
          color: "#000000",
        }),

        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? "#e5e7eb" : "#ffffff",
          color: "#000000",
          cursor: "pointer",
        }),

        placeholder: (provided) => ({
          ...provided,
          color: "#6b7280",
        }),
      }}
    />
  );
}
