import Lottie from "lottie-react";
import Loading from "@/Loading.json";

function Loader({ isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Lottie animationData={Loading} loop={true} className="w-20 h-20" />
      </div>
    );
  }
}

export default Loader;
