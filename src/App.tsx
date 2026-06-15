import { useEffect, useState } from "react";
import Converter from "./components/Converter";
import Favorites from "./components/Favorites";
import RateChart from "./components/RateChart";
import ConversionLog from "./components/ConversionLog";
import Comparison from "./components/Comparison";
import {
  getCurrencies,
  getHistoricalRates,
  getLatestRate,
} from "./services/api";
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

const COMPARISON_CURRENCIES = ["EUR", "GBP", "JPY", "CAD", "AUD", "CHF"];

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [comparisonRates, setComparisonRates] = useState<
    { currency: string; value: number }[]
  >([]);

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);

  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartError, setChartError] = useState("");

  useEffect(() => {
    getCurrencies()
      .then((data) => setCurrencies(Object.keys(data)))
      .catch(() => {}) // handled by empty dropdown
      .finally(() => setLoadingCurrencies(false));
  }, []);

  useEffect(() => {
    async function loadChart() {
      setLoadingChart(true);
      setChartError("");
      try {
        const end = new Date().toISOString().split("T")[0];
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        const start = startDate.toISOString().split("T")[0];

        const data = await getHistoricalRates(from, to, start, end);
        const formatted = Object.entries(
          data.rates as Record<string, Record<string, number>>,
        ).map(([date, value]) => ({ date, rate: value[to] }));
        setChartData(formatted);
      } catch {
        setChartError("Failed to load chart data.");
      } finally {
        setLoadingChart(false);
      }
    }
    loadChart();
  }, [from, to]);

  // Fetch real comparison rates whenever base currency changes
  useEffect(() => {
    const targets = COMPARISON_CURRENCIES.filter((c) => c !== from);
    getLatestRate(from, targets.join(","))
      .then((data) => {
        const rates = targets.map((c) => ({
          currency: c,
          value: data.rates[c] ?? 1,
        }));
        setComparisonRates(rates);
      })
      .catch(() => {});
  }, [from]);

  const addLog = (log: Omit<LogItem, "id">) => {
    setLogs((prev) => [{ ...log, id: crypto.randomUUID() }, ...prev]);
  };

  const removeFavorite = (pair: string) => {
    setFavorites(favorites.filter((item) => item !== pair));
  };

  if (loadingCurrencies)
    return <div className="p-6">Loading currencies...</div>;

  return (
    <main className="min-h-screen p-4 space-y-6">
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

      <ConversionLog logs={logs} clearLogs={() => setLogs([])} />

      <Comparison amount={amount} fromCurrency={from} rates={comparisonRates} />

      {loadingChart ? (
        <div className="p-4">Loading chart...</div>
      ) : chartError ? (
        <div className="p-4 text-red-500">{chartError}</div>
      ) : (
        <RateChart data={chartData} />
      )}
    </main>
  );
}

export default App;
