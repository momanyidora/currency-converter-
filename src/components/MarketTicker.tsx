interface MarketItem {
  pair: string;
  rate: number;
}

interface Props {
  items: MarketItem[];
}

export default function MarketTicker({ items }: Props) {
  return (
    <div className="bg-slate-900 text-white p-3 overflow-x-auto whitespace-nowrap">
      {items.map((item) => (
        <span key={item.pair} className="mr-8">
          {item.pair}: {item.rate}
        </span>
      ))}
    </div>
  );
}
