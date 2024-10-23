import React, { useContext, useEffect, useState } from "react";
import AddProject from "./AddProject";
import { getUserProjectsAPI } from "../services/allAPI";
import { addProjectContextResponse } from "../ContextAPI/ContextShare";

function MyProjects() {
  const { addProjectResponse, setAddProjectResponse}=useContext(addProjectContextResponse)
  const [projects, setProjects] = useState();
  const getUserProject = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      // api call
      const result = await getUserProjectsAPI(reqHeader);
      // console.log(result);
      if (result.status === 200) {
        setProjects(result.data);
      } else {
        console.log(result);
      }
    }
  };
  // console.log(projects);
  useEffect(() => {
    getUserProject();
  }, [addProjectResponse]);
  return (
    <div className="card shadow p-3 mt-3">
      <div className="d-flex">
        <h2>My Projects</h2>
      </div>
      <div className="ms-auto">
        <AddProject />
      </div>
      <div className="mt-4">
        {/* collection of user projects */}
        {projects?.length > 0 ? (
          projects.map((project, index) => (
            <div className="border d-flex align-items-center-rounded p-3">
              <h3>{project?.title}</h3>
              <div className="d-flex ms-auto">
                <button className="btn text-dark">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <a className="me-3 btn text-dark">
                  <i className="fa-brands fa-github">{project?.github}</i>
                </a>
                <button className="btn text-dark">
                  <i className="fa-solid fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-danger">No Projects Added Yet!!!</p>
        )}
      </div>
    </div>
  );
}
export default MyProjects;
