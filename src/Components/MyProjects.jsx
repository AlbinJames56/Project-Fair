import React from "react";
import AddProject from "./AddProject";

function MyProjects() {
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
        <div className="border d-flex align-items-center-rounded p-3">
          <h3>Project Title</h3>
          <div className="d-flex ms-auto">
            <button className="btn text-dark">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <a className="me-3 btn text-dark">
              <i className="fa-brands fa-github"></i>
            </a>
            <button className="btn text-dark">
              <i className="fa-solid fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <p className="text-danger">No Projects Added Yet!!!</p>
      </div>
    </div>
  );
}

export default MyProjects;
