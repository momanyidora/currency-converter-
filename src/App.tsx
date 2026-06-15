import { useEffect, useState } from "react";
import Converter from "./components/Converter";
import Favorites from "./components/Favorites";
import { getCurrencies } from "./services/api";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  useEffect(() => {
    async function loadCurrencies() {
      const data = await getCurrencies();
      setCurrencies(Object.keys(data));
    }
    loadCurrencies();
  }, []);

  const removeFavorite = (pair: string) => {
    setFavorites(favorites.filter((item) => item !== pair));
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Converter currencies={currencies} />
      <Favorites favorites={favorites} onRemove={removeFavorite} />
    </main>
  );
}

export default App;
