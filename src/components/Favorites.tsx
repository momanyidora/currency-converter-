interface Props {
  favorites: string[];
}

export default function Favorites({ favorites }: Props) {
  return (
    <div>
      <h2 className="font-bold">Favorites</h2>

      {favorites.map((pair) => (
        <div key={pair}>{pair}</div>
      ))}
    </div>
  );
}
