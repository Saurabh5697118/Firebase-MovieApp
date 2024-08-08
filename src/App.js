import { useRoutes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Auth/AuthContext";
import Header from "./Components/Header";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Home from "./Components/Home";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div>{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
