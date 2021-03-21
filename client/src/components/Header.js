import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const history = useHistory();
  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Call Scheduler</Navbar.Brand>
        <Nav className="mr-auto nav-bar-wrapper">
          {localStorage.getItem("user-info") ? (
            <div>
              <Link to="/allusers">AllUser</Link>
              <Link to="/schedulecall">ScheduleCall</Link>
              <Link to={"/viewmeetings/"+ user.userid}>ViewMeeting</Link>
            </div>
          ) : (
            <div>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </Nav>
        {localStorage.getItem("user-info") ? (
          <Nav>
            <NavDropdown title={user && user.userid}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : null}
      </Navbar>
    </div>
  );
}

export default Header;
