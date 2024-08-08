import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, useMediaQuery } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { doSignOut } from "../Firebase/Auth";
import logo1 from "../assets/firebase_logo_icon_168209 (1).png";

const Header = () => {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 18 : 24;
  const history = useLocation();
  const navigate = useNavigate();

//   useEffect(() => {
//     if (
//       history.pathname !== "/login" &&
//       history.pathname !== "/register" &&
//       history.pathname != "*"
//     )
//       navigate("/");
//   }, [history.pathname]);
  const handleSignOut = () => {
    doSignOut().then(() => navigate("/login"));
  };

  return (
    <div className="header">
      <div className="header-firebase-logo">
        <img src={logo1} />
        <h2 style={{ fontSize: sizes }}>Firebase Movies</h2>
      </div>
      <div className="header-logout-logo">
        {history.pathname !== "/login" &&
        history.pathname !== "/register" &&
        history.pathname !== "/" ? (
          <>
            {!mobView ? (
              <>
                <Avatar />
                <button
                  onClick={() => {
                    handleSignOut();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <LogoutIcon onClick={() => handleSignOut()} />
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Header;
