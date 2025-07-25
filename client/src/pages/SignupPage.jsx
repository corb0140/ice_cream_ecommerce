import { useState } from "react";
import FormInputs from "@/components/FormComponent";
import { Link } from "react-router-dom";
import { useSignupMutation } from "@/lib/state/apiSlice";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    // check if password matches confirmPassword
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    //password validation
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(formData.password)) {
      return toast.error(
        "Password must be at least 8 characters long and contain at least one special character."
      );
    }

    // email validation
    if (!formData.email.includes("@")) {
      return toast.error("Please enter a valid email address.");
    }

    //handle form submission. send data to the server
    try {
      await signup({
        email: formData.email,
        password: formData.password,
        username: formData.name,
      }).unwrap();

      navigate("/login");
    } catch (err) {
      toast.error(
        "Signup failed: " + (err?.data?.message || "Please try again later.")
      );
      return;
    }

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="h-screen overflow-hidden p-10 lg:flex lg:justify-center lg:items-center">
      <div>
        <Toaster position="top-center" />
      </div>
      <div
        className="relative not-lg:top-[80px] not-lg:h-[calc(100%-80px)] bg-wine-berry rounded-lg shadow-[2px_2px_10px] shadow-livid-brown
        flex flex-col gap-10 p-5 lg:w-1/2 text-white"
      >
        {/* MESSAGE */}
        <section className="flex flex-col gap-2">
          <h2 className="text-white text-2xl">Sign Up</h2>
          <p>
            Get started by creating an account. It takes less than a minute to
            register
          </p>
        </section>

        {/* FORM */}
        <form
          method="POST"
          onSubmit={handleSignupSubmit}
          className="flex flex-col gap-5"
        >
          <FormInputs
            name="Username"
            type="text"
            value={formData.name}
            setValue={(value) => setFormData({ ...formData, name: value })}
            isRequired={true}
          />

          <FormInputs
            name="Email"
            type="email"
            value={formData.email}
            setValue={(value) => setFormData({ ...formData, email: value })}
            isRequired={true}
          />

          <FormInputs
            name="Password"
            type={showPassword === true ? "text" : "password"}
            showIcon={() => setShowPassword(!showPassword)}
            value={formData.password}
            setValue={(value) => setFormData({ ...formData, password: value })}
          />

          <FormInputs
            name="ConfirmPassword"
            type={showPassword === true ? "text" : "password"}
            showIcon={() => setShowPassword(!showPassword)}
            value={formData.confirmPassword}
            setValue={(value) =>
              setFormData({ ...formData, confirmPassword: value })
            }
            isRequired={true}
          />

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              disabled={isLoading}
              className="border-3 border-wewak text-wewak inline-flex w-fit px-10 py-2 rounded font-semibold
              hover:bg-wewak hover:text-white transition-colors duration-300"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-wewak font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
