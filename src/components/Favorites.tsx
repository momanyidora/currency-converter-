interface Props {
  favorites: string[];
  onRemove: (pair: string) => void;
}

export default function Favorites({ favorites, onRemove }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="font-bold mb-2">Favorite Pairs</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((pair) => (
          <div key={pair} className="flex justify-between">
            <span>{pair}</span>

            <button
              onClick={() => onRemove(pair)}
              aria-label={`Remove ${pair}`}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
