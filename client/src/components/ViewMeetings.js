import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import UpdateMeeting from "./UpdateMeeting";

function ViewMeetings(props) {
  const [data, setData] = useState([]);
  const history = useHistory();
  const useridA = JSON.parse(localStorage.getItem("user-info")).userid;

 async function getUserMeetings() {
    let result = await fetch("http://127.0.0.1:8000/api/getusermeetings/" + props.match.params.useridA);
    result = await result.json();

    setData(result);
  }

  useEffect(() => {
    getUserMeetings();
  }, []);

  async function cancelMeeting(meetingid) {
    let result = await fetch("http://127.0.0.1:8000/api/cancelmeeting/" + meetingid, {
      method: "DELETE",
    });
    result = await result.json();
    getUserMeetings();
  }

  function updateMeeting(usermeeting) {
    history.push('/updatemeeting/'+usermeeting.meetingid)
  }

  return (
    <div>
      <Header />
      <h1>ViewMeetings</h1>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>MeetingWith_User</th>
              <th>MeetingDate</th>
              <th>MeetingTime</th>
              <th>Update Meeting</th>
              <th>Cancel Meeting</th>
            </tr>
          </thead>
          <tbody>
            {data.map((usermeeting) => (
              <tr>
                <td>{usermeeting.useridA}</td>
                <td>{usermeeting.useridB}</td>
                <td>{usermeeting.meetingdate}</td>
                <td>{usermeeting.meetingtime}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      updateMeeting(usermeeting);
                    }}
                  >
                    Reschedule Meeting
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      cancelMeeting(usermeeting.meetingid);
                    }}
                  >
                    Cancel Meeting
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

export default withRouter(ViewMeetings);
