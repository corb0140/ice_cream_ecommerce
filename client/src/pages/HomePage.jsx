import ice_cream_banner from "@/assets/imgs/ice-cream-banner.png";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  selectJustLoggedIn,
  clearJustLoggedIn,
} from "@/lib/state/authSlice";
import toast, { Toaster } from "react-hot-toast";

function HomePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const justLoggedIn = useSelector(selectJustLoggedIn);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current && currentUser && justLoggedIn) {
      toast(`Welcome, ${currentUser.username}!`);
      dispatch(clearJustLoggedIn());
      hasShownToast.current = true;
    }
  }, [currentUser, justLoggedIn, dispatch]);

  return (
    <div
      id="hero_banner"
      className="h-[100vh] w-full flex flex-col items-center relative overflow-hidden"
    >
      <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
      <div className="relative top-[120px] flex flex-col items-center gap-8 px-5 lg:z-10">
        <h1 className="uppercase font-extrabold text-wine-berry text-5xl lg:text-8xl text-center">
          "scoop up some sweetness!
        </h1>

        <p className="text-center text-[15px] lg:text-[15px] lg:w-1/2 lg:text-toledo">
          Nothing beats the creamy, dreamy bliss of a perfectly scooped ice
          cream on a warm day, Whether it's the rich decadence of chocolate, the
          refreshing zing of mint, or the classic comfort of vanilla, each scoop
          is a moment of pure joy.
        </p>
      </div>

      <div className="absolute -bottom-18 w-full">
        <div className="relative flex flex-col items-center">
          <img
            src={ice_cream_banner}
            alt="Ice Cream Banner"
            className="relative h-100 lg:h-full lg:top-100 w-full object-cover lg:object-fill"
          />

          <Link
            to="/products"
            className="bg-wine-berry rounded-full h-13 lg:h-15 w-40 lg:w-60 absolute top-60 lg:top-170 flex items-center justify-center"
          >
            <span className="text-candle-light text-sm">Shop Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
