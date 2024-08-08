import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../Firebase/Auth";
import LoginPageLogo from "../LoginPageLogo";

const Register = () => {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 16 : 20;
  let sizes2 = mobView ? 10 : tabView ? 12 : 16;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("Confirm password doesn't matches with password...");
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      doCreateUserWithEmailAndPassword(email, password)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          alert(err.message);

          setIsRegistering(false);
        });
    }
  };
  return (
    <div className="signUp-Login-container">
      <LoginPageLogo />
      <div>
        <h2 style={{ fontSize: sizes }}>Register</h2>
        <form onSubmit={onSubmit} className="signUp-login-form">
          <div className="creds">
            <input
              type="email"
              autoComplete="email"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ fontSize: sizes2 }}
            />
          </div>
          <div className="creds">
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="new-password"
              placeholder="Password..."
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ fontSize: sizes2 }}
            />
          </div>

          <div className="creds">
            <input
              disabled={isRegistering}
              type="password"
              placeholder="Confirm Password..."
              autoComplete="off"
              required
              value={confirmPassword}
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
              style={{ fontSize: sizes2 }}
            />
          </div>
          <div className="creds">
            <button
              style={{ fontSize: sizes2 }}
              disabled={isRegistering}
              type="submit"
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <div className="register-login-option">
            Create New Account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
