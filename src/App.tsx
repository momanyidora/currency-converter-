import { useEffect, useState } from "react";

import Converter from "./components/Converter";
import Favorites from "./components/Favorites";
import RateChart from "./components/RateChart";
import ConversionLog from "./components/ConversionLog";
import Comparison from "./components/Comparison";
import Layout from "./components/Layout";
import Tabs from "./components/Tabs";
import StatsCards from "./components/StatsCards";
import MarketTicker from "./components/MarketTicker";

import {
  getCurrencies,
  getHistoricalRates,
  getLatestRate,
} from "./services/api";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { marketTickerData } from "./data/marketTicker";

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
    {
      currency: string;
      value: number;
    }[]
  >([]);

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);

  const [activeTab, setActiveTab] = useState("history");

  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartError, setChartError] = useState("");

  useEffect(() => {
    getCurrencies()
      .then((data) => {
        setCurrencies(Object.keys(data));
      })
      .catch(() => {
        console.error("Failed to load currencies");
      })
      .finally(() => {
        setLoadingCurrencies(false);
      });
  }, []);

  useEffect(() => {
    async function loadChart() {
      try {
        setLoadingChart(true);
        setChartError("");

        const end = new Date().toISOString().split("T")[0];

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        const start = startDate.toISOString().split("T")[0];

        const data = await getHistoricalRates(from, to, start, end);

        const formatted = Object.entries(
          data.rates as Record<string, Record<string, number>>,
        )
          .map(([date, value]) => ({
            date,
            rate: value[to],
          }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
        setChartData(formatted);
      } catch {
        setChartError("Failed to load chart data");
      } finally {
        setLoadingChart(false);
      }
    }

    loadChart();
  }, [from, to]);

  useEffect(() => {
    const targets = COMPARISON_CURRENCIES.filter(
      (currency) => currency !== from,
    );

    getLatestRate(from, targets.join(","))
      .then((data) => {
        const rates = targets.map((currency) => ({
          currency,
          value: data.rates[currency] ?? 1,
        }));

        setComparisonRates(rates);
      })
      .catch(() => {
        console.error("Failed to load comparison rates");
      });
  }, [from]);

  const addLog = (log: Omit<LogItem, "id">) => {
    setLogs((prev) => [
      {
        ...log,
        id: crypto.randomUUID(),
      },
      ...prev,
    ]);
  };
  const removeLog = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };
  const addFavorite = (pair: string) => {
    if (!favorites.includes(pair)) {
      setFavorites([...favorites, pair]);
    }
  };
  
  const loadFavorite = (pair: string) => {
    const [base, target] = pair.split("/");
  
    setFrom(base);
    setTo(target);
  };
  const removeFavorite = (pair: string) => {
    setFavorites(favorites.filter((item) => item !== pair));
  };

  if (loadingCurrencies) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading currencies...
      </div>
    );
  }

  return (
    <Layout>
      <MarketTicker items={marketTickerData} />

      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-6">CHECK THE RATE</h1>

        <Converter
  currencies={currencies}
  from={from}
  to={to}
  amount={amount}
  setFrom={setFrom}
  setTo={setTo}
  setAmount={setAmount}
  onConverted={addLog}
  onFavorite={addFavorite}
/>
      </div>

      <div className="mt-10">
        <Tabs active={activeTab} setActive={setActiveTab} />
      </div>

      <div className="mt-8">
        <StatsCards
          rate={chartData.length > 0 ? chartData[chartData.length - 1].rate : 0}
        />
      </div>

      <div className="mt-8">
        {activeTab === "history" && (
          <>
            {loadingChart ? (
              <div className="text-gray-400">Loading chart...</div>
            ) : chartError ? (
              <div className="text-red-500">{chartError}</div>
            ) : (
              <RateChart data={chartData} />
            )}
          </>
        )}

        {activeTab === "compare" && (
          <Comparison
            amount={amount}
            fromCurrency={from}
            rates={comparisonRates}
          />
        )}

        {activeTab === "favorites" && (
          <Favorites
            favorites={favorites}
            onRemove={removeFavorite}
            onLoad={loadFavorite}
          />
        )}

        {activeTab === "log" && (
          <ConversionLog
            logs={logs}
            clearLogs={() => setLogs([])}
            removeLog={removeLog}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;
