import React, { lazy, Suspense, useState } from "react";

//==================== my  routes ====================
// import NewUsersPage from "./views/users/UserPage";

// ============ Customm component routes ========================
const DashboardPage = lazy(() => import("./views/dashboard/Dashboard"));
const ProductDetailPage = lazy(() =>
  import("./views/products/ProductDetailPage.jsx")
);

function AppRoutes() {
  const privateDefaultRoutes = [
    {
      path: "/",
      name: "dashboard",
      element: DashboardPage, // Replace with the actual component
      layout: "/private"
    },
    {
      path: "/product/detail/:slug",
      element: ProductDetailPage
    }
  ];

  const [privateRoutes, setPrivateRoutes] = useState(privateDefaultRoutes);

  return privateRoutes;
}

export default AppRoutes;
