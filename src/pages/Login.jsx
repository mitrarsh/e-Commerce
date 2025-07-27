import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ItemContext } from "../context/itemsContext";

const Login = () => {
  const { info, setInfo, sendInfo } = useContext(ItemContext);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const emailOrPhone = fd.get("emailOrPhone");
    const password = fd.get("password");

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (u) => u.emailOrPhone === emailOrPhone && u.password === password
    );

    if (!user) {
     return setError("Invalid email, phone number, or password");
    }
    const token = "fake-jwt-" + Math.random().toString(36).substring(2);
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("auth-changed")); //notify react that token changed// We create a custom browser event when we set the token in the action(). Then, in AuthProvider, we listen for that event and update the token state.
    return navigate("/");
  }

  console.log(info);

  return (
    <div className="SignUp">
      <div className="SignUp-pic">
        <img src="/assets/images/products/Side Image.svg" alt="" />
      </div>
      <div className="signUp-box">
        <div className="signUp-content">
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit} className="signUp-form" action="">
            <div className="input-bar-form">
              <input
                name="emailOrPhone"
                required
                className="form-input"
                type="text"
                placeholder="Email or Phone Number"
              />
            </div>
            <div className="input-bar-form">
              <input
                name="password"
                required
                className="form-input"
                type="password"
                placeholder="Password"
                minLength={8}
              />
            </div>
            {error?(<p style={{color: "red",marginTop: "10px" }}>{error}</p>):null}
            <div className="login-btn">
              <button className="btn btn-red-small" type="submit">
                Log in
              </button>
              <div className="login-passChange">
                <Link to={"/"} className="login-passChange-text">
                  Forget Password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
