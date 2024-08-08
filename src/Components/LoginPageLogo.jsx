import React from "react";
import "./loginpagelogo.css";

import FirebaseBigIcon from "../assets/google_firebase_bigIcon.png";
import { useMediaQuery } from "@mui/material";
const LoginPageLogo = () => {
  const wid = useMediaQuery("(min-width:768px)");

  return (
    <>
      {wid ? (
        <div class="box">
          <div class="overlay top-right"></div>
          <div class="overlay bottom-right"></div>
          <div class="overlay top-left"></div>
          <div class="overlay bottom-left"></div>
          <div class="image">
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
