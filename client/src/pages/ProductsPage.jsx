import { useGetProductsQuery } from "../lib/state/apiSlice";

function ProductsPage() {
  const { data: products = [] } = useGetProductsQuery();
  return (
    <div className="h-screen px-10 py-2">
      <div className="relative top-[80px] h-[calc(100%-80px)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-wewak/20 h-70 rounded-4xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4 absolute h-full w-full bg-wewak rounded-4xl z-10">
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
                    <span className="text-sm font-bold">
                      Price: ${product.price}
                    </span>
                    <span className="text-sm font-bold">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <button className="px-4 py-2  bg-toledo text-white rounded-lg hover:bg-wewak transition duration-300">
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
