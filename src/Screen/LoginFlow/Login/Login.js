import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { setToken, setUserData } from "../../../Helper/Storage";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import logos from "../../../Assets/image/bay.png";
import googlelogo from "../../../Assets/image/google-icon.png";
import facebooklogo from "../../../Assets/image/Facebook.svg.png";
import FacebookLogin from "react-facebook-login";
import applelogo from "../../../Assets/image/Apple_gray.png";
import AppleLogin from "react-apple-login";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [googleData, setGoogleData] = useState("");
  const [socialID, setSocialID] = useState(Number);
  const [faceGoogleData, setFaceGoogleData] = useState("");
  const [faceSocialID, setFaceSocialID] = useState(Number);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [load, setload] = useState(false);

  useEffect(() => {
    if (googleData && socialID) {
      GooglePostApi();
    }
  }, [googleData, socialID]);

  useEffect(() => {
    if (faceGoogleData && faceSocialID) {
      FacebookPostApi();
    }
  }, [faceGoogleData, faceSocialID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  });
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const responseFacebook = (response) => {
    try {
      if (response) {
        setFaceSocialID(response.id);
        setFaceGoogleData(response);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("response", response);
  };
  const GoogleDataGet = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log("resss", res);
        if (res.status == 200) {
          setGoogleData(res.data);
          setSocialID(res.data?.sub);
        } else {
          toast.error("Google login failed. Please try again.");
        }
      } catch (err) {
        console.error("Failed to fetch user info", err);
        toast.error(err.message || "Failed to fetch user info");
      }
    },
    onFailure: (error) => {
      console.error("Google login failed", error);
      toast.error("Google login failed. Please try again.");
    },
  });

  const GooglePostApi = async () => {
    if (!googleData || !socialID) {
      console.error("Missing googleData or socialID");
      return;
    }

    const formData = new FormData();
    formData.append("email", googleData.email);
    formData.append("name", googleData.name);
    formData.append("social_id", socialID);
    formData.append("login_type", 3);

    try {
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.SocialLogin
      );
      setload(true);
      if (response.success === true) {
        setToken(response?.result?.api_token);
        setUserData(response?.result);
        toast.success(response.msg);
        navigate("/");
        window.location.reload();
        setload(false);
      } else {
        toast.error(response.msg);
        setload(false);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };
  const FacebookPostApi = async () => {
    if (!faceGoogleData || !faceSocialID) {
      console.error("Missing googleData or socialID");
      return;
    }
    const formData = new FormData();
    formData.append("email", faceGoogleData.email);
    formData.append("name", faceGoogleData.name);
    formData.append("social_id", faceSocialID);
    formData.append("login_type", 2);

    try {
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.SocialLogin
      );
      setload(true);
      if (response.success === true) {
        setToken(response?.result?.api_token);
        setUserData(response?.result);
        toast.success(response.msg);
        navigate("/");
        window.location.reload();
        setload(false);
      } else {
        toast.error(response.msg);
        setload(false);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      await validationSchema.validate(formData, { abortEarly: false });
      setload(true);
      const response = await apiCallNew("post", formData, ApiEndPoints.Login);
      if (response.success === true) {
        setToken(response.result.api_token);
        setUserData(response.result);
        navigate("/");
        window.location.reload();
        setload(false);
        toast.success(response.msg);
      } else {
        setload(false);
        toast.error(response.msg);
      }
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  // const appleResponse = (response) => {
  //   console.log("rrrrr", response);
  //   if (!response.error) {
  //     axios
  //       .post("/auth", response)
  //       .then((res) => this.setState({ authResponse: res.data }))
  //       .catch((err) => console.log(err));
  //   }
  // };

  // const handleAppleLogin = () => {
  //   window.AppleID.auth
  //     .signIn()
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const handleAppleLoginSuccess = (response) => {
  //   console.log("Apple login successful:", response);
  // };

  // const handleAppleLoginError = (error) => {
  //   console.error("Apple login error:", error);
  // };

  return (
    <div>
      <div className="container">
        {load && (
          <div style={styles.backdrop}>
            <CircularProgress style={styles.loader} />
          </div>
        )}
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <div className="d-flex justify-content-center">
                  <Link to="/">
                    <img
                      src={logos}
                      alt="Logo"
                      className="text-center"
                      style={{ maxWidth: "150px", marginTop: "-15px" }}
                    />
                  </Link>
                </div>
                <h2 className="h3 text-center mt-2">Sign in</h2>
                <div className="d-flex justify-content-center">
                  <p className="logintitle2">Sign in to atozbay or</p>
                  <Link to={"/signup"}>
                    <a className="ms-2">create an account</a>
                  </Link>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {showPassword ? (
                      <VisibilityIcon
                        style={{
                          position: "absolute",
                          top: "18px",
                          right: "10px",
                        }}
                        onClick={handleClickShowPassword}
                      />
                    ) : (
                      <VisibilityOffIcon
                        style={{
                          position: "absolute",
                          top: "18px",
                          right: "10px",
                        }}
                        onClick={handleClickShowPassword}
                      />
                    )}
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                    <label for="floatingPassword">Password</label>
                  </div>
                  <div className="form-check mb-4">
                    <Link to={"/forgot-password"}>
                      <p style={{ float: "right" }}>Forgot Password?</p>
                    </Link>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <hr className="my-4" />
                </form>
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-google btn-login text-uppercase fw-bold"
                    type="submit"
                    onClick={GoogleDataGet}
                  >
                    <img src={googlelogo} width={"20px"} /> Sign in with Google
                  </button>
                </div>
                <div className="d-grid mb-2">
                  <FacebookLogin
                    appId="1001017301349702"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="btn btn-facebook btn-login text-uppercase fw-bold"
                    icon={<img src={facebooklogo} width={"20px"} />}
                    textButton="Sign in with Facebook"
                  />
                </div>
                {/* <div className="d-grid mb-2">
                  <AppleLogin
                    clientId="SVQ8PKD9L2"
                    scope="name email"
                    redirectURI="https://atozbay.com/web"
                    state="state"
                    nonce="nonce"
                    responseType="code id_token"
                    responseMode="query"
                    usePopup={true}
                    callback={handleAppleLoginSuccess}
                    onError={handleAppleLoginError}
                    render={(props) => (
                      <button
                        onClick={props.onClick}
                        className="btn btn-apple text-uppercase fw-bold"
                        type="submit"
                      >
                        <img
                          src={applelogo}
                          width={"20px"}
                          style={{ marginTop: "-5px", marginRight: "-3px" }}
                          alt="Apple logo"
                        />{" "}
                        Continue with Apple
                      </button>
                    )}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: "white",
  },
};
export default Login;
