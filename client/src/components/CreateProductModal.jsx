import { useState } from "react";
import FormInputs from "./FormComponent";
import { CircleX } from "lucide-react";

import { useCreateProductMutation } from "@/lib/state/apiSlice";

function CreateProductModal({ close }) {
  const [data, setData] = useState({
    productName: "",
    description: "",
    price: 0,
    stock: 0,
    image: null,
  });
  const [createProduct] = useCreateProductMutation();

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setImage(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("image", image);

      await createProduct(formData).unwrap();

      // Reset form data after submission
      setData({
        productName: "",
        description: "",
        price: 0,
        stock: 0,
        image: null,
      });
      setPreview(null);
      close(); // Close the modal after successful creation
    } catch (error) {
      console.error("Error creating product:", error);
      alert(`Error creating product: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex flex-col items-center justify-center z-50">
      <form
        action=""
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Create Product</h2>

          <CircleX
            onClick={close}
            height={25}
            width={25}
            className="cursor-pointer"
          />
        </div>

        <FormInputs
          name="Product Name"
          type="text"
          value={data.productName}
          setValue={(value) => setData({ ...data, productName: value })}
          isRequired={true}
        />

        <FormInputs
          name="Description"
          type="text"
          value={data.description}
          setValue={(value) => setData({ ...data, description: value })}
          isRequired={true}
        />

        <FormInputs
          name="Price"
          type="number"
          value={data.price}
          setValue={(value) => setData({ ...data, price: value })}
          isRequired={true}
        />

        <FormInputs
          name="Stock"
          type="number"
          value={data.stock}
          setValue={(value) => setData({ ...data, stock: value })}
          isRequired={true}
        />

        <FormInputs
          name="Image"
          type="file"
          accept="image/*"
          value={data.image}
          setValue={(value) => setData({ ...data, image: value })}
          isRequired={true}
          onFileChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-4 bg-toledo text-white px-4 py-2 rounded hover:bg-wewak transition-colors duration-300"
        >
          Create Product
        </button>
      </form>

      {preview && (
        <div className="mt-6 bg-white px-10 flex flex-col items-center rounded-lg">
          <h3 className="text-lg font-semibold">Image Preview:</h3>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded mt-2"
          />
        </div>
      )}
    </div>
  );
}

export default CreateProductModal;
