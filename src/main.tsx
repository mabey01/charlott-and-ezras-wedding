import React from "react";
import ReactDOM from "react-dom/client";
import { ImageProvider } from "./provider/image-provider.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home.tsx";

import "./index.css";
import ErrorPage from "./pages/error.tsx";
import { ImagePage } from "./pages/image.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "image/:imageId",
    element: <ImagePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ImageProvider>
      <RouterProvider router={router} />
    </ImageProvider>
  </React.StrictMode>
);
