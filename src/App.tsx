import { useEffect, useState } from "react";
import Converter from "./components/Converter";
import Favorites from "./components/Favorites";
import RateChart from "./components/RateChart";
import { getCurrencies, getHistoricalRates } from "./services/api";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function loadCurrencies() {
      const data = await getCurrencies();
      setCurrencies(Object.keys(data));
    }
    loadCurrencies();
  }, []);

  useEffect(() => {
    async function loadChart() {
      const end = new Date().toISOString().split("T")[0];
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      const start = startDate.toISOString().split("T")[0];

      const data = await getHistoricalRates("USD", "EUR", start, end);

      const formatted = Object.entries(data.rates).map(
        ([date, value]: any) => ({
          date,
          rate: value.EUR,
        }),
      );

      setChartData(formatted);
    }
    loadChart();
  }, []);

  const removeFavorite = (pair: string) => {
    setFavorites(favorites.filter((item) => item !== pair));
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Converter currencies={currencies} />
      <Favorites favorites={favorites} onRemove={removeFavorite} />
      <RateChart data={chartData} />
    </main>
  );
}

export default App;
