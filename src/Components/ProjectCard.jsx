import React, { useState } from "react";
import projectImg from "../assets/Images/boyImg.webp";
import {  Card, Col, Modal, Row } from "react-bootstrap";

function ProjectCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="mt-5">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={projectImg} onClick={handleShow} />
        <Card.Body>
          <Card.Title>Project Title</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img width={"100%"} src={projectImg} alt="" className="'image-fluid" />
            </Col>
            <Col md={6}>
              {/* <h2>Project Title</h2> */}
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Officia sapiente sequi quisquam, error aspernatur illum natus
                eligendi voluptate eum atque numquam vitae similique et facilis
                dolorum nesciunt est asperiores minima? Accusantium ex autem
                tempora repudiandae nesciunt.{" "}
              </p>
              <p>
                Languages Used:{" "}
                <span className="text-danger">
                  HTML, CSS, Bootstrap, React, Javascript
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
