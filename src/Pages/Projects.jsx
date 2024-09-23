import React from "react";
import Header from "../Components/Header";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "../Components/ProjectCard";
function Projects() {
  return (
    <div>
      <Header />
      <div className="projects" style={{ marginTop: "100px" }}>
        <h1 className="text-center mt-5 fw-bolder">All Projects</h1>
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="d-flex border w-50 rounded m-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="search by technologies"
            />
            <i
              style={{ marginLeft: "-50px" }}
              className="fa-solid fa-magnifying-glass fa-rotate-90"
            ></i>
          </div>
        </div>
        <Row className="m-5 container">
          <Col sm={12} md={6} lg={4}>
          <ProjectCard/>
          </Col>
        </Row>
      </div>

    </div>
  );
}

export default Projects;
