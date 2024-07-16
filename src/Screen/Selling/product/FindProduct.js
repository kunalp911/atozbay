import React, { useState } from "react";
import logos from "../../../Assets/image/bay.png";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Findmodal from "../../../ShopCategoryComponent/Findmodal";
import ItemDetailmodal from "../../../ShopCategoryComponent/ItemDetailmodal";
import "../selling.css";
const brands = [
  {
    category: "Add custom value",
    items: [ ],
  },
  {
    category: "All results",
    items: ["Nike", "Adidas", "Puma", "Reebok", "Vans"],
  },
];

const colors = [
  {
    category: "Add custom value",
    items: [ ],
  },
  {
    category: "All results",
    items: ["Red", "Blue", "Green"],
  },
];

const FindProduct = () => {
  const navigate = useNavigate();
  const [selectedBrandss, setSelectedBrandss] = useState([]);
  const [selectColors, setSelectColors] = useState([]);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [itemOpen, setItemOpen] = React.useState(false);
 
  const handleOpen = () => {
    setOpen(true);
  }; 
  return (
    <div>
      <ItemDetailmodal itemOpen={itemOpen} setItemOpen={setItemOpen} />
      <Findmodal
        brands={status == "Brand" ? brands : colors}
        title={status == "Brand" ? "Brands" : "Colors"}
        setSelectedBrandss={
          status == "Brand" ? setSelectedBrandss : setSelectColors
        }
        open={open}
        setOpen={setOpen}
      />
      <div className="container col-12 d-flex justify-content-between border-bottom">
        <ArrowBackIosIcon
          onClick={() => navigate("/selling/list-item")}
          style={{ cursor: "pointer", margin: "20px 0px" }}
        />
        <img
          src={logos}
          alt="logo"
          width={125}
          style={{ margin: "20px 0px" }}
          onClick={() => navigate("/")}
        />
        <p></p>
      </div>
      <div className="container" style={{ padding: "10px 40px" }}>
        <div className="row my-4">
          <div className="col-md-4">
            <h4> Find a match</h4>
            <p>Clothing, Shoes & Accessories Men Men's Shoes Athletic Shoes</p>
            <p className="border-top">Add details to sharpen results</p>
            <div className="row">
              <p
                className="col-6 border p-2 finddroptext"
                onClick={() => {
                  handleOpen();
                  setStatus("Brand");
                }}
              >
                Brand :{selectedBrandss}{" "}
                <i className="fa fa-angle-down ml-2"></i>
              </p>
              <p
                className="col-6 border p-2 finddroptext"
                onClick={() => {
                  handleOpen();
                  setStatus("Color");
                }}
              >
                Color :{selectColors} <i className="fa fa-angle-down ml-2"></i>
              </p>
            </div>
            <div className="row">
              <p className="col-6 border p-2 finddroptext">
                Color :{selectedBrandss}{" "}
                <i className="fa fa-angle-down ml-2"></i>
              </p>
              <p className="col-6 border p-2 finddroptext">
                Size :{selectedBrandss}{" "}
                <i className="fa fa-angle-down ml-2"></i>
              </p>
            </div>
            <div className="row">
              <p className="col-6 border p-2 finddroptext">
                Brand :{selectedBrandss}{" "}
                <i className="fa fa-angle-down ml-2"></i>
              </p>
              <p className="col-6 border p-2 finddroptext">
                Size :{selectedBrandss}{" "}
                <i className="fa fa-angle-down ml-2"></i>
              </p>
            </div>
          </div>
          <div
            className="col-md-8 scrollssec"
            style={{ height: "70vh", overflow: "auto" }}
          >
            <p>Top picks from the product library</p>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                m: 2,
              }}
              onClick={() => setItemOpen(true)}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: 150 }, height: "auto" }}
                image="https://i.ebayimg.com/images/g/FtMAAOSwvK1jl6Zg/s-l1600.png"
                alt="Product Image"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "left", md: "left" },
                  ml: { md: 2 },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Brand:</strong> Nike <br />
                  <strong>Shoes Size:</strong> 10 <br />
                  <strong>Style Code:</strong> AV2950-100
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                m: 2,
              }}
              onClick={() => setItemOpen(true)}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: 150 }, height: "auto" }}
                image="https://i.ebayimg.com/00/s/MzYyWDczNw==/z/3LYAAOSwR7Rmb853/$_57.JPG"
                alt="Product Image"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "left", md: "left" },
                  ml: { md: 2 },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Brand:</strong> Nike <br />
                  <strong>Shoes Size:</strong> 10 <br />
                  <strong>Style Code:</strong> AV2950-100
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                m: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: 150 }, height: "auto" }}
                image="https://i.ebayimg.com/images/g/FtMAAOSwvK1jl6Zg/s-l1600.png"
                alt="Product Image"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "left", md: "left" },
                  ml: { md: 2 },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Brand:</strong> Nike <br />
                  <strong>Shoes Size:</strong> 10 <br />
                  <strong>Style Code:</strong> AV2950-100
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                m: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: 150 }, height: "auto" }}
                image="https://i.ebayimg.com/00/s/MzYyWDczNw==/z/3LYAAOSwR7Rmb853/$_57.JPG"
                alt="Product Image"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "left", md: "left" },
                  ml: { md: 2 },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Brand:</strong> Nike <br />
                  <strong>Shoes Size:</strong> 10 <br />
                  <strong>Style Code:</strong> AV2950-100
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                m: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: 150 }, height: "auto" }}
                image="https://i.ebayimg.com/images/g/FtMAAOSwvK1jl6Zg/s-l1600.png"
                alt="Product Image"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "left", md: "left" },
                  ml: { md: 2 },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Brand:</strong> Nike <br />
                  <strong>Shoes Size:</strong> 10 <br />
                  <strong>Style Code:</strong> AV2950-100
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                m: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: 150 }, height: "auto" }}
                image="https://i.ebayimg.com/images/g/FtMAAOSwvK1jl6Zg/s-l1600.png"
                alt="Product Image"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "left", md: "left" },
                  ml: { md: 2 },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Brand:</strong> Nike <br />
                  <strong>Shoes Size:</strong> 10 <br />
                  <strong>Style Code:</strong> AV2950-100
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                m: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: 150 }, height: "auto" }}
                image="https://i.ebayimg.com/images/g/FtMAAOSwvK1jl6Zg/s-l1600.png"
                alt="Product Image"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "left", md: "left" },
                  ml: { md: 2 },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Brand:</strong> Nike <br />
                  <strong>Shoes Size:</strong> 10 <br />
                  <strong>Style Code:</strong> AV2950-100
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                m: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: 150 }, height: "auto" }}
                image="https://i.ebayimg.com/images/g/FtMAAOSwvK1jl6Zg/s-l1600.png"
                alt="Product Image"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "left", md: "left" },
                  ml: { md: 2 },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Brand:</strong> Nike <br />
                  <strong>Shoes Size:</strong> 10 <br />
                  <strong>Style Code:</strong> AV2950-100
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindProduct;
