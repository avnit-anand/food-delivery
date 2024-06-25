import React, { useContext, useState, useEffect } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurState] = useState("Login");
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { backendUrl, setToken} = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let url = backendUrl;
    if (currState === "Login") {
      url = url + "/api/user/login"
    } else {
      url = url + "/api/user/register"
    }

    const response = await axios.post(url, data);
    console.log(response)
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container glass-effect">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
          )}

          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
          <button type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create an new account?{" "}
            <span onClick={() => setCurState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account.{" "}
            <span onClick={() => setCurState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
