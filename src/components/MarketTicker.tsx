interface Props {
  pairs: string[];
}

export default function MarketTicker({ pairs }: Props) {
  return (
    <div className="overflow-x-auto whitespace-nowrap">
      {pairs.map((pair) => (
        <span key={pair} className="mr-6">
          {pair}
        </span>
      ))}
    </div>
  );
}
