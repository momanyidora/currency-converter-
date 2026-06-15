import { useEffect, useState } from "react";
import Converter from "./components/Converter";
import Favorites from "./components/Favorites";
import RateChart from "./components/RateChart";
import { getCurrencies, getHistoricalRates } from "./services/api";
import { useLocalStorage } from "./hooks/useLocalStorage";

interface ChartData {
  date: string;
  rate: number;
}

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCurrencies() {
      try {
        setLoadingCurrencies(true);

        const data = await getCurrencies();

        setCurrencies(Object.keys(data));
      } catch (err) {
        console.error(err);
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
        setLoadingChart(true);

        const end = new Date().toISOString().split("T")[0];

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        const start = startDate.toISOString().split("T")[0];

        const data = await getHistoricalRates("USD", "EUR", start, end);

        const formatted = Object.entries(
          data.rates as Record<string, Record<string, number>>,
        ).map(([date, value]) => ({
          date,
          rate: value.EUR,
        }));

        setChartData(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load chart data.");
      } finally {
        setLoadingChart(false);
      }
    }

    loadChart();
  }, []);

  const removeFavorite = (pair: string) => {
    setFavorites(favorites.filter((item) => item !== pair));
  };

  if (loadingCurrencies) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-300">
          Loading currencies...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 space-y-6">
      {error && (
        <div
          className="
            bg-red-100
            border
            border-red-300
            text-red-700
            px-4
            py-3
            rounded-lg
            dark:bg-red-900/30
            dark:text-red-300
            dark:border-red-700
          "
        >
          {error}
        </div>
      )}

      <Converter currencies={currencies} />

      <Favorites favorites={favorites} onRemove={removeFavorite} />

      {loadingChart ? (
        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-lg
            shadow-md
            h-[300px]
            flex
            items-center
            justify-center
          "
        >
          <p className="text-slate-500 dark:text-slate-300">Loading chart...</p>
        </div>
      ) : (
        <RateChart data={chartData} />
      )}
    </main>
  );
}

export default App;
