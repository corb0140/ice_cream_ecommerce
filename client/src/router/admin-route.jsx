import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "@/lib/state/authSlice";

const AdminRoute = () => {
  const user = useSelector(selectCurrentUser);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminRoute;
