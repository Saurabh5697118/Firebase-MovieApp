import React from "react";
import "./loginpagelogo.css";

import FirebaseBigIcon from "../assets/google_firebase_bigIcon.png";
import { useMediaQuery } from "@mui/material";

const LoginPageLogo = () => {
  const wid = useMediaQuery("(min-width:768px)");
  return (
    <>
      {wid ? (
        <div className="box">
          <div className="overlay top-right"></div>
          <div className="overlay bottom-right"></div>
          <div className="overlay top-left"></div>
          <div className="overlay bottom-left"></div>
          <div className="image">
            <img src={FirebaseBigIcon} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginPageLogo;
