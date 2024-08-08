import { useRoutes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Auth/AuthContext";
import Header from "./Components/Header";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Update from "./Components/Update";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/:id",
      element: <Update />,
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
    <div className="App">
      <AuthProvider>
        <Header />
        <div>{routesElement}</div>
      </AuthProvider>
    </div>
  );
}

export default App;
