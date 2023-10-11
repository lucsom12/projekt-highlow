import { createBrowserRouter, json } from "react-router-dom";
import App from './App';
import ApiHandler from "./ApiHandler";
import LandingPage from "./LandingPage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/search",
        element: <ApiHandler />,
      },
      {
        path: "/home",
        element: <LandingPage />
      }

    ]
  },
]);

export default router;
