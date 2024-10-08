import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import gallery from "../assets/Images/gallery.png";
function AddProject() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fileStatus, setFileStatus] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    languages: "",
    github: "",
    website: "",
    overview: "",
    projectImg: "",
  });
  const[preview,setPreview]=useState("")
  
  useEffect(() => {
 
    const imgPath = projectData.projectImg.type;
    if (
      imgPath == "image/jpg" ||
      imgPath == "image/png" ||
      imgPath == "image/jpeg"
    ) {
      console.log("generate url");
      setPreview(URL.createObjectURL(projectData.projectImg))
      setFileStatus(false);
    } else {
      console.log("Please upload the following file extensions (jpeg/png/jpg)");
      setFileStatus(true);
      setPreview({ ...projectData, projectImg: "" });
    }
  }, [projectData.projectImg]);
console.log(preview);

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
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projectImg: e.target.files[0],
                    })
                  }
                />
                <img width={"100%"} src={!fileStatus?preview:gallery} alt="" />
              </label>
              {fileStatus && 
                <div className="mt-3 text-danger">
                  Please upload the following file extensions (jpeg/png/jpg)
                </div>
              }
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
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Languages Used"
                  onChange={(e) =>
                    setProjectData({ ...projectData, languages: e.target.value })
                  }
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
