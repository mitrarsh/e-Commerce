export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    name: data.get("name"),
    emailOrPhone: data.get("emailOrPhone"),
    password: data.get("password"),
  };
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
  return redirect("/"); ;

}