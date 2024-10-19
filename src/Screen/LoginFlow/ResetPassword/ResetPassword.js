import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { toast } from "react-toastify";
import logos from "../../../Assets/image/bay.png";
import * as Yup from "yup";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  const otp = location.state.otp;
  const [load, setload] = useState(false);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      const valid = {
        password: password,
        confirmPassword: confirmPassword,
      };
      const payload = {
        email: email,
        password: password,
        reset_otp: otp,
      };
      await validationSchema.validate(valid, { abortEarly: false });
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ResetPassword
      );
      if (response.success === true) {
        navigate("/login");
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
              <Link to={"/verification"}>
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
                <h2 className="h3 text-center mt-3">Reset Password?</h2>
                <div className="d-flex justify-content-center mt-4">
                  <p className="logintitle2">
                    Your new password must be different from previously used
                    password
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                    <label for="floatingPassword">Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                      <div className="text-danger">
                        {errors.confirmPassword}
                      </div>
                    )}
                    <label for="floatingPassword">Confirm Password</label>
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

export default ResetPassword;
