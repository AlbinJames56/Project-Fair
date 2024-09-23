import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
function Auth({ register }) {
  const isRegisterForm = register ? true : false;
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
                    />
                  </Form.Group>
                )}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlEmail"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlPswd"
                >
                  <Form.Control
                    type="Password"
                    placeholder="Enter Your Password"
                  />
                </Form.Group>
              </Form>
              {isRegisterForm ? (
                <div>
                  <button className="btn btn-dark text-light my-2">Register</button>
                  <p className="text-light">
                    Already have a Account?Click here..
                    <Link to={"/login"} style={{ textDecoration: "none" }}>
                      Login
                    </Link>
                  </p>
                </div>
              ) : (
                <div>
                  <button className="btn btn-dark text-light my-2">Login</button>
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
    </div>
  );
}
export default Auth;
