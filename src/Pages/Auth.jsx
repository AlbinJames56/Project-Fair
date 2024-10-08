import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/allAPI";
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';

function Auth({ register }) {
  const isRegisterForm = register ? true : false;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(userData);
  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      toast.info('Please fill all fields!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition:Flip
        })
    } else {
      try {
        const result = await loginAPI({ email, password });
        console.log(result);
        if (result.status === 200) {
          sessionStorage.setItem("username", result.data.existingUser.username);
          sessionStorage.setItem("token", result.data.token);
          navigate("/");
          setUserData({ email: "", password: "" });
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  // register
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.info("Please fill all fileds");
    } else {
      // api calling
      try {
        const result = await registerAPI(userData);
        console.log(result);

        if (result.status === 200) {
          toast.success(`${result.data.username} has successfully registered`);
          navigate("/login");
          setUserData({ username: "", email: "", password: "" });
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="bg-info p-5" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="container w-75">
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bolder",
            }}
            className="mx-5"
          >
            <i
              className="fa-solid
          fa-arrow-left "
            ></i>{" "}
            Back To Home
          </Link>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src="https://png.pngtree.com/png-vector/20220527/ourmid/pngtree-fa-two-steps-authentication-password-secure-notice-login-verification-or-sms-png-image_4746695.png"
                width={"100%"}
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <h1 className="fw-bolder text-light">
                <i className="fa-solid fa-list-check me-3"></i>Project Fair
              </h1>
              <h5 className="text-light my-4">
                {isRegisterForm
                  ? "Sign Up to your Account "
                  : "Sign In to your Account"}
              </h5>
              <Form className="w-100 ">
                {isRegisterForm && (
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlUsername"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Username"
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                      value={userData.username}
                    />
                  </Form.Group>
                )}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlEmail"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    value={userData.email}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlPswd"
                >
                  <Form.Control
                    type="Password"
                    placeholder="Enter Your Password"
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    value={userData.password}
                  />
                </Form.Group>
              </Form>
              {isRegisterForm ? (
                <div>
                  <button
                    className="btn btn-dark text-light my-2"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                  <p className="text-light">
                    Already have a Account?Click here..
                    <Link to={"/login"} style={{ textDecoration: "none" }}>
                      Login
                    </Link>
                  </p>
                </div>
              ) : (
                <div>
                  <button
                    className="btn btn-dark text-light my-2"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="text-light">
                    Don't have a Account?Click here..
                    <Link to={"/register"} style={{ textDecoration: "none" }}>
                      Register
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" transition={Bounce}/>
    </div>
  );
}
export default Auth;
