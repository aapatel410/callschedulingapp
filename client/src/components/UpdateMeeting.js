import Header from "./Header";
import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateMeeting(props) {
  const [data, setData] = useState([]);
  const [meetingdate, setDate] = useState("");
  const [meetingtime, setTime] = useState("");

  const history = useHistory();

  console.warn("props", props.match.params.meetingid);

  async function getUserMeetingsByMeetingID() {
    let result = await fetch("http://127.0.0.1:8000/api/getusermeetingsbymeetingid/" + props.match.params.meetingid);
    result = await result.json();

    setData(result);
  }
  useEffect(() => {
    getUserMeetingsByMeetingID();
  }, []);

  //   const notify = () => toast("Call has been rescheduled succesfully!!!!");

  async function rescheduleCall() {
    const fromData = new FormData();
    fromData.append("useridA", data[0].useridA);
    fromData.append("useridB", data[0].useridB);
    fromData.append("meetingdate", meetingdate);
    fromData.append("meetingtime", meetingtime);
    let result = await fetch("http://127.0.0.1:8000/api/updateusermeeting/" + props.match.params.meetingid + "?_method=PUT", {
      method: "POST",
      body: fromData,
    });

    alert("Meeting has been rescheduled succesfully!!!!");

    history.push("/viewmeetings/" + data[0].useridA);
  }

  return (
    <div>
      <Header />
      <h1>Update Meeting</h1>
      <div>
        <h3 className="mt-5">Current scheduled time</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>MeetingWith_User</th>
              <th>MeetingDate</th>
              <th>MeetingTime</th>
            </tr>
          </thead>
          <tbody>
            {data.map((usermeeting) => (
              <tr>
                <td>{usermeeting.useridA}</td>
                <td>{usermeeting.useridB}</td>
                <td>{usermeeting.meetingdate}</td>
                <td>{usermeeting.meetingtime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="mt-5">
        <h3>Update meeting time</h3>
        <input type="date" value={meetingdate} onChange={(e) => setDate(e.target.value)} />
        <input className="ml-3" type="time" value={meetingtime} onChange={(e) => setTime(e.target.value)} />
        <br />
        <Button className="mt-3" onClick={rescheduleCall}>
          Reschedule Call
        </Button>
        {/* <ToastContainer/> */}
      </div>
    </div>
  );
}

export default withRouter(UpdateMeeting);
