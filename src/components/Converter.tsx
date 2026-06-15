import { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { getLatestRate } from "../services/api";

interface Props {
  currencies: string[];
}

export default function Converter({ currencies }: Props) {
  const [amount, setAmount] = useState(1);

  const [from, setFrom] = useState("USD");

  const [to, setTo] = useState("EUR");

  const [result, setResult] = useState(0);

  const [rate, setRate] = useState(0);

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    async function convert() {
      const data = await getLatestRate(from, to);

      const newRate = data.rates[to];

      setRate(newRate);
      setResult(amount * newRate);
    }

    convert();
  }, [amount, from, to]);

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full mb-4"
      />
      <div className="flex gap-4 items-center">
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

        <CurrencySelect
          currencies={currencies}
          value={to}
          onChange={setTo}
        />
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-lg font-semibold">
          {amount} {from} = {result.toFixed(2)} {to}
        </p>
        <p className="text-sm text-gray-600">Rate: {rate.toFixed(4)}</p>
      </div>
    </div>
  );
}
