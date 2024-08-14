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
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import Header from "../../../Component/Header/Header";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./OrderDetails.css";
import { doller } from "../../../Component/ReuseFormat/Doller";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [load, setLoad] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const steps = [
    "Packaging",
    "Dispatched",
    "In transit",
    "Out for delivery",
    "Delivered",
    "Cancelled",
  ];

  console.log("order////", order);

  // const handleStepClick = (index) => {
  //   if (index <= currentStep) {
  //     setCurrentStep(index + 1);
  //   }
  // };
  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    order?.order_product?.forEach((product) => {
      const statusIndex = steps.indexOf(product?.order_product_status);
      if (statusIndex !== -1) {
        setCurrentStep(statusIndex);
      }
    });
  }, [order.order_product, steps]);

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
                    <strong>Status:</strong> {order_status}
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
                    <strong>Country Code:</strong> {order_address?.country_code}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Mobile Number:</strong>{" "}
                    {order_address?.mobile_number}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Header>Product Details</Card.Header>
              <Card.Body>
                {order_product?.map((product, index) => (
                  <>
                    <Link to={`/product/${product?.product_id}`}>
                      {" "}
                      <Card key={index} className="mb-3">
                        <Row noGutters>
                          <Col md={4}>
                            <Image
                              src={product?.product_image_path}
                              alt={product?.product_name}
                              fluid
                            />
                          </Col>
                          <Col md={8}>
                            <Card.Body>
                              <Card.Title>{product?.product_name}</Card.Title>
                              <Card.Text>
                                <strong>Price:</strong> {doller.Aud}
                                {product?.product_price}
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
                    </Link>
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
                              {steps.map((step, stepIndex) => (
                                <div
                                  key={stepIndex}
                                  className={`step ${
                                    step === "Cancelled"
                                      ? "cancelled"
                                      : stepIndex <= currentStep
                                      ? "completed"
                                      : ""
                                  }`}
                                >
                                  <div className="step-icon-wrap">
                                    <div className="step-icon">
                                      {stepIndex <= currentStep && (
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
                    </div>
                  </>
                ))}
              </Card.Body>
            </Card>
          </Col>
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
