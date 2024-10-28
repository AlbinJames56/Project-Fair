import React, { useEffect } from "react";
import Header from "../Components/Header";
import { Col, Row } from "react-bootstrap";
import MyProjects from "../Components/MyProjects";
import Profile from "../Components/Profile";
function DashBoard() { 
  return (
    <div>
      <Header insideDashboard/>
      <Row className="p-5">
        <Col sm={12} md={8}  >
          <h2>
            Welcome <span className="text-warning fa-bolder">{sessionStorage.getItem("username")||"User"}</span>
          </h2>
          <MyProjects />
        </Col>
        <Col sm={12} md={4}>
          <Profile />
        </Col>
      </Row>
    </div>
  );
}

export default DashBoard;
