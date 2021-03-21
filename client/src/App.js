import "./App.css";

import { BrowserRouter, Route,Redirect } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register";
import AllUsers from "./components/AllUsers";
import ScheduleCall from "./components/ScheduleCall";
import ViewMeetings from "./components/ViewMeetings";
import LogOut from "./components/LogOut";
import Welcome from "./components/Welcome";
import UpdateMeeting from "./components/UpdateMeeting";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/allusers">
          <AllUsers />
        </Route>
        <Route path="/schedulecall">
          <ScheduleCall />
        </Route>
        <Route path="/viewmeetings/:useridA">
          <ViewMeetings />
        </Route>
        <Route path="/logout">
          <LogOut />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/updatemeeting/:meetingid">
          <UpdateMeeting />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
