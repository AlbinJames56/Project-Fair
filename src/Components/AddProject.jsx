import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import gallery from "../assets/Images/gallery.png";
import { toast } from "react-toastify";
import { addProjectAPI } from "../services/allAPI";
import { addProjectContextResponse } from "../ContextAPI/ContextShare";
function AddProject() {
  const [show, setShow] = useState(false);
 const { addProjectResponse, setAddProjectResponse}=useContext(addProjectContextResponse)
  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: "",
      languages: "",
      github: "",
      website: "",
      overview: "",
      projectImg: "",
    });
    setPreview("");
  };
  const handleShow = () => setShow(true);
  const [fileStatus, setFileStatus] = useState(true);
  const [projectData, setProjectData] = useState({
    title: "",
    languages: "",
    github: "",
    website: "",
    overview: "",
    projectImg: "",
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const imgPath = projectData.projectImg?.type;
    if (
      imgPath == "image/jpg" ||
      imgPath == "image/png" ||
      imgPath == "image/jpeg"
    ) {
      // console.log("generate url");
      setPreview(URL.createObjectURL(projectData.projectImg));
      setFileStatus(false);
    } else {
      console.log("Please upload the following file extensions (jpeg/png/jpg)");
      setFileStatus(true);
      setPreview("");
    }
  }, [projectData.projectImg]);
  // console.log(preview);
  const handleAddProjectData = async () => {
    const { title, languages, github, website, overview, projectImg } =
      projectData;
    if (
      !title ||
      !languages ||
      !github ||
      !website ||
      !overview ||
      !projectImg
    ) {
      toast.info("Please Fill the missing fields");
    } else {
      // api call(req body)
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      reqBody.append("projectImg", projectImg);

      //api call (reqHeader)
      const token = sessionStorage.getItem("token");
      // console.log("token", token);
      if (token) {
        const reqHeader = {
          "authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        // api call
        try {
          const result = await addProjectAPI(reqBody, reqHeader);
          // console.log("result", result);
          
          if (result.status == 200) {
            setAddProjectResponse(result.data)
            handleClose();
          } else {
            console.log(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
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
                <img width={"100%"} src={preview ? preview : gallery} alt="" />
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
          <Button variant="primary" onClick={handleAddProjectData}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProject;
