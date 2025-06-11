import { useState } from "react";
import FormInputs from "@/components/FormComponent";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/state/authSlice";
import { useUploadImageMutation } from "@/lib/state/apiSlice";

function SettingsPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    profileImage: null,
  });

  const currentUser = useSelector(selectCurrentUser);
  const [uploadImage] = useUploadImageMutation();

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setImage(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await uploadImage(formData).unwrap(); // Call the uploadImage mutation
      console.log("Image uploaded successfully:", response);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log("Form submitted with data:", formData);

    // Reset form data after submission
    setFormData({
      username: "",
      password: "",
      profileImage: null,
    });
  };

  return (
    <div className="h-screen overflow-hidden px-10 py-2">
      <div className="relative top-[80px] h-[calc(100%-80px)] flex flex-col gap-5">
        <h2 className="uppercase text-3xl ">Settings</h2>

        <form
          action=""
          onSubmit={handleFormSubmit}
          className="rounded-lg flex-1 flex flex-col gap-4"
        >
          <FormInputs
            name="Change Username"
            type="text"
            value={formData.username}
            setValue={(value) => setFormData({ ...formData, username: value })}
            isRequired={false}
          />

          <FormInputs
            name="Change Password"
            type="password"
            value={formData.password}
            setValue={(value) => setFormData({ ...formData, password: value })}
            showIcon={true}
            isRequired={false}
          />

          <button type="submit" className="flex" disabled={!currentUser}>
            <span
              className={`${
                currentUser
                  ? "bg-toledo text-candle-light  hover:bg-wewak hover:text-livid-brown transition-colors duration-300"
                  : "bg-gray-500 text-black"
              } py-4 px-2 rounded-md`}
            >
              Save Changes
            </span>
          </button>
        </form>

        <div className="flex flex-col gap-4 flex-1">
          <FormInputs
            name="Upload Profile Image"
            type="file"
            value={formData.profileImage}
            accept="image/*"
            setValue={(value) => {
              setFormData({ ...formData, profileImage: value });
            }}
            onFileChange={handleChange}
          />

          {preview && (
            <div className="h-25 w-25 rounded-full overflow-hidden ">
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          )}

          <button
            onClick={() => handleUploadImage(image)}
            disabled={!currentUser}
            className={`flex w-fit ${
              currentUser
                ? "bg-toledo text-candle-light  hover:bg-wewak hover:text-livid-brown transition-colors duration-300"
                : "bg-gray-500 text-black"
            } py-4 px-2 rounded-md`}
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
