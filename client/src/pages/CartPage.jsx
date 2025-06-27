import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveItemFromCartMutation,
} from "@/lib/state/apiSlice";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { data: cart } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveItemFromCartMutation();

  console.log("Cart data:", cart);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem({ itemId, quantity: newQuantity }).unwrap();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId).unwrap();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const calculateItemTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateCartTotal = () => {
    if (!cart?.items) return "0.00";

    return cart.items
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-early-dawn flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-toledo mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">Add some items to get started!</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-wine-berry text-white px-6 py-3 rounded-lg hover:bg-toledo transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden px-4 py-2 bg-early-dawn">
      <div className="relative top-[80px] h-[calc(100%-80px)]">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="h-6 w-6 mr-2" />
              Shopping Cart ({cart.items.length}{" "}
              {cart.items.length === 1 ? "item" : "items"})
            </h1>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image_url || "/api/placeholder/80/80"}
                    alt={item.name || "Product"}
                    className="h-20 w-20 rounded-lg object-cover bg-gray-100"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {item.name || `Product ${item.product_id}`}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.description || "No description available"}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    ${item.price ? item.price : "0.00"}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="w-12 text-center font-medium text-gray-900">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${calculateItemTotal(item.price || 0, item.quantity)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-900">
                ${calculateCartTotal()}
              </span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/products")}
                className="flex-1 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-toledo transition-colors"
              >
                Continue Shopping
              </button>
              <button className="flex-1 bg-wewak text-toledo py-2 px-6 rounded-lg hover:bg-toledo hover:text-white transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
