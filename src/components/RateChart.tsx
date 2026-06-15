import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RateData {
  date: string;
  rate: number;
}

interface Props {
  data: RateData[];
}

export default function RateChart({ data }: Props) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="rate" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
