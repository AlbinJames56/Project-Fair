import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import profileImg from '../assets/Images/boyImg.webp'
function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="card shadow p-5 mt-3 me-2">
        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="btn btn-outline-info"
          >
            <i className="fa-solid fa-angle-down fa-beat-fade"></i>
          </button>
        </div>
      </div>
      <Collapse in={open}>
        <div id="row justify-content-center mt-3">
          <label className="d-flex justify-content-center mt-3">

            <input type="file" style={{display:'none'}} name="" id="" />
            <img width={'200px'}   src={profileImg} alt="profile" />
          </label>
          <div className="mt-3">
            <input type="text" placeholder="Github Link" className="form-control" name="" id="" />
            <br />
            <input type="text" placeholder="LinkedIn Link" className="form-control" name="" id="" />
          </div>
          <div className="d-grid mt-2">
            <button className="btn btn-warning">Update</button>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default Profile;
