import React, { useState } from "react"; 
import {  Card, Col, Modal, Row } from "react-bootstrap";
import { SERVER_URL } from "../services/serverUrl";

function ProjectCard({project}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 
  console.log(`${SERVER_URL}/uploads/${project?.projectImg}`);
  return (
    <div className="mt-5">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`${SERVER_URL}/uploads/${project?.projectImg}`} onClick={handleShow} />
        <Card.Body>
          <Card.Title className="text-dark">{project.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img width={"100%"} src={`${SERVER_URL}/uploads/${project?.projectImg}`} alt="" className="'image-fluid" />
            </Col>
            <Col md={6}>
              {/* <h2>Project Title</h2> */}
              <p>
              {project.overview}
              </p>
              <p>
                Languages Used: 
                <span className="text-danger">
                 {project.languages}
                </span>
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="mt-2">
            <a href="" target="_blank" className="me-3 btn text-dark "><i className="fa-brands fa-github fa-2x"></i></a>
            <a href="" target="_blank" className="me-3 btn text-dark "><i className="fa-solid fa fa-link fa-2x"></i></a>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectCard;
