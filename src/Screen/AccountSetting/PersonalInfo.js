import React, { useEffect, useRef, useState } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  List,
  makeStyles,
} from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../Network_Call/apiservices";
import { Button, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "./accountsetting.css";
import { Link, useNavigate } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import OTPInput from "react-otp-input";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    [theme.breakpoints.up("md")]: {
      width: "25%",
    },
  },
  content: {
    [theme.breakpoints.up("md")]: {
      width: "75%",
    },
  },
  section: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const customersidebarItems = [
  { text: "Personal information" },
  { text: "Sign-in and security" },
  { text: "Address" },
  // { text: "Feedback" },
  { text: "Payment Information" },
  { text: "Account Preferences" },
  { text: "Selling" },
];
const businesssidebarItems = [
  { text: "Business info" },
  { text: "Sign-in and security" },
  { text: "Address" },
  // { text: "Feedback" },
  { text: "Payment Information" },
  { text: "Account Preferences" },
  { text: "Selling" },
];

const PersonalInfo = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userDatas = localStorage.getItem("@userData");
  const data = JSON.parse(userDatas);
  const [userData, setUserData] = useState({});
  const [businessUserData, setBusinessUserData] = useState({});
  const [file, setFile] = useState(null);
  const inputFile = useRef(null);
  const [load, setload] = useState(false);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState(
    data.user_type === "Customer" ? "Personal information" : ""
  );
  const [busiType, setBusiType] = useState(
    data.user_type === "Customer" ? "" : "Business info"
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const [contactData, setContactData] = useState();
  const [businessData, setBusinessData] = useState();
  const [countryList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [shipAddress, setShipAddress] = useState();
  const [shipAddList, setShipAddList] = useState([]);
  const [addId, setAddId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyShow, setVerifyShow] = useState(false);
  const [otpShow, setOtpShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [contactUpdateData, setContactUpdateData] = useState({
    country_id: "",
    city_name: "",
    address_1: "",
    address_2: "",
    state_id: "",
    pincode: "",
  });
  const [businessUpdateData, setBusinessUpdateData] = useState({
    name: "",
    address_1: "",
    address_2: "",
    city_name: "",
    pincode: "",
    address_country_code: "",
    address_mobile_number: "",
    business_relation_type: "",
  });
  const [addShipAddress, setAddShipAddress] = useState({
    country_id: "",
    city_name: "",
    address_1: "",
    address_2: "",
    state_id: "",
    pincode: "",
    address_type: "",
  });
  // console.log("shipAddList", shipAddList,">>>>>>>>>>>>>>",addId);
  useEffect(() => {
    if (file) {
      updateProfileImg();
    }
  }, [file]);

  useEffect(() => {
    if (userData?.email) {
      setVerifyEmail(userData.email);
    }
  }, [userData]);

  useEffect(() => {
    if (contactData) {
      setContactUpdateData({
        country_id: contactData.country_id || "",
        city_name: contactData.city_name || "",
        address_1: contactData.address_1 || "",
        address_2: contactData.address_2 || "",
        state_id: contactData.state_id || "",
        pincode: contactData.pincode || "",
      });
      if (contactData.country_id) {
        getStates(contactData.country_id);
      }
    }
  }, [contactData]);

  useEffect(() => {
    if (businessData) {
      setBusinessUpdateData({
        name: businessData.name || "",
        country_id: businessData.country_id || "",
        city_name: businessData.city_name || "",
        address_1: businessData.address_1 || "",
        address_2: businessData.address_2 || "",
        state_id: businessData.state_id || "",
        pincode: businessData.pincode || "",
        country_code: businessData.country_code || "",
        mobile_number: businessData.mobile_number || "",
        address_country_code: businessData.user_country_code || "",
        address_mobile_number: businessData.user_mobile_number || "0",
        business_relation_type: businessData.business_relation_type || "",
      });
      if (businessData.country_id) {
        getStates(businessData.country_id);
      }
    }
  }, [businessData]);

  useEffect(() => {
    if (userData?.name) {
      setUserName(userData.name);
    }
  }, [userData]);

  useEffect(() => {
    getUserInfo();
    getContactInfo();
    getCountries();
    getBusinessContactInfo();
    getBusinessInfo();
    getShipAddress();
    getShipAddressList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactUpdateData({
      ...contactUpdateData,
      [name]: value,
    });
    if (name === "country_id") {
      getStates(value);
    }
  };

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusinessUpdateData({
      ...businessUpdateData,
      [name]: value,
    });
    if (name === "country_id") {
      getStates(value);
    }
  };

  const handleAddAddressChange = (e) => {
    const { name, value } = e.target;
    setAddShipAddress({
      ...addShipAddress,
      [name]: value,
    });
    if (name === "country_id") {
      getStates(value);
    }
  };

  const handlesideClick = (text) => {
    if (text === "Personal information") {
      setType(text);
    }
    if (text === "Sign-in and security") {
      setType(text);
    }
    if (text === "Address") {
      setType(text);
    }
    if (text === "Selling") {
      navigate("/selling");
    }
  };

  const handleBusiClick = (text) => {
    if (text === "Business info") {
      setBusiType(text);
    }
    if (text === "Sign-in and security") {
      setBusiType(text);
    }
    if (text === "Address") {
      setBusiType(text);
    }
  };

  const handleChangess = async (event) => {
    const { files } = event.target;
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.CustomerProfile
      );
      setload(true);
      if (response.success) {
        setUserData(response.result);
        setImageUrl(response.result.profile_image);
        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };
  const getBusinessInfo = async () => {
    try {
      const response = await apiCallNew("get", {}, ApiEndPoints.SellerProfile);
      setload(true);
      if (response.success) {
        setBusinessUserData(response.result);
        setImageUrl(response.result.profile_image);
        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const updateProfileImg = async () => {
    const formData = new FormData();
    formData.append("profile_image", file);
    try {
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.UpdateProfileImage
      );
      if (response.success) {
        getUserInfo();
        toast.success(response.msg);
      } else {
        toast.error(response.result.profile_image[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // *******change Password********
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      const valid = {
        password: password,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      const payload = {
        current_password: password,
        new_password: newPassword,
      };
      await validationSchema.validate(valid, { abortEarly: false });
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ChangePassword
      );
      if (response.success === true) {
        setload(false);
        toast.success(response.msg);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setload(false);
        toast.error(response.msg);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  // ***************business api********************
  const getContactInfo = async () => {
    try {
      const response = await apiCallNew("get", {}, ApiEndPoints.GetContactInfo);
      setload(true);
      if (response.success) {
        setContactData(response.result);
        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const getBusinessContactInfo = async () => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.GetBusinessInfo
      );
      setload(true);
      if (response.success) {
        setBusinessData(response.result);
        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
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

  const handleContactUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCallNew(
        "post",
        contactUpdateData,
        ApiEndPoints.ContactInfo
      );
      if (response.success) {
        handleUpdateCustomer(e);
        getContactInfo();
        getUserInfo();
        toast.success(response.msg);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBusinessUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCallNew(
        "post",
        businessUpdateData,
        ApiEndPoints.UpdateBusinessContactInfo
      );
      if (response.success) {
        handleUpdateCustomer(e);
        getBusinessContactInfo();
        getBusinessInfo();
        getUserInfo();
        toast.success(response.msg);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    const payload = {
      name: userName,
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.UpdateCustomerProfile
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // **************shiping api***************
  const getShipAddress = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.GetAddress).then((response) => {
        if (response.success) {
          setShipAddress(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getShipAddressList = () => {
    try {
      apiCallNew("post", {}, ApiEndPoints.ShipAddressList).then((response) => {
        if (response.success) {
          setShipAddList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShipAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCallNew(
        "post",
        addShipAddress,
        ApiEndPoints.AddAddress
      );
      if (response.success) {
        toast.success(response.msg);
        getShipAddressList();
        setAddShipAddress({});
        if (data?.user_type === "Customer") {
          setType("Address");
        } else {
          setBusiType("Address");
        }
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleShipAddUpdate = async (addId) => {
    try {
      const response = await apiCallNew(
        "post",
        addShipAddress,
        ApiEndPoints.UpdateAddress + addId
      );
      if (response.success) {
        toast.success(response.msg);
        getShipAddressList();
        setAddShipAddress({});
        if (data?.user_type === "Customer") {
          setType("Address");
        } else {
          setBusiType("Address");
        }
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setIsOpen(true);
    setAddShipAddress({
      country_id: item.country_id,
      state_id: item.state_id,
      city_name: item.city_name,
      address_1: item.address_1,
      address_2: item.address_2,
      address_type: item.address_type,
      pincode: item.pincode,
    });
    setAddId(item.id);
    if (data?.user_type === "Customer") {
      setType("addressEdit");
    } else {
      setBusiType("addressEdit");
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: verifyEmail,
      };
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.SendOTPEmail
      );
      if (response.success === true) {
        setOtpShow(true);
        setVerifyShow(false);
        toast.success(response.msg);
        setload(false);
      } else {
        setload(false);
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: verifyEmail,
        otp: otp,
      };
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.VerifyEmailOTP
      );
      if (response.success === true) {
        setOtpShow(false);
        toast.success(response.msg);
        setload(false);
      } else {
        setload(false);
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };
  return (
    <div>
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <div className="container mt-2 mb-3">
        <Container maxWidth="lg" className="p-0">
          <h4>My atozbay</h4>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Paper>
                <List className="list-groupss">
                  {data.user_type === "Customer"
                    ? customersidebarItems.map((item, index) => (
                        <li
                          className={
                            type === item.text
                              ? "list-group-itemsss"
                              : "list-group-itemss"
                          }
                          key={index}
                          onClick={() => handlesideClick(item.text)}
                        >
                          {item.text}
                        </li>
                      ))
                    : businesssidebarItems.map((item, index) => (
                        <li
                          className={
                            busiType === item.text
                              ? "list-group-itemsss"
                              : "list-group-itemss"
                          }
                          key={index}
                          onClick={() => handleBusiClick(item.text)}
                        >
                          {item.text}
                        </li>
                      ))}
                </List>
              </Paper>
            </Grid>
            {type == "Personal information" && (
              <Grid item xs={12} md={9} className={classes.content}>
                <Paper>
                  <Box>
                    <Grid className={classes.section}>
                      <Typography variant="h6">Personal info</Typography>
                      <Grid>
                        {!contactData?.country_id && (
                          <Link to={"/contact-info"}>
                            <button className="btn btn-sm save-btn">
                              Add Info
                            </button>
                          </Link>
                        )}
                      </Grid>
                    </Grid>
                    <Box
                      className={classes.section}
                      xs={3}
                      md={3}
                      style={{ backgroundColor: "#e7e6e6" }}
                    >
                      <Grid
                        container
                        alignItems="center"
                        style={{
                          position: "relative",
                          width: "180px",
                          height: "180px",
                        }}
                      >
                        <img
                          src={imageUrl || "default-image-path"}
                          alt=""
                          width={"100%"}
                          height={"100%"}
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            backgroundColor: "#fff",
                          }}
                        />
                        <EditIcon
                          onClick={() => inputFile.current.click()}
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            cursor: "pointer",
                            background: "white",
                            borderRadius: "50%",
                          }}
                        />
                      </Grid>
                      <input
                        type="file"
                        onChange={handleChangess}
                        ref={inputFile}
                        hidden
                      />
                    </Box>
                    <Box className={classes.section} xs={3} md={3}>
                      <Grid>
                        <Typography variant="body1">Username</Typography>
                        <Typography
                          className="usernamess"
                          variant="body2"
                          style={{ fontWeight: "bold" }}
                        >
                          {userData?.username}
                        </Typography>
                      </Grid>
                    </Box>
                    {/* <Box className={classes.section} xs={3} md={3}>
                      <Grid>
                        <Typography variant="body1">Account type</Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {userData?.user_type}
                        </Typography>
                      </Grid>
                    </Box> */}

                    <Box className={classes.section}>
                      <Grid>
                        <Typography variant="body1">Contact info</Typography>
                        <Typography variant="body2">Email address</Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {userData?.email}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Link onClick={() => setVerifyShow(true)}>
                          <u>Verify</u>
                        </Link>
                        <Link className="ms-4">
                          <u>Edit</u>
                        </Link>
                      </Grid>
                    </Box>
                    {verifyShow && (
                      <Box className="ms-2">
                        <Form
                          action="javascript:void(0);"
                          onSubmit={handleVerifyEmail}
                        >
                          <Col md={6} className="mb-2">
                            <Form.Group controlId="email">
                              <Form.Control
                                type="text"
                                placeholder="Email address"
                                value={verifyEmail}
                                onChange={(e) => setVerifyEmail(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Row className="mb-2">
                            <Col md={3}>
                              <button
                                className="btn mt-2 addcancelbtn"
                                onClick={() => setVerifyShow(false)}
                              >
                                Cancel
                              </button>
                            </Col>
                            <Col md={3}>
                              <button className="btn mt-2 addsavebtn">
                                Save
                              </button>
                            </Col>
                          </Row>
                        </Form>
                      </Box>
                    )}
                    {otpShow && (
                      <Box className="ms-2">
                        <Form
                          action="javascript:void(0);"
                          onSubmit={handleVerifyOtp}
                        >
                          <Col md={6} className="mb-2">
                            <OTPInput
                              value={otp}
                              onChange={setOtp}
                              numInputs={6}
                              renderSeparator={
                                <span className="otp-separator">-</span>
                              }
                              renderInput={(props) => (
                                <input {...props} className="otp-input" />
                              )}
                            />
                          </Col>
                          <Row className="mb-2">
                            <Col md={3}>
                              <button
                                className="btn mt-2 addcancelbtn"
                                onClick={() => setOtpShow(false)}
                              >
                                Cancel
                              </button>
                            </Col>
                            <Col md={3}>
                              <button className="btn mt-2 addsavebtn">
                                Save
                              </button>
                            </Col>
                          </Row>
                        </Form>
                      </Box>
                    )}
                    <Box className={classes.section}>
                      <Grid>
                        <Typography variant="body1">Phone number</Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {userData?.mobile_number}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box className={classes.section}>
                      <Grid>
                        <Typography variant="body1">
                          Personal info (Owner name, address)
                        </Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {contactUpdateData?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {contactUpdateData?.address_1},
                        </Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {contactUpdateData?.city_name} (
                          {contactUpdateData?.pincode})
                        </Typography>
                      </Grid>
                      <Link color="primary" onClick={() => setType("Edit")}>
                        <u>Edit</u>
                      </Link>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
            {busiType == "Business info" && (
              <Grid item xs={12} md={9} className={classes.content}>
                <Paper>
                  <Box>
                    <Grid className={classes.section}>
                      <Typography variant="h6">Business info</Typography>
                      <Grid>
                        {!contactData?.country_id && (
                          <Link to={"/contact-info"}>
                            <button className="btn btn-sm save-btn">
                              Add Info
                            </button>
                          </Link>
                        )}
                      </Grid>
                    </Grid>
                    <Box
                      className={classes.section}
                      xs={3}
                      md={3}
                      style={{ backgroundColor: "#e7e6e6" }}
                    >
                      <Grid
                        container
                        alignItems="center"
                        style={{
                          position: "relative",
                          width: "180px",
                          height: "180px",
                        }}
                      >
                        <img
                          src={imageUrl || "default-image-path"}
                          alt="profile"
                          width={"100%"}
                          height={"100%"}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                        <EditIcon
                          onClick={() => inputFile.current.click()}
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            cursor: "pointer",
                            background: "white",
                            borderRadius: "50%",
                          }}
                        />
                      </Grid>
                      <input
                        type="file"
                        onChange={handleChangess}
                        ref={inputFile}
                        hidden
                      />
                    </Box>
                    <Box className={classes.section} xs={3} md={3}>
                      <Grid>
                        <Typography variant="body1">Username</Typography>
                        <Typography
                          className="usernamess"
                          variant="body2"
                          style={{ fontWeight: "bold" }}
                        >
                          {businessUserData?.username}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box className={classes.section} xs={3} md={3}>
                      <Grid>
                        <Typography variant="body1">Account type</Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {businessUserData?.user_type}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box className={classes.section}>
                      <Grid>
                        <Typography variant="body1">Contact info</Typography>
                        <Typography variant="body2">Email address</Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {businessUserData?.email}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box className={classes.section}>
                      <Grid>
                        <Typography variant="body1">Phone number</Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {businessUserData?.mobile_number}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box className={classes.section}>
                      <Grid>
                        <Typography variant="body1">
                          Personal info (Owner name, address)
                        </Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {businessData?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {businessData?.address_1},
                        </Typography>
                        <Typography
                          variant="body2"
                          className="usernamess"
                          style={{ fontWeight: "bold" }}
                        >
                          {businessData?.address_1} ({businessData?.pincode})
                        </Typography>
                      </Grid>
                      <Link color="primary" onClick={() => setBusiType("Edit")}>
                        Edit
                      </Link>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
            {(type === "Sign-in and security" ||
              busiType === "Sign-in and security") && (
              <Grid item xs={12} md={9} className={classes.content}>
                <Paper>
                  <Box>
                    <Grid className={classes.section}>
                      <Typography variant="h6">Sign in and security</Typography>
                    </Grid>
                    <Typography variant="body1" className="ml-3">
                      Password
                    </Typography>
                    <Box className={classes.section} xs={3} md={3}>
                      <Grid></Grid>
                      <Grid>
                        <Typography variant="body1">
                          Create a password or modify your existing one.
                        </Typography>
                        <form className="mt-3" onSubmit={handleChangePassword}>
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
                              <div className="text-danger">
                                {errors.password}
                              </div>
                            )}
                            <label htmlFor="floatingPassword">
                              Current Password
                            </label>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="floatingPassword"
                              placeholder="Password"
                              name="newpassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
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
                            {errors.newPassword && (
                              <div className="text-danger">
                                {errors.newPassword}
                              </div>
                            )}
                            <label htmlFor="floatingPassword">
                              New Password
                            </label>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              id="floatingPassword"
                              placeholder="Password"
                              name="confirmpassword"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                            {errors.confirmPassword && (
                              <div className="text-danger">
                                {errors.confirmPassword}
                              </div>
                            )}
                            <label htmlFor="floatingPassword">
                              Confirm Password
                            </label>
                          </div>
                          <div className="d-grid">
                            <button
                              className="btn btn-login text-uppercase fw-bold"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </Grid>
                      <Grid></Grid>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
            {type == "Edit" && (
              <Grid item xs={12} md={9}>
                <Paper>
                  <Box className="p-3">
                    <Grid>
                      <Typography variant="h6">Personal info</Typography>
                    </Grid>
                    <Box>
                      <form onSubmit={handleContactUpdate}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingCity"
                                placeholder="User Name"
                                name="name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                              />
                              <label htmlFor="floatingCity">User Name</label>
                            </div>
                            <div className="form-floating mb-3">
                              <select
                                className="form-control"
                                id="floatingCountry"
                                name="country_id"
                                defaultValue={contactUpdateData.country_id}
                                value={contactUpdateData.country_id}
                                onChange={handleChange}
                              >
                                <option value="">Select Country</option>
                                {countryList.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="floatingCountry">
                                Select Country
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingCity"
                                placeholder="City"
                                name="city_name"
                                defaultValue={contactUpdateData.city_name}
                                value={contactUpdateData.city_name}
                                onChange={handleChange}
                              />
                              <label htmlFor="floatingCity">City</label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingAddress1"
                                placeholder="Street Address"
                                name="address_1"
                                value={contactUpdateData.address_1}
                                onChange={handleChange}
                              />
                              <label htmlFor="floatingAddress1">
                                Street Address
                              </label>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingAddress2"
                                placeholder="Street Address 2"
                                name="address_2"
                                value={contactUpdateData.address_2}
                                onChange={handleChange}
                              />
                              <label htmlFor="floatingAddress2">
                                Street Address 2
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <select
                                className="form-control"
                                id="floatingState"
                                name="state_id"
                                value={contactUpdateData.state_id}
                                onChange={handleChange}
                              >
                                <option value="">Select State</option>
                                {stateList.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="floatingState">
                                Select State
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="floatingPincode"
                                placeholder="Pincode"
                                name="pincode"
                                value={contactUpdateData.pincode}
                                onChange={handleChange}
                              />
                              <label htmlFor="floatingPincode">Pincode</label>
                            </div>
                            <div className="d-grid mt-4">
                              <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                              >
                                <Grid item>
                                  <button
                                    className="btn text-uppercase fw-bold cancel-btn"
                                    type="button"
                                    onClick={() =>
                                      setType("Personal information")
                                    }
                                  >
                                    Cancel
                                  </button>
                                </Grid>
                                <Grid item>
                                  <button
                                    className="btn text-uppercase fw-bold save-btn"
                                    type="submit"
                                  >
                                    Save
                                  </button>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        </Grid>
                      </form>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
            {busiType == "Edit" && (
              <Grid item xs={12} md={9}>
                <Paper>
                  <Box className="p-3">
                    <Grid>
                      <Typography variant="h6">Business info</Typography>
                    </Grid>
                    <Box>
                      <form onSubmit={handleBusinessUpdate}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingCity"
                                placeholder="User Name"
                                name="name"
                                defaultValue={businessUpdateData.name}
                                value={businessUpdateData.name}
                                onChange={handleBusinessChange}
                              />
                              <label htmlFor="floatingCity">User Name</label>
                            </div>
                            <div className="form-floating mb-3">
                              <select
                                className="form-control"
                                id="floatingCountry"
                                name="country_id"
                                defaultValue={businessUpdateData.country_id}
                                value={businessUpdateData.country_id}
                                onChange={handleBusinessChange}
                              >
                                <option value="">Select Country</option>
                                {countryList.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="floatingCountry">
                                Select Country
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingCity"
                                placeholder="City"
                                name="city_name"
                                defaultValue={businessUpdateData.city_name}
                                value={businessUpdateData.city_name}
                                onChange={handleBusinessChange}
                              />
                              <label htmlFor="floatingCity">City</label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingAddress1"
                                placeholder="Street Address"
                                name="address_1"
                                value={businessUpdateData.address_1}
                                onChange={handleBusinessChange}
                              />
                              <label htmlFor="floatingAddress1">
                                Street Address
                              </label>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingAddress2"
                                placeholder="Street Address 2"
                                name="address_2"
                                value={businessUpdateData.address_2}
                                onChange={handleBusinessChange}
                              />
                              <label htmlFor="floatingAddress2">
                                Street Address 2
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <select
                                className="form-control"
                                id="floatingState"
                                name="state_id"
                                value={businessUpdateData.state_id}
                                onChange={handleBusinessChange}
                              >
                                <option value="">Select State</option>
                                {stateList.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="floatingState">
                                Select State
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="floatingPincode"
                                placeholder="Pincode"
                                name="pincode"
                                value={businessUpdateData.pincode}
                                onChange={handleBusinessChange}
                              />
                              <label htmlFor="floatingPincode">Pincode</label>
                            </div>
                            <div className="d-grid mt-4">
                              <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                              >
                                <Grid item>
                                  <button
                                    className="btn text-uppercase fw-bold cancel-btn"
                                    type="button"
                                    onClick={() => setBusiType("Business info")}
                                  >
                                    Cancel
                                  </button>
                                </Grid>
                                <Grid item>
                                  <button
                                    className="btn text-uppercase fw-bold save-btn"
                                    type="submit"
                                  >
                                    Save
                                  </button>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        </Grid>
                      </form>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
            {(busiType == "Address" || type == "Address") && (
              <Grid item xs={12} md={9}>
                <Paper>
                  <Box className="p-3">
                    <Grid item className="d-flex justify-content-between">
                      <Typography variant="h6">Addresses</Typography>
                      <button
                        className="btn ship-btn"
                        onClick={() => {
                          data?.user_type === "Customer"
                            ? setType("addressEdit")
                            : setBusiType("addressEdit");
                        }}
                      >
                        Add new
                      </button>
                    </Grid>
                    <p className="shipping-titless">Shipping address</p>
                    <Box className="p-3 mt-2 mb-2">
                      <Grid container spacing={3}>
                        {shipAddList?.map((item, index) => (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            sm={12}
                            className="d-flex border-top border-bottom justify-content-between"
                            key={item.id}
                          >
                            <div className="form-floating mb-3">
                              <p className="shipping-title">{item.address_1}</p>
                              <p className="shipping-para">
                                {item.address_2}, {item.city_name}, (
                                {item.pincode})
                              </p>
                              <p className="shipping-para">{item.country_id}</p>
                            </div>
                            <div className="form-floating mb-3">
                              <button
                                className="btn ship-btn"
                                onClick={() => handleEdit(item)}
                              >
                                Edit
                              </button>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
            {(busiType == "addressEdit" || type == "addressEdit") && (
              <Grid item xs={12} md={9}>
                <Paper>
                  <Box className="p-3">
                    <Grid>
                      <Typography variant="h6">Add Addresses</Typography>
                    </Grid>
                    <Box>
                      <form action="javascript:void(0);">
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className="form-floating mb-3">
                              <select
                                className="form-control"
                                id="floatingCountry"
                                name="country_id"
                                value={addShipAddress.country_id}
                                onChange={handleAddAddressChange}
                              >
                                <option value="">Select Country</option>
                                {countryList.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="floatingCountry">
                                Select Country
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <select
                                className="form-control"
                                id="floatingState"
                                name="state_id"
                                value={addShipAddress.state_id}
                                onChange={handleAddAddressChange}
                              >
                                <option value="">Select State</option>
                                {stateList.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="floatingState">
                                Select State
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingCity"
                                placeholder="City"
                                name="city_name"
                                value={addShipAddress.city_name}
                                onChange={handleAddAddressChange}
                              />
                              <label htmlFor="floatingCity">City</label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingAddress1"
                                placeholder="Street Address"
                                name="address_1"
                                value={addShipAddress.address_1}
                                onChange={handleAddAddressChange}
                              />
                              <label htmlFor="floatingAddress1">
                                Street Address
                              </label>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingAddress2"
                                placeholder="Street Address 2"
                                name="address_2"
                                value={addShipAddress.address_2}
                                onChange={handleAddAddressChange}
                              />
                              <label htmlFor="floatingAddress2">
                                Street Address 2
                              </label>
                            </div>

                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingCity"
                                placeholder="Address Type"
                                name="address_type"
                                value={addShipAddress.address_type}
                                onChange={handleAddAddressChange}
                              />
                              <label htmlFor="floatingCity">Address Type</label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="floatingPincode"
                                placeholder="Pincode"
                                name="pincode"
                                value={addShipAddress.pincode}
                                onChange={handleAddAddressChange}
                              />
                              <label htmlFor="floatingPincode">Pincode</label>
                            </div>
                            <div className="d-grid mt-4">
                              <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                              >
                                <Grid item>
                                  <button
                                    className="btn text-uppercase fw-bold cancel-btn"
                                    type="button"
                                    onClick={() => {
                                      data?.user_type === "Customer"
                                        ? setType("Address")
                                        : setBusiType("Address");
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </Grid>
                                <Grid item>
                                  {isOpen ? (
                                    <button
                                      className="btn text-uppercase fw-bold save-btn"
                                      type="submit"
                                      onClick={() => handleShipAddUpdate(addId)}
                                    >
                                      Update
                                    </button>
                                  ) : (
                                    <button
                                      className="btn text-uppercase fw-bold save-btn"
                                      type="submit"
                                      onClick={handleShipAddSubmit}
                                    >
                                      Save
                                    </button>
                                  )}
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        </Grid>
                      </form>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </div>
      <Footer />
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

export default PersonalInfo;
