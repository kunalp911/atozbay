import React, { useState } from "react";
import OTPInput from "react-otp-input";
import "./verification.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import logos from "../../../Assets/image/bay.png";
const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;
  const [otp, setOtp] = useState("");
  const [load, setload] = useState(false);
  const [errors, setErrors] = useState({});

  const validation = () => {
    const newError = {};
    if (!otp) {
      newError.otp = "OTP is required";
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        setErrors({});
        const payload = {
          email: email,
          reset_otp: otp,
        };

        setload(true);
        const response = await apiCallNew(
          "post",
          payload,
          ApiEndPoints.VerifyEmail
        );
        if (response.success === true) {
          navigate("/reset-password", { state: { email: email, otp: otp } });
          setload(false);
          toast.success(response.msg);
        } else {
          setload(false);
          toast.error(response.msg);
        }
      } catch (error) {
        console.log(error);
      }
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
              <Link to={"/forgot-password"}>
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
                <h2 className="h3 text-center mt-3">Verification code</h2>
                <div className="d-flex justify-content-center mt-4">
                  <p className="logintitle2">
                    Please enter the verification code we sent to your email
                    address
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="otp-container">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span className="otp-separator">-</span>}
                      renderInput={(props) => (
                        <input {...props} className="otp-input" />
                      )}
                    />
                  </div>
                  {errors.otp && (
                    <div className="text-danger">{errors.otp}</div>
                  )}
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

export default Verification;
