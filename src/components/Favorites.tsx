interface Props {
  favorites: string[];
  onRemove: (pair: string) => void;
  onLoad: (pair: string) => void;
}

export default function Favorites({ favorites, onRemove, onLoad }: Props) {
  return (
    <div className="bg-[#15171d] rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Favorite Pairs</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorites yet</p>
      ) : (
        <div className="space-y-3">
          {favorites.map((pair) => (
            <div key={pair} className="flex items-center justify-between">
              <button onClick={() => onLoad(pair)} className="text-lime-400">
                {pair}
              </button>

              <button onClick={() => onRemove(pair)} className="text-red-400">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
