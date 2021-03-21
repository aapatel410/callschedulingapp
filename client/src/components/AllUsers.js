import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";


function AllUsers() {
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(async () => {
    let result = await fetch("http://127.0.0.1:8000/api/alluser");
    result = await result.json();
    setData(result);
    console.warn(data);
  }, []);

  function connectUser(userID) {
    console.warn("User connected");
    console.warn(userID);
    localStorage.setItem("user2-info",userID)
    history.push("/schedulecall")
  }

  return (
    <div>
      <Header />
      <h1>AllUsers Page</h1>
      <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>UserID</th>
            <th>Connect?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.userid}</td>
              <td>
                <Button variant="primary" onClick={()=>{connectUser(user.userid)}}>
                  Connect
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}

export default AllUsers;
