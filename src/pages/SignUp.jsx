import { Form, Link, redirect, useActionData } from "react-router-dom";



export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    name: data.get("name"),
    emailOrPhone: data.get("emailOrPhone"),
    password: data.get("password"),
  };
  const existingUsers= JSON.parse(localStorage.getItem("users"))|| [];
  const userExists= existingUsers.some((u)=>u.emailOrPhone=== authData.emailOrPhone)
  if(userExists){return {error:"This user already exists."};

};
  existingUsers.push(authData);
  localStorage.setItem("users",JSON.stringify(existingUsers))

  const response = await fetch("http://localhost:3000/info", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(authData),
  });
  //   if (!response.ok) throw new Error("Signup failed");
  // const resData = await response.json();
  // const token= resData.token;
  // console.log("Token after signup:", token); 

  const token = "fake-jwt-" + Math.random().toString(36).substring(2);
localStorage.setItem("token", token);  
window.dispatchEvent(new Event("auth-changed"));//notify react that token changed// We create a custom browser event when we set the token in the action(). Then, in AuthProvider, we listen for that event and update the token state.
  return redirect("/");

}

export const checkAuthLoader=()=>{
  const token = localStorage.getItem('token');
  if(!token){return redirect ('/login')}
}

const SignUp = () => {


  const actionData = useActionData();  // <-- This gets { error: "This user already exists." } //actionData gets whatever action returns

  return (
    <div className="SignUp">
      <div className="SignUp-pic">
        <img src="/assets/images/products/Side Image.svg" alt="" />
      </div>
      <div className="signUp-box">
        <div className="signUp-content">
          <h1>Create an account</h1>
          <p>Enter your details below</p>
          <Form
          //  onSubmit={handleSubmit} 
           className="signUp-form"
           method="post">
            <div className="input-bar-form">
              <input
                name="name"
                required
                className="form-input"
                type="text"
                placeholder="Name"
              />
            </div>
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
            {actionData?.error && (
  <p style={{ color: "red", marginTop: "10px" }}>{actionData.error}</p>
)}

            <button className="btn-fullWidth red-btn" type="submit">
              Create Account
            </button>
            <button className="btn-google">
              <img src="/assets/images/icons/Icon-Google.jpg" alt="" />
              Sign up with Google
            </button>
          </Form>
          <div className="login">
            <p>Already have account?</p>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
