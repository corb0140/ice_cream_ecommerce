import { useState } from "react";
import { AnimatePresence } from "motion/react";
// import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/state/authSlice";
import { Link } from "react-router-dom";

import NavModal from "./NavModal";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  console.log("currentUser", currentUser);

  return (
    <>
      <nav
        className="h-12 w-[90%] bg-wine-berry fixed z-50 left-1/2 -translate-x-1/2 top-5 rounded-full
    flex items-center justify-between px-4"
      >
        <Link to="/" className="text-white">
          Sweet Tooth
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <Menu className="text-white" />
        </button>
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
