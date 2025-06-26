import { useState } from "react";
import CreateProductModal from "@/components/CreateProductModal";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/lib/state/apiSlice";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const { data: products = [] } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  console.log("Products:", products);

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const response = await updateProduct({ id, ...updatedData }).unwrap();
      console.log("Product updated successfully:", response);
    } catch (error) {
      console.error("Error updating product:", error);
      alert(`Error updating product: ${error.message}`);
    }
  };

  const deleteProductById = async (id) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(`Error deleting product: ${error.message}`);
    }
  };

  return (
    <div className="h-screen overflow-hidden px-10 py-2">
      <div className="relative top-[80px] h-[calc(100%-80px)] flex flex-col gap-8">
        <button
          onClick={() => setShowModal(!showModal)}
          className="px-6 py-3 bg-wine-berry rounded-lg text-white inline-flex w-fit"
        >
          Add A Product
        </button>

        {showModal && (
          <CreateProductModal close={() => setShowModal(!showModal)} />
        )}

        {/* Products */}
        <div className="flex-1 overflow-y-auto scroll-none">
          <h2 className="uppercase text-2xl underline">Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={product.image_url}
                    alt={`Product ${product}`}
                    className="h-1/2 w-1/2 object-cover rounded-md"
                  />
                </div>

                <h3 className="text-lg font-semibold">{product.name}</h3>

                <p className="text-gray-600 mt-2">{product.description}.</p>

                <div className="mt-4 flex flex-col justify-between">
                  <div className="flex gap-5 items-center mb-4">
                    <span className="text-xl font-bold">
                      Price: {product.price}
                    </span>
                    <span className="text-xl font-bold">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        handleUpdateProduct(product.id, {
                          name: product.name,
                          description: product.description,
                          price: 55.0,
                          stock: product.stock,
                          // image_url: product.image_url,
                        })
                      }
                      className="px-4 py-2 bg-toledo text-white rounded-lg hover:bg-wewak transition duration-300"
                    >
                      Update Product
                    </button>
                    <button
                      onClick={() => deleteProductById(product.id)}
                      className="px-4 py-2 bg-toledo text-white rounded-lg hover:bg-wewak transition duration-300"
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
