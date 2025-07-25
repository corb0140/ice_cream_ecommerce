import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CheckoutSuccessPage from "@/pages/CheckoutSuccessPage";
import FavoritesPage from "@/pages/FavoritesPage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";

import AdminRoute from "./admin-route";
import Dashboard from "@/pages/Dashboard";
import SettingsPage from "@/pages/SettingsPage";

function AppRouter() {
  // Admin Only Routes

  const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/settings", element: <SettingsPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/checkout-success", element: <CheckoutSuccessPage /> },
    { path: "/favorites", element: <FavoritesPage /> },
    { path: "/contact", element: <ContactPage /> },
    { path: "/about", element: <AboutPage /> },
  ];

  return (
    <Router>
      <Routes>
        {/* ROUTES */}
        <Route element={<Layout />}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {/* ADMIN ROUTE */}
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
