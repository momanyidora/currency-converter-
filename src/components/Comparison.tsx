interface Props {
  amount: number;
  rates: {
    currency: string;
    value: number;
  }[];
}

export default function Comparison({ amount, rates }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="font-bold mb-4">Multi Currency Comparison</h2>

      {rates.map((rate) => (
        <div key={rate.currency} className="flex justify-between">
          <span>{amount} USD</span>

          <span>
            {rate.value.toFixed(2)} {rate.currency}
          </span>
        </div>
      ))}
    </div>
  );
}
