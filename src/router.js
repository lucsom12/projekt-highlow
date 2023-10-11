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
  // try {
  //   const response = await fetch('/api/game-data'); // Replace with your actual API endpoint
  //   if (!response.ok) {
  //     throw new Error('Failed to load game data');
  //   }

  //   // Parse the response JSON
  //   const gameData = await response.json();

  //   // Return the data that needs to be passed to the ScoreCounter component
  //   return {
  //     gameData,
  //   };
  // } catch (error) {
  //   // Handle errors, e.g., log them or show an error message to the user
  //   console.error('Error loading game data:', error);
  //   throw error; // Rethrow the error to indicate that the loading failed
  // }
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
