import React, { useEffect, useState } from "react";
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ProductDetailsmodal from "../../../ShopCategoryComponent/ProductDetailsmodal";
import "./productlist.css";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Image,
  Button,
} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

const ProductList = () => {
  const navigate = useNavigate();
  const [productLists, setProductLists] = React.useState([]);
  const [stokeOpen, setStokeOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [load, setload] = useState(false);
  const [stokeProductId, setStokeProductId] = useState(0);
  const [stockList, setStockList] = useState([]);
  const [stockFormData, setStockFormData] = useState({
    product_id: stokeProductId,
    stock_qty: "",
    type: "add",
    note: "",
  });
  console.log(">>>>>>?", stockList);

  useEffect(() => {
    getProductList();
  }, []);

  const handleStokeOpne = (id) => {
    setStokeOpen(true);
    setStokeProductId(id);
    setStockFormData((prevData) => ({
      ...prevData,
      product_id: id,
    }));
  };

  const handlestokClose = () => {
    setStokeOpen(false);
    setStockFormData({});
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async (id) => {
    setload(true);
    try {
      const response = await apiCallNew(
        "post",
        {},
        ApiEndPoints.StockList + id
      );
      if (response.success) {
        setStockList(response.result);
      }
      setOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setload(false);
    }
  };

  const handleStokeOnchange = (e) => {
    const { name, value } = e.target;
    setStockFormData({ ...stockFormData, [name]: value });
  };

  const getProductList = () => {
    try {
      setload(true);
      apiCallNew("post", {}, ApiEndPoints.ProductList).then((response) => {
        if (response.success) {
          setProductLists(response.result);
          setload(false);
        }
      });
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const handleAddStock = () => {
    try {
      setload(true);
      apiCallNew("post", stockFormData, ApiEndPoints.StockAdd).then(
        (response) => {
          if (response.success) {
            console.log("res", response);
            setload(false);
            handlestokClose(false);
            getProductList();
            toast.success(response.msg);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deletePrduct = (id) => {
    try {
      apiCallNew("delete", {}, ApiEndPoints.ProductSellDelete + id).then(
        (response) => {
          if (response.success) {
            getProductList();
            toast.success(response.msg);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (product) => {
    console.log("update", product);
    navigate("/add-product", { state: { product: product } });
  };
  const confirmDeletion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePrduct(id);
      }
    });
  };
  return (
    <div>
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Header />
      <div className="" style={{ padding: "0px 40px" }}>
        <div className="row">
          <div className="col-md-2">
            <div className="mt-2">
              <h3>Seller Hub</h3>
            </div>
          </div>
          <div className="col-md-10">
            <Row className="mt-2">
              <Col>
                <h3>All Product</h3>
              </Col>
              <Col className="d-flex justify-content-end">
                <button
                  className="btn listanbutton ms-3"
                  onClick={() => navigate("/selling/list-item")}
                >
                  List an item
                </button>
              </Col>
            </Row>
            <div className="mt-2">
              <Container fluid className="my-4">
                {productLists?.map((product, index) => (
                  <Card className="mt-2" key={index}>
                    <Card.Header>
                      <Row>
                        <Col md={6}>
                          <Typography variant="h6">
                            {index + 1}. Title: {product?.name}
                          </Typography>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                          <div>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => handleStokeOpne(product?.id)}
                            >
                              Add & Remove Stock
                            </button>
                            <button
                              className="btn btn-secondary btn-sm ms-3"
                              onClick={() => handleOpen(product?.id)}
                            >
                              Stock list
                            </button>
                            <EditIcon
                              className="ms-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleUpdate(product)}
                            />
                            <DeleteIcon
                              className="ms-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => confirmDeletion(product?.id)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={3}>
                          <ImageCarousel
                            productImages={product?.product_images}
                          />
                        </Col>
                        <Col md={9}>
                          <Table responsive bordered>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>SKU</strong>
                                </td>
                                <td>{product?.sku}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Category</strong>
                                </td>
                                <td>{product?.category_name}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Brand</strong>
                                </td>
                                <td>{product?.brand_name}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Condition</strong>
                                </td>
                                <td>{product?.item_condition}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Condition Description</strong>
                                </td>
                                <td>{product?.condition_description}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Price</strong>
                                </td>
                                <td>AUD {product?.product_prices?.price}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Auction Duration</strong>
                                </td>
                                <td>
                                  {product?.product_prices?.auction_duration}{" "}
                                  days
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Available Quantity</strong>
                                </td>
                                <td>{product?.product_prices?.quantity} </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <h5>Attributes</h5>
                          <Table responsive bordered>
                            <thead>
                              <tr>
                                <th>Attribute</th>
                                <th>Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product?.product_attributes?.map((attr) => (
                                <tr key={attr?.id}>
                                  <td>{attr?.attribute_name}</td>
                                  <td>{attr?.attr_val_name}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tbody>
                              {product?.custom_attributes?.map((attr) => (
                                <tr key={attr?.id}>
                                  <td>{attr?.custom_attribute_name}</td>
                                  <td>{attr?.custom_attribute_value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </Container>
            </div>
          </div>
        </div>
      </div>
      {/* *******stoke modal*************** */}
      <Dialog
        open={stokeOpen}
        onClose={handlestokClose}
        fullWidth
        maxWidth="sm"
      >
        <Grid container className="d-flex justify-content-between p-2">
          <DialogTitle className="text-center">Add Stock</DialogTitle>
          {/* <button className="btn btn-sm" onClick={handlestokClose}>
            <i className="fa fa-times"></i>
          </button> */}
          <IconButton
            aria-label="close"
            onClick={handlestokClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 5,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        <DialogContent dividers>
          <form action="javascript:void(0)">
            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter quantity"
                name="stock_qty"
                value={stockFormData.stock_qty}
                onChange={handleStokeOnchange}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                className="form-control"
                placeholder="Select type"
                name="type"
                value={stockFormData.type}
                onChange={handleStokeOnchange}
              >
                <option value="">Select type</option>
                <option value="Add">Add</option>
                <option value="Remove">Remove</option>
              </select>
            </div>
            <div className="form-group">
              <label>Note</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Write note"
                name="note"
                value={stockFormData.note}
                onChange={handleStokeOnchange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-closess" onClick={handlestokClose}>
                Close
              </button>
              <button
                type="submit"
                className="btn btn-savss ms-3"
                onClick={handleAddStock}
              >
                Save
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            maxWidth: 700,
            margin: "auto",
            mt: 5,
            mb: 5,
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            position: "relative",
            overflow: "auto",
            height: "90vh",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" component="h2" sx={{ mb: 2, color: "#000" }}>
            <ShoppingCartIcon
              fontSize="large"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Stock Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {stockList.length === 0 && (
              <ListItem>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "#555",
                        textAlign: "center",
                      }}
                    >
                      No stock found
                    </Typography>
                  }
                />
              </ListItem>
            )}
            {stockList?.map((item, index) => (
              <ListItem
                key={index}
                sx={{ bgcolor: "#f9f9f9", borderRadius: 1, mb: 2 }}
              >
                <Avatar sx={{ bgcolor: "#3f51b5", mr: 2 }}>
                  {item.type === "Add" ? "+" : "-"}
                </Avatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      {item.product_name} ({item.type})
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Quantity: {item.stock_qty}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Note: {item.note}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#777" }}>
                        Date: {new Date(item.created_at).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
      <Footer />
    </div>
  );
};

const ImageCarousel = ({ productImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + productImages.length) % productImages.length
    );
  };

  return (
    <div>
      <Image src={productImages[currentIndex]?.product_image} fluid />
      {productImages?.length > 1 && (
        <div className="carousel-control container justify-content-between d-flex">
          <ChevronLeftIcon
            onClick={currentIndex === 0 ? null : handlePrev}
            disabled={currentIndex === 0 && true}
            style={{
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              fontSize: "30px",
              opacity: currentIndex === 0 ? 0.5 : 1,
            }}
          />
          <ChevronRightIcon
            onClick={
              currentIndex === productImages.length - 1 ? null : handleNext
            }
            style={{
              cursor:
                currentIndex === productImages.length - 1
                  ? "not-allowed"
                  : "pointer",
              fontSize: "30px",
              opacity: currentIndex === productImages.length - 1 ? 0.5 : 1,
            }}
          />
        </div>
      )}
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

export default ProductList;
