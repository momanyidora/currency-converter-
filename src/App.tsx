import { useEffect, useState } from "react";
import Converter from "./components/Converter";
import Favorites from "./components/Favorites";
import RateChart from "./components/RateChart";
import ConversionLog from "./components/ConversionLog";
import Comparison from "./components/Comparison";
import { getCurrencies, getHistoricalRates } from "./services/api";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface ChartData {
  date: string;
  rate: number;
}

interface LogItem {
  id: string;
  from: string;
  to: string;
  amount: number;
  result: number;
}

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [logs, setLogs] = useState<LogItem[]>([]);

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);

  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const data = await getCurrencies();
        setCurrencies(Object.keys(data));
      } catch {
        setError("Failed to load currencies.");
      } finally {
        setLoadingCurrencies(false);
      }
    }

    loadCurrencies();
  }, []);

  useEffect(() => {
    async function loadChart() {
      try {
        const end = new Date().toISOString().split("T")[0];

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        const start = startDate.toISOString().split("T")[0];

        const data = await getHistoricalRates(from, to, start, end);

        const formatted = Object.entries(
          data.rates as Record<string, Record<string, number>>,
        ).map(([date, value]) => ({
          date,
          rate: value[to],
        }));

        setChartData(formatted);
      } catch {
        setError("Failed to load chart data.");
      } finally {
        setLoadingChart(false);
      }
    }

    loadChart();
  }, [from, to]);

  const addLog = (log: Omit<LogItem, "id">) => {
    setLogs([{ ...log, id: crypto.randomUUID() }, ...logs]);
  };

  const clearLogs = () => setLogs([]);

  const removeFavorite = (pair: string) => {
    setFavorites(favorites.filter((item) => item !== pair));
  };

  if (loadingCurrencies) {
    return <div className="p-6">Loading currencies...</div>;
  }

  return (
    <main className="min-h-screen p-4 space-y-6">
      {error && <div className="text-red-500">{error}</div>}

      <Converter
        currencies={currencies}
        from={from}
        to={to}
        amount={amount}
        setFrom={setFrom}
        setTo={setTo}
        setAmount={setAmount}
        onConverted={addLog}
      />

      <Favorites favorites={favorites} onRemove={removeFavorite} />

      <ConversionLog logs={logs} clearLogs={clearLogs} />

      <Comparison
        amount={amount}
        fromCurrency={from}
        rates={currencies.slice(0, 4).map((c) => ({
          currency: c,
          value: 1,
        }))}
      />

      {loadingChart ? (
        <div>Loading chart...</div>
      ) : (
        <RateChart data={chartData} />
      )}
    </main>
  );
}

export default App;
