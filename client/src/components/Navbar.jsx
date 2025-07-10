import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, clearCredentials } from "@/lib/state/authSlice";
import { Heart, ShoppingCart, LogIn, LogOut } from "lucide-react";
import { useGetUserImageQuery, useLogoutMutation } from "../lib/state/apiSlice";

import NavModal from "./NavModal";
import { links } from "@/data/navLinks";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null); // State to hold the user image
  const currentUser = useSelector(selectCurrentUser);
  const { data: userImage, isSuccess } = useGetUserImageQuery(undefined, {
    skip: !currentUser,
  });
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call the logout mutation

      dispatch(clearCredentials()); // Clear user credentials in Redux store
      close();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setImage(userImage?.imageUrl || null);
    }
  }, [isSuccess, userImage]);

  console.log("currentUser", currentUser);

  const navigateToCart = () => {
    navigate("/cart");
    // close();
  };

  const navigateToFavorites = () => {
    navigate("/favorites");
    // close();
  };

  return (
    <>
      <nav
        className="h-12 w-[90%] bg-wine-berry fixed z-50 left-1/2 -translate-x-1/2 top-5 rounded-full
    flex items-center justify-between px-2"
      >
        {/* Render links for larger screens */}
        <div className="hidden flex-1 lg:flex items-center">
          <ul className="lg:flex gap-2">
            {links
              .filter(
                (link) =>
                  currentUser?.role === "admin" || link.name !== "Dashboard"
              )
              .map((link, index) => {
                return (
                  <li
                    key={index}
                    className="group flex items-center justify-center w-22 h-9 rounded-full transition-colors duration-300 focus-within:bg-wewak"
                  >
                    <Link
                      to={link.path}
                      onClick={close}
                      className="flex items-center justify-center rounded-full w-full h-9 text-sm font-semibold lg:font-light text-wewak hover:bg-wewak hover:text-livid-brown focus:text-livid-brown"
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="lg:flex-1 flex justify-center">
          <Link to="/" className="text-white lg:text-2xl font-bold">
            Sweet Tooth
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2">
          <ul className="hidden lg:flex gap-4 mr-4">
            <li className="bg-candle-light rounded-full p-2 flex items-center justify-center">
              <Heart
                height={15}
                width={15}
                className="cursor-pointer hover:scale-120 hover:text-black transition duration-300"
                onClick={navigateToFavorites}
              />
            </li>
            <li className="bg-candle-light rounded-full p-2 flex items-center justify-center">
              <ShoppingCart
                height={15}
                width={15}
                className="cursor-pointer hover:scale-120 hover:text-black transition duration-300"
                onClick={navigateToCart}
              />
            </li>
            {!currentUser ? (
              <li className="bg-candle-light rounded-full p-2 flex items-center justify-center">
                <Link
                  to="/login"
                  className="cursor-pointer hover:scale-120 hover:text-black transition duration-300"
                >
                  <LogIn height={15} width={15} />
                </Link>
              </li>
            ) : (
              <div>
                <div className="h-8 w-8 rounded-full">
                  <img
                    src={image || "https://placehold.co/600x400"}
                    alt="User"
                    className="h-full w-full object-cover rounded-full cursor-pointer"
                    onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                  />
                </div>

                {showLogoutMenu && (
                  <div className="absolute right-0 top-13 bg-white shadow-lg rounded-md p-3">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowLogoutMenu(false);
                      }}
                      className="text-red-500 hover:text-red-700 flex items-center justify-center gap-2"
                    >
                      <LogOut height={13} width={13} /> <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </ul>

          {/* Mobile Navigation Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 lg:hidden">
            <Menu className="text-white" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <NavModal
            user={currentUser}
            key={"nav-modal"}
            close={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
