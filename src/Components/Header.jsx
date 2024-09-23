import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function Header() {
  return (
    <div>
      <Navbar bg="info" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Project Fair</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </div>
  );
}

export default Header;
