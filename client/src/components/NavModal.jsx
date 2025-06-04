import { CircleX, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

// Links
const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact Us", path: "/contact" },
];

function NavModal({ close }) {
  return (
    <div className="fixed z-100 right-0 h-full w-2/4 bg-wine-berry shadow-lg">
      <div className="flex flex-col items-center gap-10 h-full p-4">
        {/* EXIT */}
        <CircleX
          onClick={close}
          height={30}
          width={30}
          className="text-candle-light relative left-20 cursor-pointer"
        />

        {/* PROFILE, FAVORITES & CART */}
        <div className="flex flex-col gap-5 items-center">
          <div className="h-30 w-30 rounded-full border border-wewak"></div>
          <h1 className="text-2xl text-wewak">{"Guest"}</h1>

          <ul className="flex items-center gap-3">
            <li>
              <Heart height={22} width={22} className="text-candle-light" />
            </li>
            <li>
              <ShoppingCart
                height={22}
                width={22}
                className="text-candle-light"
              />
            </li>
          </ul>
        </div>

        {/* NAVIGATION LINKS */}
        <ul className="flex flex-col gap-4">
          {links.map((link, index) => {
            return (
              <li
                key={index}
                className="group flex items-center justify-center w-25 h-9 rounded-md transition-colors duration-300 focus-within:bg-wewak"
              >
                <Link
                  to={link.path}
                  className="flex items-center justify-center rounded-md w-full h-9 text-sm font-semibold text-wewak hover:bg-wewak hover:text-livid-brown focus:text-livid-brown"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default NavModal;
