import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import logos from "../../../Assets/image/bay.png";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

const ContactInfo = () => {
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const userData = localStorage.getItem("@userData");
  const data = JSON.parse(userData);
  const [countryList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [errors, setErrors] = useState({});
  const [businessErrors, setbusinessErrors] = useState({});
  const [contactData, setContactData] = useState({
    address_1: "",
    address_2: "",
    city_name: "",
    pincode: "",
  });
  const [businessData, setBusinessData] = useState({
    name: "",
    address_1: "",
    address_2: "",
    city_name: "",
    pincode: "",
    address_country_code: "",
    address_mobile_number: "",
    business_relation_type: "",
  });
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [addressPhone, setAddressPhone] = useState("");
  const [countryaddCode, setcountryaddCode] = useState("91");

  const handlePhoneChange = (value, country) => {
    const countryCode = country.dialCode;
    const phoneNumber = value.slice(countryCode.length);
    setCountryCode(countryCode);
    setPhone(phoneNumber);
    setBusinessData({
      ...businessData,
      mobile_number: phoneNumber,
      country_code: countryCode,
    });
  };

  const handleAddressPhoneChange = (value, country) => {
    const countryCode = country.dialCode;
    const phoneNumber = value.slice(countryCode.length);
    setcountryaddCode(countryCode);
    setAddressPhone(phoneNumber);
    setBusinessData({
      ...businessData,
      address_mobile_number: phoneNumber,
      address_country_code: countryCode,
    });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const contacthandleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const businesshandleChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({
      ...businessData,
      [name]: value,
    });
  };

  const countryhandleChangecustomer = async (e) => {
    const { name, value } = e.target;
    setCountryId(value);
    setContactData({
      ...contactData,
      [name]: value,
    });
    await getStates(value);
  };
  const stateIdhandleChange = async (e) => {
    const { name, value } = e.target;
    setStateId(value);
    setContactData({
      ...contactData,
      [name]: value,
    });
    await getStates(value);
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
  const getStates = (id) => {
    try {
      apiCallNew("get", {}, ApiEndPoints.StateList + id).then((response) => {
        if (response.success) {
          setStateList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    address_1: Yup.string().required("Address is Required"),
    address_2: Yup.string().required("Address is Required"),
    city_name: Yup.string().required("City is Required"),
    pincode: Yup.string().required("Pincode is Required"),
    country_id: Yup.string().required("Country is Required"),
    state_id: Yup.string().required("State is Required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      await validationSchema.validate(contactData, {
        abortEarly: false,
      });
      setload(true);
      const response = await apiCallNew(
        "post",
        contactData,
        ApiEndPoints.ContactInfo
      );
      if (response.success === true) {
        setload(false);
        toast.success(response.msg);
        navigate("/account-setting");
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

  // *******************business info*********************

  const validationSchemabusiness = Yup.object().shape({
    address_1: Yup.string().required("Address is Required"),
    address_2: Yup.string().required("Address is Required"),
    city_name: Yup.string().required("City is Required"),
    pincode: Yup.string().required("Pincode is Required"),
    country_id: Yup.string().required("Country is Required"),
    state_id: Yup.string().required("State is Required"),
    name: Yup.string().required("Name is Required"),
    address_mobile_number: Yup.string().required("Mobile Number is Required"),
    business_relation_type: Yup.string().required("Relationship is Required"),
    address_country_code: Yup.string().required("Country Code is Required"),
    mobile_number: Yup.string().required("Mobile Number is Required"),
    address_mobile_number: Yup.string().required(
      "Address Mobile Number is Required"
    ),
  });

  const countryhandleChangebusiness = async (e) => {
    const { name, value } = e.target;
    setCountryId(value);
    setBusinessData({
      ...businessData,
      [name]: value,
    });
    await getStates(value);
  };
  const stateIdhandleChangebusiness = async (e) => {
    const { name, value } = e.target;
    setStateId(value);
    setBusinessData({
      ...businessData,
      [name]: value,
    });
    await getStates(value);
  };

  const handleRelationshipChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({
      ...businessData,
      [name]: value,
    });
  };
  const handleSubmitBusiness = async (e) => {
    e.preventDefault();
    try {
      setbusinessErrors({});
      await validationSchemabusiness.validate(businessData, {
        abortEarly: false,
      });
      setload(true);
      const response = await apiCallNew(
        "post",
        businessData,
        ApiEndPoints.UpdateBusinessContactInfo
      );
      if (response.success === true) {
        setload(false);
        toast.success(response.msg);
        navigate("/account-setting");
      } else {
        setload(false);
        toast.error(response.result[0]);
      }
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setbusinessErrors(newErrors);
    }
  };
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
              <Link to={"/account-setting"}>
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
                {data?.user_type === "Customer" ? (
                  <h4 className="text-center mt-2">
                    Provide your contact info
                  </h4>
                ) : (
                  <h4 className="text-center mt-2">
                    Tell us about your business
                  </h4>
                )}
                {data?.user_type === "Customer" ? (
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3 mt-5">
                      <select
                        className="form-control"
                        id="floatingCountry"
                        name="country_id"
                        placeholder="Select Country"
                        value={contactData.country_id}
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
                        <span className="text-danger">{errors.country_id}</span>
                      )}
                      <label for="floatingCountry">Select Country</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name="address_1"
                        value={contactData.address_1}
                        onChange={contacthandleChange}
                      />
                      {errors.address_1 && (
                        <span className="text-danger">{errors.address_1}</span>
                      )}
                      <label for="floatingInput">Street Address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Password"
                        name="address_2"
                        value={contactData.address_2}
                        onChange={contacthandleChange}
                      />
                      {errors.address_2 && (
                        <span className="text-danger">{errors.address_2}</span>
                      )}
                      <label for="floatingInput">Street Address 2</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Password"
                        name="city_name"
                        value={contactData.city_name}
                        onChange={contacthandleChange}
                      />
                      {errors.city_name && (
                        <span className="text-danger">{errors.city_name}</span>
                      )}
                      <label for="floatingInput">City</label>
                    </div>
                    <div className="form-floating mb-3 d-flex">
                      <div className="form-floating mb-3 w-100">
                        <select
                          className="form-control"
                          id="floatingCountry"
                          name="state_id"
                          value={contactData.state_id}
                          onChange={stateIdhandleChange}
                        >
                          <option value=""></option>
                          {stateList.map((item, index) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {errors.state_id && (
                          <span className="text-danger">{errors.state_id}</span>
                        )}
                        <label for="floatingCountry">Select State</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Password"
                          name="pincode"
                          value={contactData.pincode}
                          onChange={contacthandleChange}
                        />
                        {errors.pincode && (
                          <span className="text-danger">{errors.pincode}</span>
                        )}
                        <label for="floatingInput">Pincode</label>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-login text-uppercase fw-bold"
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                    <hr className="my-4" />
                  </form>
                ) : (
                  <form onSubmit={handleSubmitBusiness}>
                    <div className="form-floating mb-3 mt-3">
                      <select
                        className="form-control"
                        id="floatingCountry"
                        name="country_id"
                        placeholder="Select Country"
                        value={businessData.country_id}
                        onChange={countryhandleChangebusiness}
                      >
                        <option value=""></option>
                        {countryList.map((item, index) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {businessErrors.country_id && (
                        <span className="text-danger">
                          {businessErrors.country_id}
                        </span>
                      )}
                      <label for="floatingCountry">Select Country</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name="address_1"
                        value={businessData?.address_1}
                        onChange={businesshandleChange}
                      />
                      {businessErrors.address_1 && (
                        <span className="text-danger">
                          {businessErrors.address_1}
                        </span>
                      )}
                      <label for="floatingInput">Street Address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Password"
                        name="address_2"
                        value={businessData?.address_2}
                        onChange={businesshandleChange}
                      />
                      {businessErrors.address_2 && (
                        <span className="text-danger">
                          {businessErrors.address_2}
                        </span>
                      )}
                      <label for="floatingInput">Street Address 2</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Password"
                        name="city_name"
                        value={businessData?.city_name}
                        onChange={businesshandleChange}
                      />
                      {businessErrors.city_name && (
                        <span className="text-danger">
                          {businessErrors.city_name}
                        </span>
                      )}
                      <label for="floatingInput">City</label>
                    </div>
                    <div className="form-floating mb-3 d-flex">
                      <div className="form-floating  w-100">
                        <select
                          className="form-control"
                          id="floatingCountry"
                          name="state_id"
                          value={businessData?.state_id}
                          onChange={stateIdhandleChangebusiness}
                        >
                          <option value=""></option>
                          {stateList.map((item, index) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {businessErrors.state_id && (
                          <span className="text-danger">
                            {businessErrors.state_id}
                          </span>
                        )}
                        <label for="floatingCountry">Select State</label>
                      </div>
                      <div className="form-floating  ">
                        <input
                          type="number"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Password"
                          name="pincode"
                          value={businessData?.pincode}
                          onChange={businesshandleChange}
                        />
                        {businessErrors.pincode && (
                          <span className="text-danger">
                            {businessErrors.pincode}
                          </span>
                        )}
                        <label for="floatingInput">Pincode</label>
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <PhoneInput
                        country={"in"}
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
                        }}
                      />
                      {businessErrors.mobile_number && (
                        <span className="text-danger">
                          {businessErrors.mobile_number}
                        </span>
                      )}
                    </div>
                    <hr className="my-3" />
                    <div className="d-grid">
                      <p
                        className="text-muted"
                        style={{ fontSize: "15px", fontWeight: "600" }}
                      >
                        Tell us how to contact you We'll use this info to notify
                        you about account activity, or anything else that
                        requires your attention.
                      </p>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Full Name"
                        name="name"
                        value={businessData?.name}
                        onChange={businesshandleChange}
                      />
                      {businessErrors.name && (
                        <span className="text-danger">
                          {businessErrors.name}
                        </span>
                      )}
                      <label for="floatingInput">Full Name</label>
                    </div>
                    <div className="form-floating mb-3 ">
                      <select
                        className="form-control"
                        id="floatingCountry"
                        name="business_relation_type"
                        placeholder="Relationship to the business"
                        value={businessData?.business_relation_type}
                        onChange={handleRelationshipChange}
                      >
                        <option value=""></option>
                        <option value="1">Owner/Guarantor</option>
                        <option value="2">Employee</option>
                        <option value="3">Approved Representative</option>
                      </select>
                      {businessErrors.business_relation_type && (
                        <span className="text-danger">
                          {businessErrors.business_relation_type}
                        </span>
                      )}
                      <label for="floatingCountry">
                        Relationship to the business
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <PhoneInput
                        country={"in"}
                        value={`${countryaddCode}${addressPhone}`}
                        onChange={(value, country) =>
                          handleAddressPhoneChange(value, country)
                        }
                        inputProps={{
                          name: "phone",
                          required: true,
                          autoFocus: true,
                        }}
                        containerStyle={{ width: "100%" }}
                        inputStyle={{
                          width: "100%",
                          paddingLeft: "50px",
                          fontSize: "16px",
                        }}
                      />
                      {businessErrors.address_mobile_number && (
                        <span className="text-danger">
                          {businessErrors.address_mobile_number}
                        </span>
                      )}
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-login text-uppercase fw-bold"
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                    <hr className="my-4" />
                  </form>
                )}
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
export default ContactInfo;
