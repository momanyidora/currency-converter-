

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
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <h2 className="font-bold">Conversion Log</h2>

        <button
          onClick={clearLogs}
          className="
    px-3 py-1
    rounded
    bg-red-500
    hover:bg-red-600
    text-white
    transition-colors
    focus:ring-2
focus:ring-offset-2
focus:ring-blue-500
  "
        >
          Clear
        </button>
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
