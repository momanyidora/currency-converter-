interface LogItem {
  id: string;
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
      <div className="flex justify-between items-center">
        <h2 className="font-bold">Conversion Log</h2>

        <button
          onClick={clearLogs}
          className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="text-sm">
            {log.amount} {log.from} → {log.result.toFixed(2)} {log.to}
          </div>
        ))}
      </div>
    </div>
  );
}
