import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import gallery from '../assets/Images/gallery.png'
function AddProject() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <button className="btn btn-primary" onClick={handleShow}>
        Add Projects
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Project Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-5">
              <label>
                <input type="file" style={{ display: "none" }} />
                <img
                  width={"100%"}
                  src={gallery}
                  alt=""
                />
              </label>
            </div>
            <div className="col-7">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Title"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Languages Used"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Github Link"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website Link"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Overview"
                />
              </div> 
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProject;
