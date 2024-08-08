import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../Firebase/Auth";
import { useAuth } from "../../Auth/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn, setUserLoggedIn } = useAuth();
  // setUserLoggedIn(false)
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      doCreateUserWithEmailAndPassword(email, password)
        .then((res) => navigate("/login"))
        .catch((err) => {
          alert(err.message);

          setIsRegistering(false);
        });
    }
  };

  {
    /* {userLoggedIn && (<Navigate to={'/home'} replace={true} />)} */
  }
  return (
    <div className="signUp-Login-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit} className="signUp-login-form">
        <div className="creds">
          <label>Email</label>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="creds">
          <label>Password</label>
          <input
            disabled={isRegistering}
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="creds">
          <label>Confirm Password</label>
          <input
            disabled={isRegistering}
            type="password"
            autoComplete="off"
            required
            value={confirmPassword}
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
          />
        </div>
        <div className="creds">
          <button type="submit" disabled={isRegistering}>
            {isRegistering ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        <div className="register-login-option">
          Create New Account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
