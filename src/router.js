import { createBrowserRouter, json } from "react-router-dom";
import App from './App';


function safeFetchJson(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('${url} returned status ${response.status}');
      }
      return response.json();
    });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <p>Välkommen till salladsbaren!</p>
        ),
      }
    ]
  },
]);

export default router;
