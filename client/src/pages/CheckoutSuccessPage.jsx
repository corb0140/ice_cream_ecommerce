function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-early-dawn">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-700">
          🎉 Payment Successful!
        </h1>
        <p className="mt-2 text-wine-berry text-lg">
          Thank you for your order.
        </p>
      </div>
    </div>
  );
}

export default CheckoutSuccessPage;
