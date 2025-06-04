import { useState } from "react";
import { AnimatePresence } from "motion/react";
// import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import NavModal from "./NavModal";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav
        className="h-12 w-[90%] bg-wine-berry fixed z-50 left-1/2 -translate-x-1/2 top-5 rounded-full
    flex items-center justify-between px-4"
      >
        <p className="text-white">Sweet Tooth</p>

        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <Menu className="text-white" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <NavModal
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
