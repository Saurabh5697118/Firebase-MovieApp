import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { doSignOut } from "../Firebase/Auth";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  console.log(userLoggedIn);
  
  return (
    <nav>
      {userLoggedIn && (
        <>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Header;
