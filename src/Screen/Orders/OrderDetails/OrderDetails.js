import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Image,
  ProgressBar,
  Button,
  Modal,
} from "react-bootstrap";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import Header from "../../../Component/Header/Header";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { CircularProgress, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./OrderDetails.css";
import { doller } from "../../../Component/ReuseFormat/Doller";
import { formatCapitalize } from "../../../Component/ReuseFormat/ReuseFormat";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [load, setLoad] = useState(false);
  const [currentStep, setCurrentStep] = useState([]);
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");
  const [productId, setProductId] = useState(0);
  const [modalStatus, setModalStatus] = useState(null);
  const steps = [
    "Placed",
    "Dispatched",
    "In transit",
    "Out for delivery",
    "Delivered",
    "Cancelled",
  ];

  console.log("productId", productId, modalStatus);
  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    const productSteps = {};
    order?.order_product?.forEach((product) => {
      const statusIndex = steps.indexOf(product?.order_product_status);
      if (statusIndex !== -1) {
        productSteps[product.product_id] = statusIndex;
      }
    });
    setCurrentStep(productSteps);
  }, [order.order_product]);

  const {
    order_no,
    transaction_id,
    sub_total,
    shipping_charge,
    total,
    order_status,
    created_at,
    order_address,
    order_product,
    order_review,
  } = order;

  const handleClose = () => setShow(false);
  const handleShow = (ids) => {
    setShow(true);
    setProductId(ids);
    console.log(">>>>>", ids);
  };

  const getProduct = async () => {
    setLoad(true);
    try {
      const response = await apiCallNew(
        "get",
        null,
        `${ApiEndPoints.OrderDetail}${id}`
      );
      if (response?.success == true) {
        setOrder(response?.result);
        setLoad(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoad(false);
    }
  };

  const cancelProduct = async () => {
    const payload = {
      product_id: productId,
      reason: reason,
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        `${ApiEndPoints.OrderProductCancel}${id}`
      );
      if (response?.success == true) {
        toast.success(response?.msg);
        getProduct();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const returnProduct = async () => {
    const payload = {
      product_id: productId,
      reason: reason,
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        `${ApiEndPoints.OrderProductReturn}${id}`
      );
      if (response?.success == true) {
        toast.success(response?.msg);
        getProduct();
        handleClose();
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
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="purchase" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">
                  {" "}
                  <ArrowBackIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/purchase")}
                  />{" "}
                  Order Details
                </h2>
              </Col>
            </Row>

            <Card className="mt-3">
              <Card.Header>Order Information</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Order ID:</strong> {id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Transaction ID:</strong> {transaction_id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Subtotal:</strong>
                    {doller.Aud} {sub_total}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Shipping Charge:</strong>
                    {doller.Aud} {shipping_charge}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Total:</strong>
                    {doller.Aud} {total}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Order Date:</strong>{" "}
                    {new Date(created_at).toLocaleString()}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Header>Shipping Address</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {order_address?.address_first_name}{" "}
                    {order_address?.address_last_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Address:</strong> {order_address?.address_1},{" "}
                    {order_address?.address_2}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>City:</strong> {order_address?.city_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Pincode:</strong> {order_address?.pincode}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Mobile Number:</strong> +
                    {order_address?.country_code} {order_address?.mobile_number}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="mt-3 mb-5">
              <Card.Header>Product Details</Card.Header>

              <Card.Body>
                {order_product?.map((product, index) => (
                  <>
                    {" "}
                    <Card key={index} className="mb-3">
                      <Row noGutters>
                        <Col md={4}>
                          <Image
                            src={product?.product_image_path}
                            alt={product?.product_name}
                            fluid
                            onClick={() =>
                              navigate(`/product/${product?.product_slug}`)
                            }
                          />
                        </Col>
                        <Col md={8}>
                          <Card.Body className="">
                            {/* <p
                              onClick={() =>
                                navigate(`/message`, {
                                  state: { id: product?.seller_user_id },
                                })
                              }
                            >
                              message
                            </p> */}
                            {product?.order_product_status == "Placed" && (
                              <p
                                className="procancel mb-0 fw-bold"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleShow(product?.product_id);
                                  setModalStatus(1);
                                }}
                              >
                                <u>Cancel</u>
                              </p>
                            )}
                            {product?.products?.return_days &&
                              product?.order_product_status === "Delivered" &&
                              new Date() <
                                new Date(product?.return_till_at) && (
                                <p
                                  className="proreturn fw-bold mb-0"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handleShow(product.product_id);
                                    setModalStatus(2);
                                  }}
                                >
                                  <u>Return</u>
                                </p>
                              )}
                            {/* <p
                              className="proreturn fw-bold mb-0 mt-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleShow(product?.product_id);
                                setModalStatus(2);
                              }}
                            >
                              <u> Return</u>
                            </p> */}
                            <Card.Title
                              className="font-weight-bold"
                              onClick={() =>
                                navigate(`/product/${product?.product_slug}`)
                              }
                            >
                              {formatCapitalize(product?.product_name)}
                            </Card.Title>
                            <Card.Text>
                              <strong>
                                {product?.refund_amount
                                  ? "Refund Amount"
                                  : "Price"}
                                :
                              </strong>{" "}
                              {doller.Aud} {/* {product?.product_price} */}
                              {product?.refund_amount
                                ? product?.refund_amount
                                : product?.product_price}
                              <br />
                              <strong>Quantity:</strong> {product?.quantity}
                              <br />
                              <strong>Description:</strong>{" "}
                              {product?.description}
                              <br />
                              <strong>SKU:</strong> {product?.product_sku}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                    <div>
                      <div className="d-flex justify-content-between mt-3">
                        <b>Review</b>
                        <p
                          className="text-end text-primary"
                          onClick={() => {
                            navigate(`/review/${product?.product_id}`, {
                              state: { orderId: product?.order_id },
                            });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <b>Write a review</b>
                        </p>
                      </div>

                      <div>
                        {order_review?.map((item, index) => (
                          <div className="  mt-3" key={item.id}>
                            <div>
                              <p className="text-muted">
                                {index + 1}.{item.review}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* <div className="main_container p-0">
                      <div className="container p-0 padding-bottom-3x mb-1">
                        <div className="card mb-3">
                          <div className="p-2 text-center text-white text-lg bg-dark rounded-top">
                            <span className="text-uppercase">
                              Tracking Order Id -{" "}
                            </span>
                            <span className="text-medium">{order.id}</span>
                          </div>
                          <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-2 px-2 bg-secondary">
                            <div className="w-100 text-center py-1 px-2">
                              <span className="text-medium">Status:</span>{" "}
                              <b>{product.order_product_status}</b>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                              {steps.map((step, stepIndex) => (
                                <div
                                  key={stepIndex}
                                  className={`step ${
                                    currentStep[product?.product_id] >=
                                    stepIndex
                                      ? "completed"
                                      : ""
                                  }`}
                                >
                                  <div className="step-icon-wrap">
                                    <div className="step-icon">
                                      {currentStep[product?.product_id] >=
                                        stepIndex && (
                                        <i className="fa fa-check"></i>
                                      )}
                                    </div>
                                  </div>
                                  <h4 className="step-title">{step}</h4>
                                </div>
                              ))}
                            </div>
                          </div>
                          {product?.cancel_reason && (
                            <div className="card-footer">
                              <p>Reason: {product?.cancel_reason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div> */}
                    <div className="main_container p-0">
                      <div className="container p-0 padding-bottom-3x mb-1">
                        <div className="card mb-3">
                          <div className="p-2 text-center text-white text-lg bg-dark rounded-top">
                            <span className="text-uppercase">
                              Tracking Order Id -{" "}
                            </span>
                            <span className="text-medium">{order.id}</span>
                          </div>
                          <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-2 px-2 bg-secondary">
                            <div className="w-100 text-center py-1 px-2">
                              <span className="text-medium">Status:</span>{" "}
                              <b>{product.order_product_status}</b>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                              {steps.map((step, stepIndex) => {
                                const isCancelled =
                                  product.order_product_status ===
                                    "Cancelled" && step === "Cancelled";
                                return (
                                  <div
                                    key={stepIndex}
                                    className={`step ${
                                      currentStep[product?.product_id] >=
                                      stepIndex
                                        ? "completed"
                                        : ""
                                    } ${isCancelled ? "cancelled-step" : ""}`}
                                  >
                                    <div className="step-icon-wrap">
                                      <div className="step-icon">
                                        {currentStep[product?.product_id] >=
                                          stepIndex &&
                                          (isCancelled ? (
                                            <i className="fa fa-times"></i>
                                          ) : (
                                            <i className="fa fa-check"></i>
                                          ))}
                                      </div>
                                    </div>
                                    <h4 className="step-title">{step}</h4>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {product?.cancel_reason && (
                            <div className="card-footer">
                              <p>
                                <b>Reason:</b> {product?.cancel_reason}
                              </p>
                            </div>
                          )}
                          {product?.return_reason && (
                            <div className="card-footer">
                              <p>
                                <b>Reason:</b> {product?.return_reason}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              {modalStatus === 1 ? (
                <Modal.Title>Add Reason for Cancellation</Modal.Title>
              ) : (
                <Modal.Title>Add Reason for Return</Modal.Title>
              )}
            </Modal.Header>
            {modalStatus === 1 ? (
              <Modal.Body>
                <form onSubmit={cancelProduct} action="javascript:void(0)">
                  <label>Reason</label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter cancel reason"
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                  <div className="mt-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      className="ms-2"
                      variant="primary"
                      size="sm"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            ) : (
              <Modal.Body>
                <form onSubmit={returnProduct} action="javascript:void(0)">
                  <label>Reason</label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter return reason"
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                  <div className="mt-3 d-flex justify-content-end">
                    <Button variant="secondary" size="sm" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      className="ms-2"
                      variant="primary"
                      size="sm"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            )}
          </Modal>
        </Row>
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
export default OrderDetails;
