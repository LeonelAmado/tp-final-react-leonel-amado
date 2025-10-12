import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import "./styles/Global.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </React.StrictMode>
);
