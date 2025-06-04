import { useState } from "react";
import { FormButton, FormInputs } from "@/components/FormComponent";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen overflow-hidden p-10">
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
        <form action="" className="flex flex-col gap-5">
          <FormInputs name="Name" type="text" />
          <FormInputs name="Email" type="email" />

          <FormInputs
            name="Password"
            type={showPassword === true ? "text" : "password"}
            showIcon={() => setShowPassword(!showPassword)}
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
              className="border-3 border-wewak text-wewak inline-flex w-fit px-10 py-2 rounded font-semibold
              hover:bg-wewak hover:text-white transition-colors duration-300"
            >
              Login
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
