interface Props {
  logs: string[];
}

export default function ConversionLog({ logs }: Props) {
  return (
    <div>
      <h2 className="font-bold">Conversion Log</h2>

      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
}
