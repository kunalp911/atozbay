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
import { Link } from "react-router-dom";

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

const sidebarItems = [
  { text: "Personal information" },
  { text: "Sign-in and security" },
  // { text: "Addresses" },
  { text: "Feedback" },
  { text: "Payment Information" },
  { text: "Account Preferences" },
  { text: "Selling" },
];

const PersonalInfo = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState(null);
  const inputFile = useRef(null);
  const [load, setload] = useState(false);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("Personal information");
  const [showPassword, setShowPassword] = React.useState(false);
  const [contactData, setContactData] = useState();
  const [countryList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]); 
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const [contactUpdateData, setContactUpdateData] = useState({
    country_id: "",
    city_name: "",
    address_1: "",
    address_2: "",
    state_id: "",
    pincode: "",
  });

  useEffect(() => {
    if (file) {
      updateProfileImg();
    }
  }, [file]);
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
    if (userData && userData.name) {
      setUserName(userData.name);
    }
  }, [userData]);

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

  useEffect(() => {
    getUserInfo();
    getContactInfo();
    getCountries();
  }, []);

  const handlesideClick = (text) => {
    if (text === "Personal information") {
      setType(text);
    }
    if (text === "Sign-in and security") {
      setType(text);
    }
  };
 
  const handleChangess = async(event) => {
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
  return (
    <div>
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <div className="container mt-2 mb-3">
        <Container maxWidth="lg">
          <h4>My atozbay</h4>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Paper>
                <List className="list-groupss">
                  {sidebarItems.map((item, index) => (
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
                          {userData?.username}
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
                          {userData?.user_type}
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
                          {userData?.email}
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
                          {userData?.name}
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
                          {contactUpdateData?.address_1} (
                          {contactUpdateData?.pincode})
                        </Typography>
                      </Grid>
                      <Link color="primary" onClick={() => setType("Edit")}>
                        Edit
                      </Link>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
            {type == "Sign-in and security" && (
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
                            <label for="floatingPassword">
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
                            <label for="floatingPassword">New Password</label>
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
                            <label for="floatingPassword">
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
            {/* {type == "Editss" && (
              <Grid item xs={12} md={9}>
                <Paper>
                  <Box className="p-3">
                    <Grid>
                      <Typography variant="h6">Personal Info</Typography>
                    </Grid>
                    <Box>
                      <form>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingPassword1"
                                name="fullname"
                                placeholder="Fullname"
                              />
                              <label htmlFor="floatingPassword1">
                                Fullname
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <select
                                className="form-control"
                                id="floatingCountry"
                                name="country_id"
                                placeholder="Select Country"
                              >
                                <option value=""></option>
                                <option value="1">India</option>
                                <option value="2">USA</option>
                                <option value="3">UK</option>
                              </select>
                              <label htmlFor="floatingCountry">
                                Select Country
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingPassword3"
                                placeholder="city"
                              />
                              <label htmlFor="floatingPassword3">City</label>
                            </div>
                            <div className="form-floating ">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingPassword3"
                                placeholder="Street Address"
                              />
                              <label htmlFor="floatingPassword3">
                                Street Address
                              </label>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingPassword4"
                                placeholder="Street Address"
                              />
                              <label htmlFor="floatingPassword4">
                                Street Address 2
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <select
                                className="form-control"
                                id="floatingstate"
                                placeholder="Select State"
                              >
                                <option value=""></option>
                                <option value="1">India</option>
                                <option value="2">USA</option>
                                <option value="3">UK</option>
                              </select>
                              <label htmlFor="floatingCountry">
                                Select State
                              </label>
                            </div>
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="floatingPassword6"
                                placeholder="pincode"
                              />
                              <label htmlFor="floatingPassword6">Pincode</label>
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
                                    variant="contained"
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
                                    variant="contained"
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
            )} */}
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
