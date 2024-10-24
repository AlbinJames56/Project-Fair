import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import gallery from "../assets/Images/gallery.png";
import { SERVER_URL } from "../services/serverUrl";

function EditProject({project}) {
    const [projectData, setProjectData] = useState({...project,projectImg:""});
  const [fileStatus, setFileStatus] = useState(true);
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setProjectData({...project,projectImg:""});
    setPreview(projectData.projectImg);
  };
  const handleUpdateProjectData=()=>{

  }
  useEffect(() => {
    if(projectData.projectImg){
      setPreview(URL.createObjectURL(projectData.projectImg))
      setFileStatus(false)
    }else{
      setPreview("")
    }
  }, [projectData.projectImg]);

  return (
    <div>
      <button className="btn text-dark" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{projectData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-5">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projectImg: e.target.files[0],
                    })
                  }
                />
                <img width={"100%"} src={ preview?preview: `${SERVER_URL}/uploads/${project?.projectImg}`} alt="" />
              </label>
              {fileStatus && (
                <div className="mt-3 text-danger">
                  Please upload the following file extensions (jpeg/png/jpg)
                </div>
              )}
            </div>
            <div className="col-7">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Title"
                  onChange={(e) =>
                    setProjectData({ ...projectData, title: e.target.value })
                  }
                  value={projectData.title}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Languages Used"
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      languages: e.target.value,
                    })
                  }
                  value={projectData.languages}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Github Link"
                  onChange={(e) =>
                    setProjectData({ ...projectData, github: e.target.value })
                  }
                  value={projectData.github}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website Link"
                  onChange={(e) =>
                    setProjectData({ ...projectData, website: e.target.value })
                  }
                  value={projectData.website}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Overview"
                  onChange={(e) =>
                    setProjectData({ ...projectData, overview: e.target.value })
                  }
                  value={projectData.overview}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProjectData}>
           Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProject;
