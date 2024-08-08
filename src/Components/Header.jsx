import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { doSignOut } from "../Firebase/Auth";
import logo1 from "../assets/firebase_logo_icon_168209 (1).png";
import { Avatar } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <>
      {userLoggedIn && (
        <div className="header">
          <div className="header-firebase-logo">
            <img src={logo1} />
            <h2>Firebase Movies</h2>
          </div>
          <div className="header-logout-logo">
            <Avatar />
            <button
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/login");
                });
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
