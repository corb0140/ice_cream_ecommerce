import { useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useCreateCheckoutSessionMutation,
} from "@/lib/state/apiSlice";
import Loader from "@/components/Loader";
import { ShoppingCart } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart, isLoading, isError } = useGetCartQuery();
  const [createCheckoutSession, { isLoading: isCreating }] =
    useCreateCheckoutSessionMutation();

  const handleCheckout = async () => {
    if (!cart?.items || cart.items.length === 0) {
      return toast.error(
        "Your cart is empty. Please add items before proceeding to checkout."
      );
    }

    try {
      const response = await createCheckoutSession(cart.items).unwrap();
      if (response?.url) {
        // Redirect to the Stripe checkout page
        window.location.href = response.url;
      } else {
        toast.error("Failed to create checkout session. Please try again.");
        console.error("No URL returned from createCheckoutSession:", response);
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      toast.error("Failed to create checkout session. Please try again.");
      return;
    }
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError || !cart || !cart.items.length) {
    return (
      <div className="min-h-screen bg-early-dawn flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-toledo mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add items to your cart before checking out.
          </p>
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

  const total = cart.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen overflow-hidden px-4 py-2 bg-early-dawn">
      <div className="relative top-[80px] h-[calc(100%-80px)]">
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Summary
          </h1>

          <ul className="divide-y divide-gray-200 mb-6">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-right font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center text-lg font-semibold mb-6">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isCreating}
            className="w-full bg-wewak text-toledo py-3 rounded-lg hover:bg-toledo hover:text-white transition-colors disabled:opacity-50"
          >
            {isCreating ? "Redirecting to Stripe..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
