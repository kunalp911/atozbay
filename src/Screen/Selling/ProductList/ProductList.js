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
  Form,
} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ProductList = () => {
  const navigate = useNavigate();
  const [productLists, setProductLists] = React.useState([]);
  const [couponList, setCouponList] = React.useState();
  const [stokeOpen, setStokeOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [load, setload] = useState(false);
  const [stokeProductId, setStokeProductId] = useState(0);
  const [packproductId, setPackproductId] = useState(0);
  const [stockList, setStockList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activPackage, setActivPackage] = useState(null);
  const [openPackage, setOpenPackage] = useState(false);
  const [isExpired, setIsExpired] = useState(0);
  const [stockFormData, setStockFormData] = useState({
    product_id: stokeProductId,
    stock_qty: "",
    type: "add",
    note: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const fiterData = productLists.filter((item) => item.status == 1);

  useEffect(() => {
    getProductList();
    getCouponList();
    getActivePackage();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const endDate = activPackage?.user_package_end_date;
    const RemainImage = activPackage?.current_no_of_images;

    if (endDate) {
      if (currentDate > endDate) {
        setIsExpired(1);
      } else {
        if (RemainImage > 0) {
          setIsExpired(2);
        } else {
          setIsExpired(1);
        }
      }
    } else {
      setIsExpired(0);
    }
  }, [activPackage?.user_package_end_date, activPackage?.current_no_of_images]);

  const handleClosePackage = () => setOpenPackage(false);
  const handleOpenPackage = (id) => {
    setPackproductId(id);
    setOpenPackage(true);
  };

  const getActivePackage = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.ActiveSubscription).then(
        (response) => {
          if (response.success) {
            setActivPackage(response.result);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleProductSelect = (e, selectedProduct) => {
    if (e.target.checked) {
      setSelectedProductId(selectedProduct.id); // Store only the ID
    } else {
      setSelectedProductId(null); // Clear the selection
    }
  };
  const handleDelete = async (couponId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        container: "swal2-container1", // Apply custom class
      },
    });

    if (result.isConfirmed) {
      try {
        setload(true);
        const response = await apiCallNew(
          "delete",
          {},
          `${ApiEndPoints.DeleteCoupon}${couponId}`
        );

        if (response.success) {
          toast.success(response.msg);
          getCouponList();
          setload(false);
        } else {
          setload(false);
          toast.error(response.msg);
        }
      } catch (error) {
        console.log(error);
        setload(false);
      }
    }
  };
  const handleEdit = (couponid) => {
    navigate("/add-coupon", { state: { couponid } });
  };

  const handleAddToDailyDeal = (stat) => {
    const payload = {
      status: stat,
      product_id: selectedProductId,
    };
    try {
      setload(true);
      apiCallNew("post", payload, ApiEndPoints.TodayDeal).then((response) => {
        if (response.success) {
          console.log("respo", response);
          toast.success(response.msg);
          getProductList();
          setSelectedProductId(null);
          setload(false);
        } else {
          setload(false);
          toast.error(response.msg);
        }
      });
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

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
  const getCouponList = () => {
    try {
      setload(true);
      apiCallNew("post", {}, ApiEndPoints.CouponList).then((response) => {
        if (response.success) {
          setCouponList(response.result);
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

  const handleImageSelection = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages(imagePreviews);
  };

  const handleImageUpload = async () => {
    const payload = {};
    selectedImages?.forEach((image, index) => {
      payload[`images[${index}]`] = image.file;
    });
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.UploadImage + packproductId
      );
      if (response.success) {
        toast.success(response.msg);
        getProductList();
        handleClosePackage();
        setSelectedImages([]);
        getActivePackage();
      } else {
        toast.error(response.msg);
      }
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
      <Header />
      <div className="" style={{ padding: "0px 20px" }}>
        <div className="row">
          <div className="col-md-2">
            <div className="mt-2">
              <h3 className="helo">Seller Hub</h3>
            </div>
          </div>
          <div className="col-md-10">
            {/* <Row className="mt-2">
              <Col>
                <h3 className="helo">All Product</h3>
              </Col>
              <Col className="d-flex justify-content-end">
                <button
                  className="btn listanbutton ms-3"
                  onClick={() => navigate("/selling/list-item")}
                >
                  List an item
                </button>
              </Col>
            </Row> */}
            <Row className="mt-2">
              <Col className="d-flex justify-content-end ">
                <div className="dropdown me-3 ">
                  <button
                    className="btn btn-secondary dropdown-toggle btn-sm"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    size="sm"
                  >
                    Manage Coupons
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleShowModal}
                      >
                        Coupon List
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/add-coupon")}
                      >
                        Add Coupon
                      </button>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn listanbutton btn-sm mx-3"
                  onClick={() => navigate("/selling/select-condition")}
                >
                  List an item
                </button>
              </Col>
            </Row>
            <Modal
              open={showModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                  Coupon List
                </Typography>
                <Box id="modal-description" sx={{ mt: 2 }}>
                  {couponList?.length > 0 ? (
                    couponList.map((coupon) => (
                      <Box key={coupon.id} sx={couponBoxStyle}>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              mb: 1,
                            }}
                          >
                            <Typography sx={labelStyle}>
                              Coupon Code:
                            </Typography>
                            <Typography sx={valueStyle}>
                              {coupon.coupon_code}
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              mb: 1,
                            }}
                          >
                            <Typography sx={labelStyle}>
                              Description:
                            </Typography>
                            <Typography sx={valueStyle}>
                              {coupon.coupon_description}
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              mb: 1,
                            }}
                          >
                            <Typography sx={labelStyle}>Validity:</Typography>
                            <Typography sx={valueStyle}>
                              {coupon.start_date} - {coupon.end_date}
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              mb: 1,
                            }}
                          >
                            <Typography sx={labelStyle}>Public:</Typography>
                            <Typography sx={valueStyle}>
                              {coupon.is_public}
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              mb: 1,
                            }}
                          >
                            <Typography sx={labelStyle}>Amount:</Typography>
                            <Typography sx={valueStyle}>
                              {coupon.coupon_amount}
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <Typography sx={labelStyle}>
                              Usage Limit:
                            </Typography>
                            <Typography sx={valueStyle}>
                              {coupon.coupon_time_use}
                            </Typography>
                          </Typography>
                        </Box>
                        <Box sx={iconContainerStyle}>
                          <IconButton
                            sx={iconStyle}
                            onClick={() => handleEdit(coupon.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            sx={{ ...iconStyle, color: "error.main" }}
                            onClick={() => handleDelete(coupon.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>No coupons available.</Typography>
                  )}
                </Box>
                <Button
                  // variant="contained"
                  // color="secondary"
                  onClick={handleCloseModal}
                  sx={{ mt: 2 }}
                >
                  Close
                </Button>
              </Box>
            </Modal>
            <div className="mt-2">
              <Container fluid className="my-4">
                <Row className="mt-3">
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    className="d-flex justify-content-center mb-2 mb-sm-0"
                  >
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#3665f3",
                        width: "100%",
                        border: "none",
                      }}
                      onClick={() => handleAddToDailyDeal(1)}
                      disabled={!selectedProductId}
                    >
                      Add Selected to Daily Deal
                    </Button>
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    className="d-flex justify-content-center"
                  >
                    <Button
                      size="sm"
                      className="ms-sm-3 mt-2 mt-sm-0"
                      style={{
                        backgroundColor: "#3665f3",
                        width: "100%",
                        border: "none",
                      }}
                      onClick={() => handleAddToDailyDeal(0)}
                      disabled={!selectedProductId}
                    >
                      Remove Selected from Daily Deal
                    </Button>
                  </Col>
                </Row>

                <Form action="javascript:void(0)">
                  {fiterData?.map((product, index) => (
                    <Card className="mt-2" key={product?.id}>
                      <Card.Header>
                        <Row className="align-items-center">
                          <Col xs={2} sm={1}>
                            <Form.Check
                              className="ms-2"
                              type="checkbox"
                              value={product?.id}
                              onChange={(e) => handleProductSelect(e, product)}
                              checked={selectedProductId === product?.id}
                            />
                          </Col>
                          <Col xs={10} sm={5}>
                            <Typography variant="h6" className="mb-2 mb-sm-0">
                              {index + 1}. Title: {product?.name}
                              {product?.is_today_deal === 1 && (
                                <>
                                  <AccessTimeIcon
                                    sx={{ color: "green", ml: 2 }}
                                    titleAccess="This product is on Daily Deal"
                                  />
                                  <span
                                    style={{ fontSize: "13px", color: "green" }}
                                  >
                                    Deal
                                  </span>
                                </>
                              )}
                            </Typography>
                          </Col>
                          <Col
                            xs={12}
                            sm={6}
                            className="d-flex justify-content-end mt-2 mt-sm-0"
                          >
                            <div>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleOpenPackage(product?.id)}
                              >
                                Add more images
                              </button>
                              <button
                                className="btn btn-secondary btn-sm ms-3 mt-2 mt-sm-0"
                                onClick={() => handleStokeOpne(product?.id)}
                              >
                                Add & Remove Stock
                              </button>
                              <button
                                className="btn btn-secondary btn-sm ms-3 mt-2 mt-sm-0"
                                onClick={() => handleOpen(product?.id)}
                              >
                                Stock list
                              </button>
                              <EditIcon
                                className="ms-3 mt-2 mt-sm-0"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleUpdate(product)}
                              />
                              <DeleteIcon
                                className="ms-3 mt-2 mt-sm-0"
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
                                {product?.product_prices?.auction_duration && (
                                  <tr>
                                    <td>
                                      <strong>Auction Duration</strong>
                                    </td>
                                    <td>
                                      {
                                        product?.product_prices
                                          ?.auction_duration
                                      }{" "}
                                      days
                                    </td>
                                  </tr>
                                )}

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
                </Form>
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
      <Modal
        open={openPackage}
        onClose={handleClosePackage}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...stylele }}>
          <IconButton
            aria-label="close"
            onClick={handleClosePackage}
            sx={{
              position: "absolute",
              right: 8,
              top: 5,
            }}
          >
            <CloseIcon />
          </IconButton>
          {isExpired == 0 ? (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                No Plan Available!
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                You don't have any active Plan. Please buy first
              </Typography>
              <Button
                className="mt-4"
                color="primary"
                onClick={() => navigate("/packages")}
                size="sm"
              >
                Buy Now
              </Button>
            </>
          ) : isExpired == 1 ? (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                Your Plan Has Expired!
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                You can upload a maximum of 4 images for free. Please upgrade
                your plan to upload more images.
              </Typography>
              <Button
                className="mt-4"
                color="primary"
                onClick={() => navigate("/packages")}
                size="sm"
              >
                Upgrade Now
              </Button>
            </>
          ) : isExpired == 2 ? (
            <>
              <span className="text-muted fw-bold">
                {activPackage?.current_no_of_images} images remaining in your
                package.
              </span>
              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                sx={{
                  mt: 2,
                  color: "#333",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  lineHeight: 1.5,
                }}
              >
                Upload images
              </Typography>
              <div>
                <input
                  className="mt-3"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelection}
                />
              </div>
              <Button
                className="mt-4"
                color="primary"
                onClick={handleImageUpload}
                size="sm"
              >
                Upload Images
              </Button>
              <div className="mt-3">
                {selectedImages.length > 0 && (
                  <Typography variant="body1">
                    {selectedImages.length} images selected:
                  </Typography>
                )}
                <div className="image-preview-container">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img
                        className="imgpack"
                        src={image.preview}
                        alt={`Selected image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
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

const stylele = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: "auto",
  maxHeight: "90vh",
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  position: "relative",
  overflowY: "auto",
};

const couponBoxStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  mb: 2,
  p: 2,
  bgcolor: "#f0f0f0",
  borderRadius: 1,
};

const labelStyle = {
  fontWeight: "bold",
  mr: 1,
};

const valueStyle = {
  mb: 1,
};

const iconContainerStyle = {
  position: "absolute",
  top: 8,
  right: 8,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

const iconStyle = {
  color: "primary.main",
  "&:hover": {
    color: "primary.dark",
  },
};

export default ProductList;
