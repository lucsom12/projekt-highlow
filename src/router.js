import { createBrowserRouter, json } from "react-router-dom";
import App from './App';
import ApiHandler from "./ApiHandler";
import LandingPage from "./LandingPage";
import ScoreCounter from "./scoreCounter";
import LeaderBoard from "./LeaderBoard";
import FirebaseDev from "./components/FirebaseDev";

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
      },
      // {
      //   path: "/devF",
      //   element: <FirebaseDev />
      // },
      {
        path: "/leader-board",
        element: <LeaderBoard />
      }

    ]
  },
]);

export default router;
