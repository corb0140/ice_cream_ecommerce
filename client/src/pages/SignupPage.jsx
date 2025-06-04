import { useState } from "react";
import FormInputs from "@/components/FormComponent";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    //handle form submission. send data to the server
    console.log("Form submitted:", formData);

    // Validate form data
    // check if password matches confirmPassword
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    //password validation
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(formData.password)) {
      return alert(
        "Password must be at least 8 characters long and contain at least one special character."
      );
    }

    // email validation
    if (!formData.email.includes("@")) {
      return alert("Please enter a valid email address.");
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
    <div className="h-screen overflow-hidden p-10">
      <div
        className="relative top-[80px] h-[calc(100%-80px)] bg-wine-berry rounded-lg shadow-[2px_2px_10px] shadow-livid-brown
        flex flex-col gap-10 p-5 text-white"
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
          action=""
          onSubmit={handleSignupSubmit}
          className="flex flex-col gap-5"
        >
          <FormInputs
            name="Name"
            type="text"
            value={formData.name}
            setValue={(value) => setFormData({ ...formData, name: value })}
          />
          <FormInputs
            name="Email"
            type="email"
            value={formData.email}
            setValue={(value) => setFormData({ ...formData, email: value })}
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
          />

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="border-3 border-wewak text-wewak inline-flex w-fit px-10 py-2 rounded font-semibold
              hover:bg-wewak hover:text-white transition-colors duration-300"
            >
              Sign Up
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
