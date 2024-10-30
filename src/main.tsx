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
  PostPage,
  postLoader,
  albumLoader,
  AlbumPage,
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
          {
            path: "/users/:userId/posts/:postId",
            loader: postLoader as any,
            element: <PostPage />,
          },
          {
            path: "/users/:userId/albums/:albumId",
            loader: albumLoader as any,
            element: <AlbumPage />
          }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
