import React, { useEffect, useState } from "react";
import logos from "../../../Assets/image/bay.png";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Findmodal from "../../../ShopCategoryComponent/Findmodal";
import ItemDetailmodal from "../../../ShopCategoryComponent/ItemDetailmodal";
import "../selling.css";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";

const FindProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ids = location.state?.cateId;
  const [itemOpen, setItemOpen] = React.useState(false);
  const [attributesList, setAttributesList] = useState([]);
  const [attributesValueList, setAttributesValueList] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [shopProductLists, setShopProductLists] = React.useState([]);
  const [load, setload] = useState(false);
  const [proId, setProId] = useState(null);
  useEffect(() => {
    getAttributesList(ids);
    getShopProductList();
  }, []);

  useEffect(() => {
    attributesList?.forEach((item) => {
      getAttributesValueList(item.id);
    });
  }, [attributesList]);

  const handleAttributeChange = (event, attributeId) => {
    const { value } = event.target;
    setSelectedAttributes((prevState) => ({
      ...prevState,
      [attributeId]: value,
    }));
    getAttributesValueList(attributeId);
  };

  // const handleAttributeFocus = async (attributeId) => {
  //   await getAttributesValueList(attributeId);
  // };

  const getAttributesList = (id) => {
    apiCallNew("get", {}, ApiEndPoints.AttributesByCategory + id)
      .then((response) => {
        if (response.success) {
          setAttributesList(response.result);
          const initialSelectedAttributes = response.result.reduce(
            (acc, item) => {
              acc[item.id] = "";
              return acc;
            },
            {}
          );
          setSelectedAttributes(initialSelectedAttributes);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAttributesValueList = (id) => {
    apiCallNew("get", {}, ApiEndPoints.AttributesValueList + id)
      .then((response) => {
        if (response.success) {
          setAttributesValueList((prevState) => ({
            ...prevState,
            [id]: response.result,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getShopProductList = () => {
    const payload = {
      page: 0,
    };
    try {
      apiCallNew("post", payload, ApiEndPoints.ShopProductList).then(
        (response) => {
          if (response.success) {
            setShopProductLists(response.result);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <ItemDetailmodal
        itemOpen={itemOpen}
        setItemOpen={setItemOpen}
        id={proId}
      />
      {/* <Findmodal
        brands={status == "Brand" ? brands : colors}
        title={status == "Brand" ? "Brands" : "Colors"}
        setSelectedBrandss={
          status == "Brand" ? setSelectedBrandss : setSelectColors
        }
        open={open}
        setOpen={setOpen}
      /> */}
      <div className=" col-12 d-flex justify-content-between border-bottom">
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
            {attributesList?.map((item, index) => (
              <div className="form-group row" key={index}>
                <label
                  htmlFor={`attribute-${item.id}`}
                  className="col-sm-3 col-form-label"
                >
                  {item.attribute_name}
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control"
                    name={item.attribute_name}
                    id={`attribute-${item.id}`}
                    value={selectedAttributes[item.id] || ""}
                    onChange={(e) => handleAttributeChange(e, item.id)}
                    // onFocus={() => handleAttributeFocus(item.id)}
                  >
                    <option value="" hidden>
                      Select {item.attribute_name}
                    </option>
                    {attributesValueList[item.id]?.map((attrValue, idx) => (
                      <option key={idx} value={attrValue.id}>
                        {attrValue.attr_val_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            {/* <div className="row">
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
            </div> */}
            {/* <div className="row">
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
            </div> */}
          </div>
          <div
            className="col-md-8 scrollssec"
            style={{ height: "70vh", overflow: "auto" }}
          >
            <p>Top picks from the product library</p>
            {shopProductLists?.map((item, index) => (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  m: 2,
                }}
                onClick={() => {
                  setItemOpen(true);
                  setProId(item?.id);
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", md: 150 },
                    height: "150px",
                    objectFit: "contain",
                    marginLeft: "5px",
                  }}
                  image={item?.product_images[0]?.product_image || logos}
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
                    {item?.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item?.product_attributes?.map((item) => (
                      <>
                        <strong>{item?.attribute_name}:</strong>
                        {item?.product_attr_value_id}
                        <br />
                      </>
                    ))}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            {/* <Card
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
                sx={{
                  width: { xs: "100%", md: 150 },
                  height: "150px",
                  objectFit: "contain",
                }}
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
                sx={{
                  width: { xs: "100%", md: 150 },
                  height: "150px",
                  objectFit: "contain",
                }}
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
            </Card> */}
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
export default FindProduct;
