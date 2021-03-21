import Header from "./Header";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

function ScheduleCall() {

  // id : useridA (logged in user)
  const useridA = (JSON.parse(localStorage.getItem("user-info"))).userid;
  const useridB = localStorage.getItem("user2-info");
  
  const history = useHistory();
  const [meetingdate, setDate] = useState("");
  const [meetingtime, setTime] = useState("");
  
  async function scheduleCall() {
    let userMeetingDetail = { useridA,useridB,meetingdate,meetingtime };
    console.warn(userMeetingDetail);
    //console.warn("Onclick from scheduleCall ");
    let result = await fetch("http://127.0.0.1:8000/api/schedulecall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userMeetingDetail),
    });
    result = await result.json();
    console.warn(result);
    //localStorage.setItem("user-info",JSON.stringify(userMeetingDetail))
    history.push("/viewmeetings/"+useridA)
  }

  return (
    <div>
      <Header />
      <h1>Schedule Call</h1>
      <br />
      <h3 style={{ "text-align": "left" }}>
        {useridA} is now connected with {useridB}
      </h3>
      <br />
      <h4 style={{ "text-align": "left" }}>Please Select Date and Time to Schedule Meeting!</h4>
      <br />
      <br />
      <div>
        <input type="date" value={meetingdate} onChange={(e) => setDate(e.target.value)} />
        <input className="ml-3" type="time" value={meetingtime} onChange={(e) => setTime(e.target.value)} />
        <br />
        <Button className="mt-3" onClick={scheduleCall}>
          Schedule call
        </Button>
      </div>
    </div>
  );
}
export default ScheduleCall;
