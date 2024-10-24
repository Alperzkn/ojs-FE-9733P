import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ErrorPage,
  Root,
  HomePage,
  UsersPage,
  usersLoader,
  userLoader,
  UserPage,
} from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/users",
            loader: usersLoader as any,
            element: <UsersPage />,
          },
          {
            path: "/users/:userId",
            loader: userLoader as any,
            element: <UserPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
