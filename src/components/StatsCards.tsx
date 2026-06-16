interface Props {
  rate: number;
}

export default function StatsCards({ rate }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-[#15171d] rounded-xl p-5">
        <p className="text-xs text-gray-400">OPEN</p>
        <p className="text-2xl">{rate.toFixed(4)}</p>
      </div>

      <div className="bg-[#15171d] rounded-xl p-5">
        <p className="text-xs text-gray-400">LAST</p>
        <p className="text-2xl">{rate.toFixed(4)}</p>
      </div>

      <div className="bg-[#15171d] rounded-xl p-5">
        <p className="text-xs text-gray-400">CHANGE</p>
        <p className="text-2xl text-lime-400">+0.0014</p>
      </div>

      <div className="bg-[#15171d] rounded-xl p-5">
        <p className="text-xs text-gray-400">% CHANGE</p>
        <p className="text-2xl text-lime-400">+0.16%</p>
      </div>
    </div>
  );
}
