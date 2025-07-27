import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ItemContext } from "../context/itemsContext";

const Login = () => {
  const { info, setInfo, sendInfo } = useContext(ItemContext);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const updatedData = [...info, data];
    setInfo(updatedData);
    sendInfo(updatedData);
    navigate("/login");
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
                name="emailOrPhonr"
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
