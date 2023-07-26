import React from "react";
import ReactDOM from "react-dom/client";
import { ImageProvider } from "./provider/image-provider.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home.tsx";

import "./index.css";
import ErrorPage from "./pages/error.tsx";
import { ImagePage } from "./pages/image.tsx";
import { Tooltip } from "./components/tooltip/tooltip.tsx";

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
    <Tooltip.Provider delayDuration={200}>
      <ImageProvider>
        <RouterProvider router={router} />
      </ImageProvider>
    </Tooltip.Provider>
  </React.StrictMode>
);
