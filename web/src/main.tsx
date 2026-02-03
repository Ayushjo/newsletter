import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./routes/NewsLetterSignUpPage.tsx"

import ErrorPage from "./routes/ErrorPage.tsx";
import ConfirmEmailSentPage from "./routes/ConfirmEmailSentPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/confirm-email-sent",
    element: <ConfirmEmailSentPage />
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
