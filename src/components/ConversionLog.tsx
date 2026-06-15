

interface LogItem {
  from: string;
  to: string;
  amount: number;
  result: number;
}

interface Props {
  logs: LogItem[];
  clearLogs: () => void;
}

export default function ConversionLog({ logs, clearLogs }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between">
        <h2 className="font-bold">Conversion Log</h2>

        <button onClick={clearLogs}>Clear</button>
      </div>

      {logs.map((log, index) => (
        <div key={index}>
          {log.amount} {log.from}→ {log.result.toFixed(2)}
          {log.to}
        </div>
      ))}
    </div>
  );
}
