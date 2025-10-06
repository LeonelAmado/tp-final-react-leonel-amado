import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// carga perezosa (code splitting)

const Home = lazy(() => import("./pages/Home"));
const Detalle = lazy(() => import("./pages/Detalle"));
const Listado = lazy(() => import("./pages/Listado"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Hubo un error en la aplicación</div>,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/listado/",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Listado />
          </Suspense>
        ),
      },
      {
        path: "/detalle/:id",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Detalle />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/error",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);
