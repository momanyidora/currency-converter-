import { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { getLatestRate } from "../services/api";

interface Props {
  currencies: string[];
  from: string;
  to: string;
  amount: number;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setAmount: (v: number) => void;
  onConverted?: (data: {
    from: string;
    to: string;
    amount: number;
    result: number;
  }) => void;
}

export default function Converter({
  currencies,
  from,
  to,
  amount,
  setFrom,
  setTo,
  setAmount,
  onConverted,
}: Props) {
  const [result, setResult] = useState(0);
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getLatestRate(from, to);
        const newRate = data.rates[to];

        setRate(newRate);
        const converted = amount * newRate;

        setResult(converted);

        onConverted?.({
          from,
          to,
          amount,
          result: converted,
        });
      } catch {
        setError("Conversion failed");
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(handler);
  }, [amount, from, to, onConverted]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-4">Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full mb-4 rounded"
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <CurrencySelect
          currencies={currencies}
          value={from}
          onChange={setFrom}
        />

        <button
          onClick={swapCurrencies}
          className="px-3 py-2 bg-blue-500 text-white rounded"
        >
          ⇄
        </button>

        <CurrencySelect currencies={currencies} value={to} onChange={setTo} />
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        {loading ? (
          <p>Converting...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-lg font-semibold">
              {amount} {from} = {result.toFixed(2)} {to}
            </p>
            <p className="text-sm text-gray-600">Rate: {rate.toFixed(4)}</p>
          </>
        )}
      </div>
    </div>
  );
}
