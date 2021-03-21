import Header from "./Header";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

//Login() --> react component
function Login() {
  const history = useHistory();
  
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    let credentials = { userid, password };
    if (userid != "" && password != "") {
      let result = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });
      result = await result.json();

      //console.warn(result.error);

      if (result.error) {
        history.push("./login");
        alert("Please Enter Valid Credentials");
      } else {
        localStorage.setItem("user-info", JSON.stringify(credentials));
        history.push("./welcome");
      }
    } else {
      alert("UserID and Password are required.");
      
    }
  }

  return (
    <div>
      <Header />

      <div className="col-sm-6 offset-sm-3 mt-5">
        <h1>Login Page</h1>
        <input type="text" value={userid} onChange={(e) => setUserId(e.target.value)} className="form-control" placeholder="Enter Userid" required />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" required />
        <br />
        <button onClick={login} className="btn btn-primary">
          Login
        </button>
        <span>
          {" "}
          New User?<Link to="/register"> Register Here</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
