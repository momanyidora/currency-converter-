import { useEffect, useState } from "react";
import Converter from "./components/Converter";
import { getCurrencies } from "./services/api";

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    async function loadCurrencies() {
      const data = await getCurrencies();

      setCurrencies(Object.keys(data));
    }

    loadCurrencies();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <Converter currencies={currencies} />
    </main>
  );
}

export default App;
