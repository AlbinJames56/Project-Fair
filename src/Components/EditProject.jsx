import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Toast } from "react-bootstrap";
import gallery from "../assets/Images/gallery.png";
import { SERVER_URL } from "../services/serverUrl";
import { editProjectAPI } from "../services/allAPI";
import { toast, ToastContainer } from "react-toastify";
import { editProjectContextResponse } from "../ContextAPI/ContextShare";
 

function EditProject({project}) {
    const [projectData, setProjectData] = useState({...project,projectImg:""});
  const [fileStatus, setFileStatus] = useState(true);
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);
  const {editProjectResponse,setProjectResponse}=useContext(editProjectContextResponse)
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    
    setPreview(projectData.projectImg);
  };
  const handleUpdateProjectData=async()=>{
    const { title, languages, github, website, overview, projectImg } =
    projectData;
  if (
    !title ||
    !languages ||
    !github ||
    !website ||
    !overview  
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
    preview?reqBody.append("projectImg", projectImg):reqBody.append("projectImg",project.projectImg)

    //api call (reqHeader)
    const token = sessionStorage.getItem("token");
    console.log(token);

    if(token){
      const reqHeader = {
        "authorization": `Bearer ${token}`,
        "Content-Type":preview? "multipart/form-data":"application/json"
      };
      try{
        const result=await editProjectAPI(project._id, reqBody,reqHeader)
        if(result.status==200){
          setProjectResponse(result.data)

          handleClose() 
        }else{
          toast.warn(result.message)
        }
      }catch(err){
        console.log(err);
        
      }
    }
    
  }
}

  useEffect(() => {
    if(projectData.projectImg){
      setPreview(URL.createObjectURL(projectData.projectImg))
      setFileStatus(false)
    }else{
      setPreview("")
    }
  }, [projectData.projectImg ]);

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
