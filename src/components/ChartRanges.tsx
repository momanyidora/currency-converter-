interface Props {
  active: string;
  setActive: (value: string) => void;
}

const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

export default function ChartRanges({ active, setActive }: Props) {
  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => setActive(range)}
          className={`px-4 py-2 rounded-xl ${
            active === range ? "bg-[#252730]" : "bg-[#15171d]"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
