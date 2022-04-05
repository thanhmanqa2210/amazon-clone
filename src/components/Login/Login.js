import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {createBrowserHistory as createHistory} from "history"
import "../../assets/css/login.css";
import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          history("/");
        }
      })
      .catch((error) => console.warn(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth.uid);
        if (auth) {
          history("/login");
        }
      })
      .catch((error) => console.warn(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_image"
          alt="logo_login"
          src="https://thietkelogo.vn/wp-content/uploads/2017/10/amazon_logo_RGB.jpg"
        />
      </Link>
      <div className="login_container">
        <h2 className="title">Sign in</h2>
        <form action="" className="form_signIn" onSubmit={handleSubmit}>
          <div className="input_signIn">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Vui lòng nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input_signIn">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Sign in
          </button>
        </form>
        <div className="check_login">
          <input type="checkbox" />
          <p>By signing-in you agree to the AMAZON FAKE Clone</p>
        </div>
        <button className="login_registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
