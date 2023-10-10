import { createBrowserRouter, json } from "react-router-dom";
import App from './App';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <p>Hello Router!</p>
        ),
      }

    ]
  },
]);

export default router;
