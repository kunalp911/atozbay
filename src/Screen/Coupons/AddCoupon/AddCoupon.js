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
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ProductDetailsmodal from "../../../ShopCategoryComponent/ProductDetailsmodal";
import "./AddCoupon.css";
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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import * as Yup from "yup";

import { TextField, Checkbox, FormControlLabel } from "@mui/material";

const AddCoupon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productLists, setProductLists] = React.useState([]);
  const [couponProductList, setCouponProductList] = React.useState([]);
  const [errors, setErrors] = useState({});
  const [stokeOpen, setStokeOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [load, setload] = useState(false);
  const [stokeProductId, setStokeProductId] = useState(0);
  const [stockList, setStockList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();
  const [stockFormData, setStockFormData] = useState({
    product_id: stokeProductId,
    stock_qty: "",
    type: "add",
    note: "",
  });
  const [couponData, setCouponData] = useState({
    coupon_code: "",
    coupon_description: "",
    start_date: "",
    end_date: "",
    is_public: false,
    coupon_amount: 0,
    coupon_time_use: 0,
  });
  const { couponid } = location.state || {};

  useEffect(() => {
    GetCoupondData();
  }, [couponid]);
  const handleEditCoupon = (coupon) => {
    setCouponData({
      coupon_code: coupon.coupon_code || "",
      coupon_description: coupon.coupon_description || "",
      start_date: coupon.start_date || "",
      end_date: coupon.end_date || "",
      is_public: coupon.is_public === "Public",
      coupon_amount: coupon.coupon_amount || 0,
      coupon_time_use: coupon.coupon_time_use || 0,
    });
    setOpen(true);
  };

  const GetCoupondData = async () => {
    try {
      setload(true);
      const response = await apiCallNew(
        "get",
        {},
        `${ApiEndPoints.Get_Data_By_CouponId}${couponid}`
      );

      if (response.success) {
        // toast.success(response.msg);
        const initialSelectedProducts = response.result.coupon_products.map(
          (product) => product.product_id
        );
        setSelectedProducts(initialSelectedProducts);
        setCouponProductList(response?.result);

        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({
      ...couponData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    setload(true);
    const payload = {
      coupon_code: couponData.coupon_code,
      coupon_description: couponData.coupon_description,
      start_date: couponData.start_date,
      end_date: couponData.end_date,
      is_public: couponData.is_public ? "Public" : "Private",
      coupon_amount: couponData.coupon_amount,
      coupon_time_use: couponData.coupon_time_use,
      products_id: selectedProducts.map((product) => product),
    };
    try {
      await validationSchema.validate(couponData, { abortEarly: false });
      setErrors({});
      const endPoint = couponid
        ? ApiEndPoints.UpdateCoupon + couponid
        : ApiEndPoints.AddCoupon;
      const response = await apiCallNew("post", payload, endPoint);
      if (response.success) {
        setload(false);
        toast.success(response.msg);
        setOpen(false);
        setSelectedProducts([]);
        navigate("/product-list");
      }
      // Close modal after submission
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((validationError) => {
        newErrors[validationError.path] = validationError.message;
      });
      setErrors(newErrors);
      setload(false);
    }
  };
  const validationSchema = Yup.object().shape({
    coupon_code: Yup.string().required("Coupon Code is required"),
    coupon_description: Yup.string().required("Coupon Description is required"),
    start_date: Yup.date().required("Start Date is required"),
    end_date: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("start_date"), "End Date cannot be before Start Date"),
    coupon_amount: Yup.number()
      .required("Coupon Amount is required")
      .min(1, "Amount must be greater than 0"),
    coupon_time_use: Yup.number()
      .required("Coupon Time Use is required")
      .min(0, "Must be 0 or greater"),
  });

  const fiterData = productLists.filter((item) => item.status == 1);
  useEffect(() => {
    getProductList();
  }, []);

  const handlestokClose = () => {
    setStokeOpen(false);
    setStockFormData({});
  };
  const handleClose = () => {
    setOpen(false);
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

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        // If already selected, remove it
        return prevSelected.filter((id) => id !== productId);
      } else {
        // If not selected, add it
        return [...prevSelected, productId];
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
      <div className="" style={{ padding: "0px 20px" }}>
        <div className="row">
          <div className="col-md-2">
            <div className="mt-2">
              <h3 className="helo">Seller Hub</h3>
            </div>
          </div>
          <div className="col-md-10">
            <Row className="mt-2">
              <Col className="d-flex justify-content-end">
                <button
                  onClick={() => {
                    handleEditCoupon(couponProductList);
                  }}
                  className="btn listanbutton"
                >
                  {couponid ? "Update Coupon" : "Add Coupon"}
                </button>
              </Col>
            </Row>

            <div className="mt-2">
              <Container fluid className="my-4">
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
                              onChange={() => handleCheckboxChange(product?.id)}
                              checked={selectedProducts.includes(product?.id)}
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
                                {/* Add more product details as needed */}
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
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            position: "relative",
            overflowY: "auto",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" mb={2}>
            Add New Coupon
          </Typography>
          <TextField
            label="Coupon Code"
            name="coupon_code"
            value={couponData.coupon_code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.coupon_code}
            helperText={errors.coupon_code}
          />
          <TextField
            label="Coupon Description"
            name="coupon_description"
            value={couponData.coupon_description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.coupon_description}
            helperText={errors.coupon_description}
          />
          <TextField
            label="Start Date"
            name="start_date"
            type="date"
            value={couponData.start_date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.start_date}
            helperText={errors.start_date}
          />
          <TextField
            label="End Date"
            name="end_date"
            type="date"
            value={couponData.end_date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.end_date}
            helperText={errors.end_date}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={couponData.is_public}
                onChange={(e) =>
                  setCouponData({ ...couponData, is_public: e.target.checked })
                }
                name="is_public"
              />
            }
            label="Public"
          />
          <TextField
            label="Coupon Amount (%)"
            name="coupon_amount"
            type="number"
            value={couponData.coupon_amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.coupon_amount}
            helperText={errors.coupon_amount}
          />
          <TextField
            label="Coupon Time Use"
            name="coupon_time_use"
            type="number"
            value={couponData.coupon_time_use}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.coupon_time_use}
            helperText={errors.coupon_time_use}
          />

          <Button
            // variant="contained"
            // color="primary"
            className="mt-2 custom-button1"
            fullWidth
            onClick={handleSubmit}
          >
            {couponid ? "Update Coupon" : "Add Coupon"}
          </Button>
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
    zIndex: 9999,
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
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default AddCoupon;
