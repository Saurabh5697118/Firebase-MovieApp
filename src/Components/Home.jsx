import React, { useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, setUserLoggedIn } = useAuth();
  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, []);
  

  if (currentUser) {
    setUserLoggedIn(true);
    return (
      <div>
        Hello{" "}
        {/* {currentUser.displayName ? currentUser.displayName : currentUser.email}, */}
        you are now logged in.
      </div>
    );
  }
};

export default Home;
