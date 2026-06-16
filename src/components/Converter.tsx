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
  onFavorite?: (pair: string) => void;
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
  onFavorite,
}: Props) {
  const [rate, setRate] = useState(0);

  const result = amount * rate;

  useEffect(() => {
    async function loadRate() {
      try {
        const data = await getLatestRate(from, to);
        setRate(data.rates[to]);
      } catch {
        setRate(0);
      }
    }

    loadRate();
  }, [from, to]);

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="bg-[#15171d] rounded-3xl overflow-hidden">
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 p-6">
        <div className="bg-[#1b1d25] rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-4">SEND</p>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="bg-transparent text-6xl font-bold w-full outline-none"
          />

          <div className="mt-4">
            <CurrencySelect
              currencies={currencies}
              value={from}
              onChange={setFrom}
            />
          </div>
        </div>

        <button
          onClick={swapCurrencies}
          className="bg-[#252730] h-14 w-14 rounded-xl self-center text-xl"
        >
          ⇄
        </button>

        <div className="bg-[#1b1d25] rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-4">RECEIVE</p>

          <div className="text-6xl font-bold text-lime-400">
            {result.toFixed(2)}
          </div>

          <div className="mt-4">
            <CurrencySelect
              currencies={currencies}
              value={to}
              onChange={setTo}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 px-6 py-4 flex justify-between items-center">
        <p className="text-gray-400">
          1 {from} = {rate.toFixed(4)} {to}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onFavorite?.(`${from}/${to}`)}
            className="bg-lime-400 text-black px-4 py-2 rounded-xl font-semibold"
          >
            Favorite
          </button>

          <button
            onClick={() =>
              onConverted?.({
                from,
                to,
                amount,
                result,
              })
            }
            className="border border-lime-400 px-4 py-2 rounded-xl"
          >
            Log Conversion
          </button>
        </div>
      </div>
    </div>
  );
}
