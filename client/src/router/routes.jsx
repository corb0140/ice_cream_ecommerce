import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";

import HomePage from "@/pages/HomePage";

function AppRouter() {
  //   const adminRoute = [];

  const routes = [{ path: "/", element: <HomePage /> }];

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
