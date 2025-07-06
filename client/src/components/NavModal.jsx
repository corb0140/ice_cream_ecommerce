import { CircleX, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useLogoutMutation } from "../lib/state/apiSlice";
import { useGetUserImageQuery } from "../lib/state/apiSlice";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/lib/state/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Links
import { links } from "@/data/navLinks";

function NavModal({ close, user }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [image, setImage] = useState(null); // State to hold the user image

  const [logout] = useLogoutMutation();
  const { data: userImage, isSuccess } = useGetUserImageQuery(undefined, {
    skip: !user,
  });

  useEffect(() => {
    if (isSuccess) {
      setImage(userImage?.imageUrl || null);
    }
  }, [isSuccess, userImage]);

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call the logout mutation

      dispatch(clearCredentials()); // Clear user credentials in Redux store
      close();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navigateToCart = () => {
    navigate("/cart");
    close();
  };

  const navigateToFavorites = () => {
    navigate("/favorites");
    close();
  };

  const modalVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        bounce: 5,
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed z-100 right-0 h-full w-2/4 bg-wine-berry shadow-lg"
    >
      <div className="flex flex-col items-center gap-10 h-full py-4">
        {/* EXIT */}
        <CircleX
          onClick={close}
          height={30}
          width={30}
          className="text-candle-light relative left-20 cursor-pointer"
        />

        {/* PROFILE, FAVORITES & CART */}
        <div className="w-full flex flex-col p-2 gap-5 items-center justify-center">
          <div className="h-25 w-25 rounded-full">
            <img
              src={image || "https://placehold.co/600x400"}
              alt="User"
              className="h-full w-full object-cover rounded-full"
            />
          </div>

          <h1 className="w-full text-xl break-words px-2 text-wewak text-center">
            {user?.username || "Guest"}
          </h1>

          <ul className="flex items-center gap-3">
            <li>
              <Heart
                height={22}
                width={22}
                className="text-candle-light cursor-pointer hover:scale-120 hover:text-wewak transition duration-300"
                onClick={navigateToFavorites}
              />
            </li>
            <li>
              <ShoppingCart
                height={22}
                width={22}
                className="text-candle-light cursor-pointer hover:scale-120 hover:text-wewak transition duration-300"
                onClick={navigateToCart}
              />
            </li>
          </ul>
        </div>

        {/* NAVIGATION LINKS */}
        <ul className="flex flex-col gap-4">
          {links
            .filter(
              (link) => user?.role === "admin" || link.name !== "Dashboard"
            )
            .map((link, index) => {
              return (
                <li
                  key={index}
                  className="group flex items-center justify-center w-25 h-9 rounded-md transition-colors duration-300 focus-within:bg-wewak"
                >
                  <Link
                    to={link.path}
                    onClick={close}
                    className="flex items-center justify-center rounded-md w-full h-9 text-sm font-semibold text-wewak hover:bg-wewak hover:text-livid-brown focus:text-livid-brown"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
        </ul>

        {/* AUTH */}
        {!user ? (
          <div className="flex flex-col gap-4">
            <Link
              to="/login"
              onClick={close}
              className="flex justify-center bg-toledo text-candle-light rounded-md px-4 py-2 hover:bg-wewak hover:text-livid-brown transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={close}
              className="flex justify-center bg-toledo text-candle-light rounded-md px-4 py-2 hover:bg-wewak hover:text-livid-brown transition-colors duration-300"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogout}
              className="flex justify-center bg-toledo text-candle-light rounded-md px-4 py-2 hover:bg-wewak hover:text-livid-brown transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default NavModal;
