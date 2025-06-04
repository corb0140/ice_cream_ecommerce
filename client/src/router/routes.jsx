import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProductsPage from "@/pages/ProductsPage";

function AppRouter() {
  //   const adminRoute = [];

  const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/products", element: <ProductsPage /> },
  ];

  return (
    <Router>
      <Routes>
        {/* ROUTES */}
        <Route element={<Layout />}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* ADMIN ROUTE */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
