import { createBrowserRouter, json } from "react-router-dom";
import App from './App';
import ApiHandler from "./ApiHandler";
import LandingPage from "./LandingPage";
import ScoreCounter from "./scoreCounter";
import HomePage from "./components/HomePage";
import LeaderBoard from "./LeaderBoard";

async function LeaderBoardLoader() {
  let score;
  return score = 1

}


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
      {
        path: "/devF",
        element: <HomePage />
      },
      {
        path: "/leader-board",
        element: <LeaderBoard />
      }

    ]
  },
]);

export default router;
