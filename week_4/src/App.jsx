import "./App.css";
import Exercise1 from "./components/Exercise1";
import Exercise2 from "./components/Exercise2";
import Exercise3 from "./components/Exercise3";
import Dashboard from "./components/Dashboard";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

// Định nghĩa routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "ex1",
        element: <Exercise1 />,
      },
      {
        path: "ex2",
        element: <Exercise2 />,
      },
      {
        path: "ex3",
        element: <Exercise3 />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
