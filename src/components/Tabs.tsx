interface Props {
  active: string;
  setActive: (tab: string) => void;
}

export default function Tabs({ active, setActive }: Props) {
  const tabs = ["history", "compare", "favorites", "log"];

  return (
    <div className="flex gap-8 border-b border-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-4 uppercase tracking-wider ${
            active === tab
              ? "border-b-2 border-lime-400 text-white"
              : "text-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
