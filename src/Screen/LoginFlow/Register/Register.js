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
import PhoneInput from "react-phone-input-2";

const Register = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(true);
  const [load, setload] = useState(false);
  const [errors, setErrors] = useState({});
  const [businessErrors, setBusinessErrors] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswords, setShowPasswords] = React.useState(false);
  const [countryList, setCountriesList] = useState([]);
  const [countryId, setCountryId] = useState();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    surname: "",
    device_type: "android",
  });
  const [businessformData, setBusinessFormData] = React.useState({
    business_email: "",
    business_name: "",
    password: "",
    business_phone: "",
    device_type: "android",
  });
  console.log("formData", formData);

  useEffect(() => {
    getCountries();
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswords = () => setShowPasswords(!showPasswords);

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

  const handlePhoneChange = (value, country) => {
    const countryCode = country.dialCode;
    const phoneNumber = value.slice(countryCode.length);
    setCountryCode(countryCode);
    setPhone(phoneNumber);
    setFormData({
      ...formData,
      mobile_number: phoneNumber,
      country_code: countryCode,
    });
  };

  const businesshandleChange = (e) => {
    const { name, value } = e.target;
    setBusinessFormData({
      ...businessformData,
      [name]: value,
    });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("First name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    mobile_number: Yup.string().required("Mobile number is required"),
  });

  const validationSchemapass = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
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

  const handleActive = async () => {
    try {
      setErrors({});
      await validationSchema.validate(formData, { abortEarly: false });
      setActive(false); // Validation passed, set active to false
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      setActive(true); // Validation failed, keep active as true
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = {
      password: formData.password,
      confirmPassword: confirmPassword,
    };
    const payload = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      mobile_number: formData.mobile_number,
      country_code: formData.country_code,
      device_type: "android",
    };
    try {
      setErrors({});
      await validationSchemapass.validate(valid, { abortEarly: false });
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.CustomerRegister
      );
      if (response.success === true) {
        setToken(response.result.api_token);
        setUserData(response.result);
        navigate("/");
        setload(false);
        toast.success(response.msg);
        window.location.reload();
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
                      <div className="mb-4">
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
                      {active ? (
                        " "
                      ) : (
                        <p
                          className="backregister-btn"
                          onClick={() => setActive(true)}
                        >
                          <i className="fa fa-arrow-left p-2"></i>Back
                        </p>
                      )}
                    </div>
                  </div>
                  {/* <ul className="tab-group">
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
                  </ul> */}
                  {active ? (
                    <form action="javascript:void(0);">
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
                        <label for="floatingInput">First Name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="surname"
                          name="surname"
                          value={formData.surname}
                          onChange={handleChange}
                        />
                        {errors.surname && (
                          <div className="text-danger">{errors.surname}</div>
                        )}
                        <label for="floatingInput">Surname</label>
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
                      {/* <div className="form-floating mb-3">
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
                      </div> */}

                      <div className="form-floating mb-3">
                        <PhoneInput
                          country={"in"}
                          name="mobile_number"
                          value={`${countryCode}${phone}`}
                          onChange={(value, country) =>
                            handlePhoneChange(value, country)
                          }
                          inputProps={{
                            name: "country_code",
                            required: true,
                            autoFocus: true,
                          }}
                          containerStyle={{ width: "100%" }}
                          inputStyle={{
                            width: "100%",
                            paddingLeft: "50px",
                            fontSize: "16px",
                            height: "55px",
                          }}
                        />
                        {errors.mobile_number && (
                          <div className="text-danger">
                            {errors.mobile_number}
                          </div>
                        )}
                      </div>
                      {/* <div className="form-floating mb-3">
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
                      </div> */}
                      <div className="d-grid">
                        <button
                          className="btn btn-login text-uppercase fw-bold"
                          type="submit"
                          onClick={() => handleActive()}
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form action="javascript:void(0);" onSubmit={handleSubmit}>
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
                          type={showPasswords ? "text" : "password"}
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {showPassword ? (
                          <VisibilityIcon
                            style={{
                              position: "absolute",
                              top: "18px",
                              right: "10px",
                            }}
                            onClick={handleClickShowPasswords}
                          />
                        ) : (
                          <VisibilityOffIcon
                            style={{
                              position: "absolute",
                              top: "18px",
                              right: "10px",
                            }}
                            onClick={handleClickShowPasswords}
                          />
                        )}
                        {errors.confirmPassword && (
                          <div className="text-danger">
                            {errors.confirmPassword}
                          </div>
                        )}
                        <label for="floatingPassword">Confirm Password</label>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-login text-uppercase fw-bold"
                          type="submit"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  )}
                  {/* ) : ( */}
                  {/* <form onSubmit={handleBusinessSubmit}>
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
                    </form> */}
                  {/* )} */}

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
