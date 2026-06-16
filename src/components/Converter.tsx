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
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const result = amount * rate;

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  // Fetch rate only when currencies change, NOT amount
  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getLatestRate(from, to);
        setRate(data.rates[to]);
      } catch {
        setError("Conversion failed");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [from, to]); // ← amount removed, onConverted removed

  const handleLogConversion = () => {
    if (!result) return;
    onConverted?.({ from, to, amount, result });
  };

  return (
    <div className="bg-[#15171d] rounded-3xl p-6">
      <h2 className="text-xl font-bold mb-4">Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="
        w-full
        bg-transparent
        text-5xl
        font-bold
        outline-none
        "
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <CurrencySelect
          currencies={currencies}
          value={from}
          onChange={setFrom}
        />
        <button
          onClick={swapCurrencies}
          className="
bg-[#252730]
rounded-xl
w-14
h-14
text-2xl
"
        ></button>
        <CurrencySelect currencies={currencies} value={to} onChange={setTo} />
      </div>

      <div
        className="
mt-6
border-t
border-gray-800
pt-4
text-gray-300
"
      >
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

      <button
        onClick={handleLogConversion}
        disabled={!result || loading}
        className="
        bg-lime-400
        text-black
        font-semibold
        px-5
        py-3
        rounded-xl
        "
      >
        Log Conversion
      </button>
    </div>
  );
}
