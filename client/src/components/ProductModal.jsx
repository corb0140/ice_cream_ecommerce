import { useState, useEffect } from "react";
import FormInputs from "./FormComponent";
import { CircleX } from "lucide-react";

function ProductModal({ close, productFunction, defaultValues = null }) {
  const [data, setData] = useState({
    productName: defaultValues?.name || "",
    description: defaultValues?.description || "",
    price: defaultValues?.price || 0,
    stock: defaultValues?.stock || 0,
  });

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [hasNewImage, setHasNewImage] = useState(false);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setImage(selected);
      setPreview(URL.createObjectURL(selected));
      setHasNewImage(true);
    } else {
      if (defaultValues?.image_url) {
        setPreview(defaultValues.image_url);
        setHasNewImage;
      } else {
        setPreview(null);
        setHasNewImage(false);
      }
      setImage(null);
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

      if (hasNewImage && image) {
        formData.append("image", image);
      }

      if (defaultValues?.id) {
        formData.append("id", defaultValues.id);
      }

      await productFunction(formData);

      // Reset form data after submission
      setData({
        productName: "",
        description: "",
        price: 0,
        stock: 0,
      });
      setPreview(null);
      setImage(null);
      setHasNewImage(false);
      close(); // Close the modal after successful creation
    } catch (error) {
      console.error("Error creating product:", error);
      alert(`Error creating product: ${error.message}`);
    }
  };

  useEffect(() => {
    if (defaultValues) {
      setPreview(defaultValues.image_url || null);
      setHasNewImage(false);
    }
  }, [defaultValues]);

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex flex-col items-center justify-center z-50">
      <form
        action=""
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            {defaultValues ? "Update Product" : "Create Product"}
          </h2>

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
          isRequired={!defaultValues}
        />

        <FormInputs
          name="Description"
          type="text"
          value={data.description}
          setValue={(value) => setData({ ...data, description: value })}
          isRequired={!defaultValues}
        />

        <FormInputs
          name="Price"
          type="number"
          value={data.price}
          setValue={(value) => setData({ ...data, price: value })}
          isRequired={!defaultValues}
        />

        <FormInputs
          name="Stock"
          type="number"
          value={data.stock}
          setValue={(value) => setData({ ...data, stock: value })}
          isRequired={!defaultValues}
        />

        <FormInputs
          name="Image"
          type="file"
          accept="image/*"
          value={data.image}
          setValue={(value) => setData({ ...data, image: value })}
          isRequired={!defaultValues}
          onFileChange={handleChange}
        />

        {/* Show current image info when updating */}
        {defaultValues && !hasNewImage && (
          <p className="text-sm text-gray-600 mt-2">
            Current image will be kept if no new image is selected
          </p>
        )}

        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-4 bg-toledo text-white px-4 py-2 rounded hover:bg-wewak transition-colors duration-300"
        >
          {defaultValues ? "Update" : "Create"} Product
        </button>
      </form>

      {preview && (
        <div className="mt-6 bg-white px-10 flex flex-col items-center rounded-lg">
          <h3 className="text-lg font-semibold">
            {hasNewImage ? "New Image Preview" : "Current Image"}
          </h3>
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

export default ProductModal;
