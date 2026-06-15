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

      <div className="flex gap-4">
        <CurrencySelect
          currencies={currencies}
          value={from}
          onChange={setFrom}
        />

        <CurrencySelect currencies={currencies} value={to} onChange={setTo} />
      </div>

      <p className="mt-4">
        Rate: 1 {from} = {rate} {to}
      </p>

      <h3 className="text-2xl font-bold mt-2">
        {result.toFixed(2)} {to}
      </h3>
    </div>
  );
}
