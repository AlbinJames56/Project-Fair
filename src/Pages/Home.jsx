import React, { useEffect, useState } from "react";
import {Col, Row } from "react-bootstrap";
import titleImage from "../assets/Images/cat.gif";
import ProjectCard from "../Components/ProjectCard";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate=useNavigate()
  const handleProjectsPage=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/project')
    }else{
      alert('please login')
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <div
      style={{ width: "100%", height: "170vh" }}
      className="container-fluid rounded bg-info"
    >
      <Row className="align-items-center p-5">
        <Col cm={12} md={6}>
          <h1 style={{ fontSize: "80px" }} className="fw-bolder text-white">
            <i className="fa-solid fa-list-check me-3"></i>Project Fair
          </h1>
          <p className="text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quis
            rerum soluta modi explicabo tenetur?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Sit, mollitia.
          </p>
          {loggedIn ? (
            <Link to="/dashboard" className="btn btn-warning">
              Manage Projects
            </Link>
          ) : (
            <Link to="/login" className="btn btn-warning">
              Start To Explore
            </Link>
          )}
        </Col>
        <Col sm={12} md={6} className="ps-5">
          <img width={"500px"} src={titleImage} alt="" />
        </Col>
      </Row>
      {/* projects */}
      <div className="all-projects mt-5">
        <h1 className="text-center text-primary">Explore Your Projects</h1>{" "}
        <marquee scrollamount="15">
          <Row>
            <Col sm={12} md={6} lg={4}>
              <ProjectCard />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <ProjectCard />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <ProjectCard />
            </Col>
          </Row>
        </marquee>
      </div>
      <div className="text-center mt-5">
        <button  className="btn btn-success" onClick={handleProjectsPage}
        >
          View More Projects
        </button>
      </div>
    </div>
  );
}

export default Home;
