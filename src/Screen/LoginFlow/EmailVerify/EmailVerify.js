import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import logos from "../../../Assets/image/bay.png";

const EmailVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state;
  const [load, setload] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  console.log("dddddddtttt", data);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      const payload = {
        email: email,
      };
      await validationSchema.validate(payload, { abortEarly: false });
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.SendOTPEmail
      );
      if (response.success === true) {
        navigate("/email-otp", { state: { email: email, data: data } });
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
  return (
    <div>
      <div className="container mt-5">
        {load && (
          <div style={styles.backdrop}>
            <CircularProgress style={styles.loader} />
          </div>
        )}
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <Link to={"/signup"}>
                <i
                  className="fa fa-arrow-left p-2"
                  aria-hidden="true"
                  style={{ cursor: "pointer" }}
                ></i>
              </Link>
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
                <h2 className="h3 text-center mt-3">Email Verification</h2>
                <div className="d-flex justify-content-center mt-4">
                  <p className="logintitle2">
                    Enter email associated with your account and we’ll send and
                    email with intructions to reset your password
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div className="d-grid mt-5">
                    <button
                      className="btn btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Continue
                    </button>
                  </div>
                </form>
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
export default EmailVerify;
