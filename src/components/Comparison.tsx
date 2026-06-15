interface Props {
  amount: number;
  fromCurrency: string;
  rates: {
    currency: string;
    value: number;
  }[];
}

export default function Comparison({ amount, fromCurrency, rates }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="font-bold mb-6">Multi Currency Comparison</h2>

      {rates.map((rate) => (
        <div key={rate.currency} className="flex justify-between">
          <span>
            {amount} {fromCurrency}
          </span>

          <span>
            {(amount * rate.value).toFixed(2)} {rate.currency}
          </span>
        </div>
      ))}
    </div>
  );
}
