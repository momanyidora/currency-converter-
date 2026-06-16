import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

interface RateData {
  date: string;
  rate: number;
}

interface Props {
  data: RateData[];
}

export default function RateChart({ data }: Props) {
  return (
    <div className="bg-[#15171d] rounded-2xl p-6 h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="date" tick={{ fill: "#999" }} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="rate"
            stroke="#C8FF3D"
            fill="#C8FF3D"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
