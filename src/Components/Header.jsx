import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TokenAuthContext } from "../ContextAPI/TokenAuth";
function Header({ insideDashboard }) {
  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setIsAuthorized(false)
    navigate("/");
  };
  return (
    <div>
      <Navbar bg="info" data-bs-theme="dark">
        <Container>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Navbar.Brand>Project Fair</Navbar.Brand>{" "}
          </Link>

          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            {insideDashboard && (
              <Button className="btn btn-info" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
