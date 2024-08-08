import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import logos from "../../Assets/image/bay.png";
import { Badge, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../Network_Call/apiservices";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/AuthContext";
import { ListGroup } from "react-bootstrap";
import { getToken } from "../../Helper/Storage";

const Header = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open = Boolean(anchorEl);
  const opens = Boolean(anchorE2);
  const [categoriesList, setCategoriesList] = useState([]);
  const userData = localStorage.getItem("@userData");
  const data = JSON.parse(userData);
  const firstChars = data?.email?.substring(0, 6);
  const { cartCount, updateCartCount } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    updateCartCount();
  }, [updateCartCount]);

  const Logout = () => {
    localStorage.clear("@userToken");
    handleCloses();
    navigate("/");
    updateCartCount("");
    window.location.reload();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const handleMenuItemClick = (category) => {
    navigate(`/category/${category.id}`, {
      state: {
        category: category,
      },
    });
    handleClose();
    setSelectedCategoryId(category.id);
  };

  const handleCategorySelect = (event) => {
    const selectedId = event.target.value;
    setSelectedCategoryId(selectedId);
  };

  const handleSearchClick = () => {
    if (selectedCategoryId) {
      const selectedCategory = categoriesList.find(
        (cat) => cat.id == selectedCategoryId
      );
      navigate(`/category/${selectedCategoryId}`, {
        state: {
          category: selectedCategory,
        },
      });
    } else {
      navigate("/category/all");
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
          <ul className="navbar-nav mr-auto border-top">
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
                {firstChars}
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
                      {firstChars}
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
            {!token && (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link first-title"
                  style={{ paddingRight: "0px", color: "#0064d2" }}
                >
                  Sign in
                </Link>
              </li>
            )}
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
          <ul className="navbar-nav border-bottom">
            <li className="nav-item">
              <Link to="/selling">
                <a className="nav-link first-titless" href="#">
                  Selling
                </a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/watch-list">
                <a className="nav-link first-titless " href="#">
                  Watchlist
                </a>
              </Link>
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
                <ListGroup variant="flush" className="pt-0 pb-2 ms-3">
                  <Link to="/summary" className="text-decoration-none">
                    <ListGroup.Item className="fw-bold">Summary</ListGroup.Item>
                  </Link>
                  <ListGroup.Item className="fw-bold">
                    Recently viewed
                  </ListGroup.Item>
                  <Link to="/bids-offers" className="text-decoration-none">
                    <ListGroup.Item className="fw-bold">
                      Bids & offers
                    </ListGroup.Item>
                  </Link>
                  <Link to="/watch-list" className="text-decoration-none">
                    <ListGroup.Item className="fw-bold">
                      Watchlist
                    </ListGroup.Item>
                  </Link>
                  <Link to="/purchase" className="text-decoration-none">
                    <ListGroup.Item className="fw-bold">
                      Purchases
                    </ListGroup.Item>
                  </Link>
                  <Link to="/selling/overview" className="text-decoration-none">
                    <ListGroup.Item className="fw-bold">Selling</ListGroup.Item>
                  </Link>
                  <Link to="/all-product" className="text-decoration-none">
                    <ListGroup.Item className="fw-bold">
                      Bidding History
                    </ListGroup.Item>
                  </Link>
                </ListGroup>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link first-iconss" href="#">
                <i className="fas fa-bell"></i>
              </a>
            </li>
            <li className="nav-item nav-icon-cart">
              <Link to={"/add-to-cart"} className="text-dark">
                <IconButton
                  className="mt-2"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "10px" }}>
        <div className="container mt-3">
          <div className="row align-items-center">
            <div
              className="col-2 text-center text-lg-left logodiv"
              style={{ marginRight: "10px" }}
            >
              <Link to="/">
                <img src={logos} alt="Logo" className="img-fluid logo" />
              </Link>
            </div>
            <div className="col shopcategorydrop p-1">
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
                        onClick={() => handleMenuItemClick(category)}
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
            <div className="col-8 second-header ">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search for anything"
                  aria-label="Search"
                />
                <div className="input-group-append search-drop">
                  <select
                    className="form-control category-select"
                    value={selectedCategoryId}
                    onChange={handleCategorySelect}
                  >
                    <option>All Categories</option>
                    {categoriesList?.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group-append">
                  <button
                    className="btn"
                    type="button"
                    onClick={handleSearchClick}
                  >
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
