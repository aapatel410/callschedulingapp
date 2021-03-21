import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

function Register() {
  
  const [name, setName] = useState("");
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function signUp() {
    let credentials = { name, userid, password };
    if (name != "" && userid != "" && password != "") {
      
      let result = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });
      result = await result.json();

      localStorage.setItem("user-info", JSON.stringify(credentials));
      history.push("/welcome");
    } else {
      alert("Please provide values for all fields");
    
    }
  }

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3 mt-5">
        <h1>User Registration</h1>
        <div className="form-group">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Your Name Here" required />
        </div>
        <div className="form-group">
          <input type="text" value={userid} onChange={(e) => setUserId(e.target.value)} className="form-control" placeholder="Enter Userid" required />
        </div>
        <div className="form-group">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" required />
        </div>

        <button onClick={signUp} className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
