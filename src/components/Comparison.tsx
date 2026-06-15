interface Props {
  amount: number;
}

export default function Comparison({ amount }: Props) {
  return (
    <div>
      <h2 className="font-bold">Multi Currency Comparison</h2>

      <p>Convert {amount} into several currencies</p>
    </div>
  );
}
