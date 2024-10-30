import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import sampleImg from "../assets/Images/boyImg.webp";
import { toast } from "react-toastify";
import { GetProfileAPI, UpdateProfileAPI } from "../services/allAPI";
import { SERVER_URL } from "../services/serverUrl";
function Profile() {
  const [open, setOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({
    username: "",
    email: "",
    profileImg: "",
    github: "",
    linkedin: "",
  });

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profileImg: "",
    github: "",
    linkedin: "",
  });
  const [preview, setPreview] = useState("");

  // setting image url
  useEffect(() => {
    if (profile.profileImg instanceof File) {
      const objectUrl = URL.createObjectURL(profile.profileImg);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up URL object
    } else {
      setPreview("");
    }
  }, [profile.profileImg, currentProfile.profileImg]);

  // console.log(preview);

  // function to update profile
  const handleUpdate = async () => {
    const { profileImg, github, linkedin } = profile;
    if (
      github == currentProfile.github &&
      linkedin == currentProfile.linkedin && profileImg==preview
    ) {
      toast.warn("Noting to update");
    } else {
      const reqBody = new FormData();
      reqBody.append("profileImg", profileImg);
      reqBody.append("github", github);
      reqBody.append("linkedin", linkedin);
      // getting token from session storage
      const token = sessionStorage.getItem("token");
      // set req header with token
      if (token) {
        const reqHeader = {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        // apicall
        try {
          const result = await UpdateProfileAPI(reqBody, reqHeader);
          if (result.status == 200) {
            toast.success("Profile updated");
            // console.log(result);
          } else {
            toast.warn(result.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  // function to get profile data
  const getProfile = async () => {
    // getting token
    const token = sessionStorage.getItem("token");
    // set req header with token
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      // api call
      try {
        const result = await GetProfileAPI(reqHeader);

        console.log("get profile api:", result);
        if (result.status == 200) {
          setCurrentProfile({
            ...currentProfile,
            username: result.data.username,
            email: result.data.email,
            linkedin: result.data.linkedin,
            github: result.data.github,
            profileImg: result.data.profileImg,
          });
          console.log(currentProfile.profileImg);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    setProfile({
      ...profile,
      username: currentProfile.username,
      email: currentProfile.email,
      linkedin: currentProfile.linkedin,
      github: currentProfile.github,
    });
  }, [currentProfile]);

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
            <input
              type="file"
              accept=".jpg,,png ,.jpeg"
              style={{ display: "none" }}
              onChange={(e) =>
                setProfile({ ...profile, profileImg: e.target.files[0] })
              }
            />
            <img
              width={"200px"}
              src={
                preview
                  ? preview
                  : currentProfile.profileImg
                  ? `${SERVER_URL}/uploads/${currentProfile.profileImg}`
                  : sampleImg
              }
              alt="profile"
            />
          </label>
          <div className="mt-3">
            <h5 className="text-dark">Username: {profile.username}</h5>
            <h5 className="text-dark mt-2 mb-4">Email: {profile.email}</h5>
            <label for="github">
              Enter your github link
              <input
                type="text"
                placeholder="Github Link"
                className="form-control"
                value={profile.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    github: e.target.value,
                  })
                }
              />
            </label>
            <br />
            <label for="linkedin">
              Enter your Linkedin link
              <input
                type="text"
                placeholder="LinkedIn Link"
                className="form-control"
                value={profile.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    linkedin: e.target.value,
                  })
                }
              />{" "}
            </label>
          </div>
          <div className="d-grid mt-2">
            <button className="btn btn-warning" onClick={() => handleUpdate()}>
              Update
            </button>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default Profile;
