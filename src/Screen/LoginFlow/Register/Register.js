import React, { useEffect, useState } from "react";
import "./register.css";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logos from "../../../Assets/image/bay.png";
import { setToken, setUserData } from "../../../Helper/Storage";

const Register = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(true);
  const [load, setload] = useState(false);
  const [errors, setErrors] = useState({});
  const [businessErrors, setBusinessErrors] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [countryList, setCountriesList] = useState([]);
  const [countryId, setCountryId] = useState();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    mobile_number: "",
    device_type: "android",
  });
  const [businessformData, setBusinessFormData] = React.useState({
    business_email: "",
    business_name: "",
    password: "",
    business_phone: "",
    device_type: "android",
  });

  useEffect(() => {
    getCountries();
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const countryhandleChange = (e) => {
    const { name, value } = e.target;
    setCountryId(value);
    setBusinessFormData({
      ...businessformData,
      [name]: value,
    });
  };

  const countryhandleChangecustomer = (e) => {
    const { name, value } = e.target;
    setCountryId(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const businesshandleChange = (e) => {
    const { name, value } = e.target;
    setBusinessFormData({
      ...businessformData,
      [name]: value,
    });
  };
  const handleActive = (e) => {
    setActive(!active);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    country_id: Yup.string().required("Country is required"),
  });

  const validationBusinessSchema = Yup.object({
    business_email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    business_name: Yup.string().required("Business name is required"),
    business_phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    business_country_id: Yup.string().required("Country is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      await validationSchema.validate(formData, { abortEarly: false });
      setload(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.CustomerRegister
      );
      if (response.success === true) {
        setToken(response.result.api_token);
        setUserData(response.result);
        navigate("/");
        setload(false);
        toast.success(response.msg);
      } else {
        setload(false);
        toast.error(response.result[0]);
      }
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const handleBusinessSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      await validationBusinessSchema.validate(businessformData, {
        abortEarly: false,
      });
      setload(true);
      const response = await apiCallNew(
        "post",
        businessformData,
        ApiEndPoints.SellerRegister
      );
      if (response.success === true) {
        // setToken(response.result.api_token);
        // setUserData(response.result);
        navigate("/email-verify", { state: { data: response.result } });
        setload(false);
        toast.success(response.msg);
      } else {
        setload(false);
        toast.error(response.result[0]);
      }
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setBusinessErrors(newErrors);
    }
  };

  const getCountries = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.CountryList).then((response) => {
        if (response.success) {
          setCountriesList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="p-3 p-md-4 p-xl-5">
        <div className="container">
          {load && (
            <div style={styles.backdrop}>
              <CircularProgress style={styles.loader} />
            </div>
          )}
          <div className="card border-light-subtle shadow-sm">
            <div className="row g-0">
              <div className="col-12 col-md-6">
                <img
                  className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                  loading="lazy"
                  src="https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_business.jpg"
                  alt="BootstrapBrain Logo"
                />
              </div>
              <div className="col-12 col-md-6">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
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
                        <h2 className="h3">Create an account</h2>
                      </div>
                    </div>
                  </div>
                  <ul className="tab-group">
                    <li
                      className={active ? "tab active" : "tab"}
                      onClick={handleActive}
                    >
                      <a>Personal</a>
                    </li>
                    <li
                      className={active ? "tab" : "tab active"}
                      onClick={handleActive}
                    >
                      <a>Business</a>
                    </li>
                  </ul>
                  {active ? (
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="firstname"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                        <label for="floatingInput">Full Name</label>
                      </div>

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
                        <label for="floatingInput">Email Address</label>
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
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="floatingInput"
                          placeholder="mobile number"
                          name="mobile_number"
                          value={formData.mobile_number}
                          onChange={handleChange}
                        />

                        {errors.mobile_number && (
                          <div className="text-danger">
                            {errors.mobile_number}
                          </div>
                        )}
                        <label for="floatingInput">Mobile Number</label>
                      </div>
                      <div className="form-floating mb-3">
                        <select
                          className="form-control"
                          id="floatingCountry"
                          name="country_id"
                          value={countryId}
                          onChange={countryhandleChangecustomer}
                        >
                          <option value=""></option>
                          {countryList.map((item, index) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {errors.country_id && (
                          <div className="text-danger">{errors.country_id}</div>
                        )}
                        <label for="floatingCountry">Select Country</label>
                      </div>
                      <div className="d-grid">
                        <button
                          className="btn btn-login text-uppercase fw-bold"
                          type="submit"
                        >
                          Create personal account
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleBusinessSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="fullname"
                          name="business_name"
                          value={businessformData.business_name}
                          onChange={businesshandleChange}
                        />
                        {businessErrors.business_name && (
                          <div className="text-danger">
                            {businessErrors.business_name}
                          </div>
                        )}
                        <label for="floatingInput">Business Name</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                          name="business_email"
                          value={businessformData.business_email}
                          onChange={businesshandleChange}
                        />
                        {businessErrors.business_email && (
                          <div className="text-danger">
                            {businessErrors.business_email}
                          </div>
                        )}
                        <label for="floatingInput">Business Email</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          name="password"
                          value={businessformData.password}
                          onChange={businesshandleChange}
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
                        {businessErrors.password && (
                          <div className="text-danger">
                            {businessErrors.password}
                          </div>
                        )}
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="floatingInput"
                          placeholder="mobile number"
                          name="business_phone"
                          value={businessformData.business_phone}
                          onChange={businesshandleChange}
                        />
                        {businessErrors.business_phone && (
                          <div className="text-danger">
                            {businessErrors.business_phone}
                          </div>
                        )}
                        <label for="floatingInput">Mobile Number</label>
                      </div>
                      <div className="form-floating mb-3">
                        <select
                          className="form-control"
                          id="floatingCountry"
                          name="business_country_id"
                          value={countryId}
                          onChange={countryhandleChange}
                        >
                          <option value=""></option>
                          {countryList.map((item, index) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {businessErrors.business_country_id && (
                          <div className="text-danger">
                            {businessErrors.business_country_id}
                          </div>
                        )}
                        <label for="floatingCountry">Select Country</label>
                      </div>
                      <div className="d-grid">
                        <button className="btn btn-login text-uppercase fw-bold">
                          Create Business account
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="m-0 text-secondary text-center">
                        Already have an account?{" "}
                        <Link to={"/login"}>
                          <a
                            href="#!"
                            className="link-primary text-decoration-none"
                          >
                            Sign in
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
export default Register;
