import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  githubSignIn,
} from "../../Firebase/Auth";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LoginPageLogo from "../LoginPageLogo";

const Login = () => {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 16 : 20;
  let sizes2 = mobView ? 10 : tabView ? 12 : 16;
  const { userLoggedIn, setUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password)
        .then((res) => {
          navigate("/home");
        })
        .catch((err) => {
          alert(err.message);

          setIsSigningIn(false);
        });
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    doSignInWithGoogle()
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const onGitHubSignIn = (e) => {
    e.preventDefault();
    githubSignIn()
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="signUp-Login-container">
      <LoginPageLogo />
      <div>
        <h2 style={{ fontSize: sizes }}>Login</h2>
        <form onSubmit={onSubmit} className="signUp-login-form">
          <div className="creds">
            <input
              type="email"
              autoComplete="email"
              required
              placeholder="Email..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ fontSize: sizes2 }}
            />
          </div>
          <div className="creds">
            <input
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ fontSize: sizes2 }}
            />
          </div>
          <div className="creds">
            <button
              style={{ fontSize: sizes2 }}
              type="submit"
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        <div className="register-login-option">
          Create New Account? <Link to="/register">SignUp</Link>
        </div>
        <div className="social-media-Orline">
          ------------- Or Login with Others -------------
        </div>
        <div className="social-media-icons">
          <button
            disabled={isSigningIn}
            onClick={(e) => {
              onGoogleSignIn(e);
            }}
            style={{
              background: "transparent",
              border: "none",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <svg
              style={{ height: 30 }}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <GitHubIcon
            style={{ cursor: "pointer" }}
            fontSize="large"
            onClick={(e) => onGitHubSignIn(e)}
          />
          <FacebookIcon
            style={{ color: "#316FF6", cursor: "pointer" }}
            fontSize="large"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
