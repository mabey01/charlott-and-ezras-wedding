import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ImageProvider } from "./provider/image-provider.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import ErrorPage from "./pages/error.tsx";
import { Tooltip } from "./components/tooltip/tooltip.tsx";
import { SupabaseProvider } from "./provider/supabase-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./provider/user-provider.tsx";
import LoadingPage from "./pages/loading.tsx";

const HomePage = lazy(() => import("./pages/home.tsx"));
const ImagePage = lazy(() => import("./pages/image.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPage>Loading grid</LoadingPage>}>
        <HomePage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "image/:imageId",
    element: (
      <Suspense fallback={<LoadingPage>Loading image</LoadingPage>}>
        <ImagePage />
      </Suspense>
    ),
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <Tooltip.Provider delayDuration={200}>
          <UserProvider>
            <ImageProvider>
              <RouterProvider router={router} />
            </ImageProvider>
          </UserProvider>
        </Tooltip.Provider>
      </SupabaseProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
