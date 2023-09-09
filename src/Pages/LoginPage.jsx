import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import "../assets/styles/Login.scss";

function LoginPage() {
  const navigate = useNavigate();
  const [lgShow, setLgShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const isRecaptchaCompleted = recaptchaValue !== null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRecaptchaCompleted) {
      loginSuccess();
    } else {
      Swal.fire({
        title: "reCAPTCHA Required",
        text: "Please complete the reCAPTCHA.",
        icon: "error",
        showConfirmButton: false,
      });

      // Redirect to dashboard after a delay (3 seconds)
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  const loginSuccess = () => {
    Swal.fire({
      title: "Login Successful!",
      text: "Welcome!",
      icon: "success",
    });

    // Redirect to dashboard after a delay (3 seconds)
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: "hsl(240, 100%, 99%)" }}>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="loginbox">
            <div
              className="login-left flex-1 flex items-center"
              style={{ display: "flex" }}
            >
              <hr className="h-2 w-8 mr-2" style={{ color: "white" }} />
              <h3 className="smartLogo">Knowledge Hub</h3>
              <hr className="h-2 w-8 ml-2" style={{ color: "white" }} />
            </div>

            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      label="Email"
                      placeholder="Email"
                      type="email"
                      name="email"
                    />
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      Please enter your Email Address.
                    </div>
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      className="form-control"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      // minLength="6"
                      required
                    />
                    <div style={{ height: "8px" }} />
                    <label>
                      <input onClick={togglePassword} type="checkbox" /> Show
                      password
                    </label>
                    <label>
                      <a
                        className="forgotPassword"
                        href="#"
                        onClick={() => setLgShow(true)}
                      >
                        Forgot Password
                      </a>
                    </label>
                  </div>

                  <br />
                  {/* Add reCAPTCHA */}
                  <ReCAPTCHA
                    sitekey="6Ldui9ceAAAAAND8D15Aqe4moWGeb7hyS6mY1a9y"
                    onChange={handleRecaptchaChange} // Update reCAPTCHA value
                    secretkey="6Ldui9ceAAAAAMcCnqekdVQCNQXIJk8YuyNrpaGI"
                  />

                  <center>
                    <div className="form-group mb-0">
                      {/* Disable the "Login" button if reCAPTCHA is not completed */}
                      <button
                        type="submit"
                        className="btn btn-login"
                        disabled={!isRecaptchaCompleted}
                      >
                        {isLoading ? (
                          <div style={{ marginLeft: "40%" }}>
                            <Bars
                              visible={true}
                              height="25"
                              width="25"
                              radius="9"
                              color="#fff"
                              ariaLabel="falling-lines-loading"
                            />
                          </div>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </div>
                  </center>
                </form>
                
                 <Modal show={lgShow} onHide={() => setLgShow(false)}>
                  <Modal.Header closeButton>
                    <div style={{ width: "100%", fontSize: "18px" }}>
                      <center>Forgot Password</center>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        placeholder="Enter email address"
                        className="form-control"
                        name="title"
                        id="title"
                      />
                    </div>
                    <center><button className="btn btn-login">Submit</button></center>
                  </Modal.Body>
                </Modal>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
