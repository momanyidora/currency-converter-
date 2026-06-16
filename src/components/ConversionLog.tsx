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
  removeLog: (id: string) => void;
}

export default function ConversionLog({ logs, clearLogs, removeLog }: Props) {
  return (
    <div className="bg-[#15171d] rounded-2xl p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Conversion Log</h2>

        <button onClick={clearLogs} className="bg-red-500 px-4 py-2 rounded-xl">
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex justify-between bg-[#1b1d25] p-4 rounded-xl"
          >
            <span>
              {log.amount} {log.from} → {log.result.toFixed(2)} {log.to}
            </span>

            <button onClick={() => removeLog(log.id)} className="text-red-400">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
