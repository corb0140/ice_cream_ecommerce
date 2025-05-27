import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="">
      <Navbar />

      <main className="">
        {/* OUTLETS = CHILD ROUTES */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
