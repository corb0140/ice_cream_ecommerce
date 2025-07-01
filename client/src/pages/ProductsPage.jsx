import {
  useGetProductsQuery,
  useAddToCartMutation,
} from "../lib/state/apiSlice";
import { useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../lib/state/authSlice";

const colors = [
  "bg-wewak",
  "bg-wine-berry",
  "bg-cerulean-blue",
  "bg-emerald-green",
  "bg-sunshine-yellow",
  "bg-purple-heart",
  "bg-royal-pink",
  "bg-tangerine",
  "bg-mint-green",
  "bg-coral-pink",
];

function ProductsPage() {
  const { data: products = [] } = useGetProductsQuery();
  const [addToCart] = useAddToCartMutation();
  const currentUser = useSelector(selectCurrentUser);

  const productsWithColors = useMemo(() => {
    return products.map((product) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return { ...product, color };
    });
  }, [products]);

  const handleAddToCart = (productId) => {
    if (!currentUser) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }

    addToCart({ productId, quantity: 1 });
    toast.success("Product added to cart successfully!");
  };

  return (
    <div className="h-screen px-10 py-2">
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="relative top-[80px] h-[calc(100%-80px)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {productsWithColors.map((product) => (
            <div
              key={product.id}
              className="group relative bg-wewak/20 h-70 rounded-4xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`flex items-center justify-center mb-4 absolute h-full w-full ${product.color} rounded-4xl z-10`}
              >
                <img
                  src={product.image_url}
                  alt={`Product ${product.name}`}
                  className="h-full w-full object-cover rounded-md z-10"
                />
              </div>

              <div className="absolute w-full h-full flex flex-col p-4 rounded-b-4xl bg-white z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>

                <div className="mt-4 flex flex-col md:justify-between">
                  <div className="flex flex-col gap-2 md:gap-5 mb-4">
                    <span className="text-sm">Price: ${product.price}</span>
                    <span className="text-sm">Stock: {product.stock}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`px-4 py-2 ${product.color} text-white rounded-lg hover:bg-toledo transition duration-300`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
