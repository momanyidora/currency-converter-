interface Props {
  favorites: string[];
  onRemove: (pair: string) => void;
}

export default function Favorites({ favorites, onRemove }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="font-bold mb-2">Favorite Pairs</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((pair) => (
          <div key={pair} className="flex justify-between">
            <span>{pair}</span>

            <button onClick={() => onRemove(pair)}></button>
          </div>
        ))
      )}
    </div>
  );
}
