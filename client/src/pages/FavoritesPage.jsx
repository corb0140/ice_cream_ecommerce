import {
  useGetUserFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/lib/state/apiSlice";
import { CircleMinus } from "lucide-react";
import Loader from "@/components/Loader";

export default function FavoritesPage() {
  const { data: favorites, isLoading, isError } = useGetUserFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const handleRemove = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from your favorites?"
    );
    if (confirmed) {
      removeFavorite(productId);
    }
  };

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-lg text-red-500">
          Failed to load favorites.
        </p>
      </div>
    );

  if (!favorites || favorites.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center font-bold text-xl text-toledo">
          No favorites added.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen overflow-hidden px-4 py-2">
      <div className="relative top-[80px] h-[calc(100%-80px)]">
        <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow rounded-xl flex flex-col"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-40 object-contain rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500 flex-grow">
                {product.description}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-bold text-primary">${product.price}</span>
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => handleRemove(product.id)}
                >
                  <CircleMinus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
