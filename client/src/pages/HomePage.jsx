import ice_cream_banner from "@/assets/imgs/ice-cream-banner.png";

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
      id="hero_banner"
      className="h-[100vh] w-full flex flex-col items-center relative overflow-hidden"
    >
      <div className="relative top-[120px] flex flex-col items-center gap-8 px-5">
        <h1 className="uppercase font-bold text-wine-berry text-5xl text-center">
          "scoop up some sweetness!
        </h1>

        <p className="text-center text-[15px]">
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
            className="h-100 w-full object-cover"
          />

          <Link
            to="/products"
            className="bg-wine-berry rounded-full h-13 w-40 absolute top-60 flex items-center justify-center"
          >
            <span className="text-candle-light text-sm">Shop Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
