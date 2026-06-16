interface MarketItem {
  pair: string;
  rate: number;
  change?: number;
}

interface Props {
  items: MarketItem[];
}

export default function MarketTicker({ items }: Props) {
  return (
    <div className="bg-[#101114] border-y border-gray-800 overflow-hidden">
      <div className="flex whitespace-nowrap animate-pulse">
        {items.map((item) => (
          <div key={item.pair} className="px-8 py-4 border-r border-gray-800">
            <span className="mr-2 text-gray-400">{item.pair}</span>

            <span>{item.rate}</span>

            <span
              className={`ml-2 ${
                item.change && item.change > 0
                  ? "text-lime-400"
                  : "text-red-400"
              }`}
            >
              {item.change && item.change > 0 ? "+" : ""}
              {item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
