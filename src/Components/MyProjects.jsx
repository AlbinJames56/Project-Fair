import React, { useContext, useEffect, useState } from "react";
import AddProject from "./AddProject";
import { DeleteProjectsAPI, getUserProjectsAPI } from "../services/allAPI";
import {
  addProjectContextResponse,
  editProjectContextResponse,
} from "../ContextAPI/ContextShare";
import EditProject from "./EditProject";
import { toast } from "react-toastify";
function MyProjects() {
  const { addProjectResponse, setAddProjectResponse } = useContext(
    addProjectContextResponse
  );
  const { editProjectResponse, setProjectResponse } = useContext(
    editProjectContextResponse
  );
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
  const handleDelete = async (pid) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      // api call
      try {
        const result = await DeleteProjectsAPI(pid, reqHeader);
        if (result.status == 200) {
          getUserProject();
        } else {
          toast.warning(result.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getUserProject();
  }, [addProjectResponse, editProjectResponse]);
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
            <div key={index} className="border d-flex align-items-center-rounded p-3">
              <h3>{project?.title}</h3>
              <div className="d-flex ms-auto">
                <div className="btn text-dark">
                  <EditProject project={project} />
                </div>
                <button className=" btn text-dark">
                  <i className="fa-brands fa-github"> </i>
                </button>
                <button
                  className="btn text-dark"
                  onClick={() => handleDelete(project._id)}
                >
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
