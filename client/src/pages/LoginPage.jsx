import { useState } from "react";
import FormInputs from "@/components/FormComponent";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
import { useLoginMutation } from "@/lib/state/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/state/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookie from "js-cookie";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = Cookie.get("accessToken");

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    //handle form submission. send data to the server
    try {
      const userData = await login({
        identifier: formData.email,
        password: formData.password,
      }).unwrap(); // unwrap to get the data directly

      if (userData?.user) {
        // dispatch the user data to the store
        dispatch(
          setCredentials({
            user: userData.user,
            accessToken: accessToken,
          })
        );
      }

      toast.success("Login successful! Redirecting to home page...");

      // redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1500); // delay for toast to show
    } catch (err) {
      toast.error(
        "Login failed: " + (err?.data?.message || "Please try again later.")
      );
      return;
    }

    // reset form after submission
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-screen overflow-hidden p-10">
      <div>
        <Toaster position="top-center" />
      </div>

      <div
        className="relative top-[80px] h-[calc(100%-80px)] bg-wine-berry rounded-lg shadow-[2px_2px_10px] shadow-livid-brown
        flex flex-col gap-10 p-5 text-white"
      >
        {/* MESSAGE */}
        <section className="flex flex-col gap-2">
          <h2 className="text-white text-2xl">Log In</h2>
          <p>Log in and start ordering your favorite ice cream today</p>
        </section>

        {/* FORM */}
        <form
          action=""
          onSubmit={handleLoginSubmit}
          className="flex flex-col gap-5"
        >
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

          <button
            type="button"
            className="text-wewak text-sm inline-flex justify-end"
          >
            Forgot Password?
          </button>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              disabled={isLoading}
              className="border-3 border-wewak text-wewak inline-flex w-fit px-10 py-2 rounded font-semibold
              hover:bg-wewak hover:text-white transition-colors duration-300"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-wewak font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
