import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import { Link, json, useNavigate } from "react-router-dom";
import logos from "../../Assets/image/bay.png";
import {
  Badge,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../Network_Call/apiservices";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open = Boolean(anchorEl);
  const opens = Boolean(anchorE2);
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const userData = localStorage.getItem("@userData");
  const data = JSON.parse(userData);

  const Logout = () => {
    localStorage.clear("@userToken");
    handleCloses();
    navigate("/");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleNavigate();
  };
  const handleClicks = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorE2(null);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategorySelect = (id) => {
    setCategoryId(id);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (categoryId !== 0) {
      handleNavigate();
    }
  }, [categoryId]);

  const handleNavigate = () => {
    switch (categoryId) {
      case 1:
        navigate("/livercare", { state: { id: categoryId } });
        break;
      case 2:
        navigate("/babychildcare", { state: { id: categoryId } });
        break;
      case 3:
        navigate("/skincare", { state: { id: categoryId } });
        break;
      default:
        navigate("/");
    }
  };

  const getCategories = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.CategoriesList).then((response) => {
        if (response.success) {
          setCategoriesList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const AccountSetting = () => {
    navigate("/account-setting");
    window.location.reload();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg main-navbar">
        <div className=" ">
          <Link to="/">
            <img src={logos} alt="Logo" className="img-fluid logosshide" />
          </Link>
        </div>
        <p
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </p>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ padding: "0px 40px" }}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <p
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-times" style={{ float: "right" }}></i>
              </p>
              <a
                className="nav-link first-title"
                style={{ paddingRight: "0px" }}
              >
                Hi!
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link first-title"
                id="basic-button"
                aria-controls={opens ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={opens ? "true" : undefined}
                onClick={handleClicks}
                style={{
                  paddingRight: "0px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {data?.name ? data?.name : data?.username}
              </a>
              <Menu
                id="basic-menu"
                anchorEl={anchorE2}
                open={opens}
                onClose={handleCloses}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Grid container spacing={2}>
                  <Grid sx={{ padding: "10px 20px" }}>
                    <MenuItem sx={{ fontWeight: "bold", fontSize: "14px" }}>
                      {data?.username}
                    </MenuItem>
                    <MenuItem
                      sx={{
                        color: "#0064d2",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                      onClick={() => AccountSetting()}
                    >
                      Account settings
                    </MenuItem>
                    <MenuItem
                      sx={{ color: "#0064d2", fontWeight: "bold" }}
                      onClick={Logout}
                    >
                      Logout
                    </MenuItem>
                  </Grid>
                </Grid>
              </Menu>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link first-title"
                style={{ paddingRight: "0px", color: "#0064d2" }}
              >
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link first-title"
                style={{ paddingRight: "0px" }}
              >
                or
              </a>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-link first-title"
                style={{ color: "#0064d2" }}
              >
                register
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link first-title" href="#">
                Daily Deals
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link first-title" href="#">
                Help & Contact
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/selling">
                <a className="nav-link first-titless" href="#">
                  Selling
                </a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link first-titless dropdown-toggle"
                href="#"
                id="dropdownMenu1"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Wathchlist
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <a className="dropdown-item" href="#">
                  Action 1
                </a>
                <a className="dropdown-item" href="#">
                  Action 2
                </a>
                <a className="dropdown-item" href="#">
                  Action 3
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link first-titless dropdown-toggle"
                href="#"
                id="dropdownMenu2"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                My atozbay
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <a className="dropdown-item" href="#">
                  Action 4
                </a>
                <a className="dropdown-item" href="#">
                  Action 5
                </a>
                <a className="dropdown-item" href="#">
                  Action 6
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link first-iconss" href="#">
                <i className="fas fa-bell"></i>
              </a>
            </li>
            <li className="nav-item">
              <Link to={"/add-to-cart"} className="text-dark">
                {/* <a className="nav-link first-icon" href="#"> */}
                  {/* <i className="fas fa-shopping-cart"></i>
                  <span
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "5px",
                      width: "5px",
                      height: "5px",
                    }}
                  >
                    3
                  </span> */}
              <IconButton 
              className="mt-2"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={3} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
                {/* </a> */}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "10px" }}>
        <div className="container mt-3">
          <div className="row align-items-center">
            <div className="col-2 text-center text-lg-left logodiv">
              <Link to="/">
                <img src={logos} alt="Logo" className="img-fluid logo" />
              </Link>
            </div>
            <div className="col shopcategorydrop">
              <a
                className="shopcategorytitle"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Shop by Category
                <i className="fa fa-angle-down ml-2"></i>
              </a>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Grid container spacing={2}>
                  <Grid sx={{ padding: "10px 20px" }}>
                    {categoriesList?.map((category, index) => (
                      <MenuItem
                        onClick={() => handleCategorySelect(category?.id)}
                        sx={{ fontSize: "14px", fontWeight: "bold" }}
                        key={index}
                      >
                        {category?.category_name}
                      </MenuItem>
                    ))}
                  </Grid>
                </Grid>
              </Menu>
            </div>
            <div className="col-8 second-header">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for anything"
                  aria-label="Search"
                />
                <div class="input-group-append search-drop">
                  <select class="form-control category-select">
                    <option>All Categories</option>
                    <option>Books</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                  </select>
                </div>
                <div className="input-group-append">
                  <button className="btn" type="button">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
