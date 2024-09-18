// import React, { useEffect, useState } from "react";
// import { Col, Container, Row, Card, ListGroup, Image } from "react-bootstrap";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
// import Header from "../../../Component/Header/Header";
// import { apiCallNew } from "../../../Network_Call/apiservices";
// import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
// import { CircularProgress } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import "./sellerdetails.css";
// import { doller } from "../../../Component/ReuseFormat/Doller";
// import { formatCapitalize } from "../../../Component/ReuseFormat/ReuseFormat";

// const SellerOrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState({});
//   const [load, setLoad] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [canselReason, setCanselReason] = useState("");
//   const [productId, setProductId] = useState(0);
//   const [currentStep, setCurrentStep] = useState("");
//   const steps = [
//     "Processing",
//     "Dispatched",
//     "In transit",
//     "Out for delivery",
//     "Delivered",
//     "Cancelled",
//   ];

//   console.log("canselReason././.", canselReason);
//   const handleStepClick = (index) => {
//     if (index <= currentStep) {
//       setCurrentStep(index + 1);
//     }
//   };
//   console.log("order", order);

//   useEffect(() => {
//     getProduct();
//   }, [id]);

//   useEffect(() => {
//     order?.order_product?.forEach((product) => {
//       const statusIndex = steps.indexOf(product?.order_product_status);
//       if (statusIndex !== -1) {
//         setCurrentStep(statusIndex);
//       }
//       setProductId(product?.product_id);
//     });
//   }, [order.order_product, steps]);

//   const {
//     order_no,
//     transaction_id,
//     sub_total,
//     shipping_charge,
//     total,
//     order_status,
//     created_at,
//     order_address,
//     order_product,
//   } = order;

//   const getProduct = async () => {
//     setLoad(true);
//     try {
//       const response = await apiCallNew(
//         "get",
//         null,
//         `${ApiEndPoints.SellerOrderDetail}${id}`
//       );
//       if (response?.success == true) {
//         setOrder(response?.result[0]);
//         setLoad(false);
//       }
//     } catch (error) {
//       console.log("ERROR", error);
//       setLoad(false);
//     }
//   };
//   console.log("productId", productId);
//   const productStatus = async (newStatus, ids) => {
//     setLoad(true);
//     const payload = {
//       product_id: ids,
//       status: newStatus,
//       reason: canselReason,
//     };
//     try {
//       const response = await apiCallNew(
//         "post",
//         payload,
//         `${ApiEndPoints.UpdateOrderProductStatus}${id}`
//       );
//       if (response?.success == true) {
//         setLoad(false);
//         getProduct();
//       }
//     } catch (error) {
//       console.log("ERROR", error);
//       setLoad(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle the submission, e.g., save the cancelReason value
//     console.log("Cancel Reason:", canselReason);

//     // You can also reset the input field after submission if needed
//     // setCanselReason("");
//   };

//   return (
//     <div>
//       {load && (
//         <div style={styles.backdrop}>
//           <CircularProgress style={styles.loader} />
//         </div>
//       )}
//       <Header />
//       <div className="sideallspace mt-3">
//         <h4 className="helo">My atozbay</h4>
//         <Row className="">
//           <Col md={2} xs={12} lg={2} className="mt-3">
//             <Sidebar status="selling" bidchild="ordersell" />
//           </Col>
//           <Col md={10}>
//             <Row className="mt-3">
//               <Col xs={12} md={6}>
//                 <h2 className="helo">
//                   {" "}
//                   <ArrowBackIcon
//                     style={{ cursor: "pointer" }}
//                     onClick={() => navigate("/seller-orders-list")}
//                   />{" "}
//                   Order Details
//                 </h2>
//               </Col>
//             </Row>
//             <Card className="mt-3">
//               <Card.Header>Order Information</Card.Header>
//               <Card.Body>
//                 <ListGroup variant="flush">
//                   <ListGroup.Item>
//                     <strong>Order ID:</strong> {id}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Transaction ID:</strong> {transaction_id}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Subtotal:</strong> {doller.Aud} {sub_total}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Shipping Charge:</strong>
//                     {doller.Aud} {shipping_charge}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Total:</strong> {doller.Aud} {total}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Status:</strong> {order_status}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Order Date:</strong>{" "}
//                     {new Date(created_at).toLocaleDateString()}
//                   </ListGroup.Item>
//                 </ListGroup>
//               </Card.Body>
//             </Card>
//             <Card className="mt-3">
//               <Card.Header>Shipping Address</Card.Header>
//               <Card.Body>
//                 <ListGroup variant="flush">
//                   <ListGroup.Item>
//                     <strong>Name:</strong> {order_address?.address_first_name}{" "}
//                     {order_address?.address_last_name}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Address:</strong> {order_address?.address_1},{" "}
//                     {order_address?.address_2}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>City:</strong> {order_address?.city_name}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Pincode:</strong> {order_address?.pincode}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Country Code:</strong> {order_address?.country_code}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <strong>Mobile Number:</strong>{" "}
//                     {order_address?.mobile_number}
//                   </ListGroup.Item>
//                 </ListGroup>
//               </Card.Body>
//             </Card>
//             <Card className="mt-3">
//               <Card.Header>Product Details</Card.Header>
//               <Card.Body>
//                 {order_product?.map((product, index) => (
//                   <>
//                     {" "}
//                     <Card key={index} className="mb-3">
//                       <Row noGutters>
//                         <Col md={4}>
//                           <Image
//                             src={product?.product_image_path}
//                             alt={product?.product_name}
//                             fluid
//                             style={{
//                               objectFit: "contain",
//                               top: 0,
//                               left: 0,
//                               width: "100%",
//                               height: "100%",
//                               transition: "transform 0.3s ease",
//                             }}
//                             onClick={() =>
//                               navigate(`/product/${product?.product_slug}`)
//                             }
//                           />
//                         </Col>
//                         <Col md={8}>
//                           <Card.Body>
//                             <Card.Title
//                               className="font-weight-bold"
//                               onClick={() =>
//                                 navigate(`/product/${product?.product_slug}`)
//                               }
//                             >
//                               {formatCapitalize(product?.product_name)}
//                             </Card.Title>
//                             <Card.Text>
//                               <strong>Price:</strong> ${product?.product_price}
//                               <br />
//                               <strong>Quantity:</strong> {product?.quantity}
//                               <br />
//                               <strong>Description:</strong>{" "}
//                               {product?.description}
//                               <br />
//                               <strong>SKU:</strong> {product?.product_sku}
//                             </Card.Text>
//                           </Card.Body>
//                         </Col>
//                       </Row>
//                     </Card>
//                     <div className="main_container p-0" key={index}>
//                       <div className="container p-0 padding-bottom-3x mb-1">
//                         <div className="card mb-3">
//                           <div className="p-2 text-center text-white text-lg bg-dark rounded-top">
//                             <span className="text-uppercase">
//                               Tracking Order Id -{" "}
//                             </span>
//                             <span className="text-medium">{id}</span>
//                           </div>
//                           <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-2 px-2 bg-secondary">
//                             <div className="w-100 text-center py-1 px-2">
//                               <span className="text-medium">Status:</span>{" "}
//                               <b>{product?.order_product_status}</b>
//                             </div>
//                           </div>
//                           <div className="card-body">
//                             <div className="stepss d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
//                               {steps.map((step, stepIndex) => (
//                                 <div
//                                   key={stepIndex}
//                                   className={`stepsss ${
//                                     step === "Cancelled"
//                                       ? "cancelled"
//                                       : stepIndex <= currentStep
//                                       ? "completed"
//                                       : ""
//                                   }`}
//                                   onClick={() => {
//                                     if (step !== "Cancelled") {
//                                       productStatus(step, product?.product_id);
//                                     } else {
//                                       setOpen(true);
//                                     }
//                                   }}
//                                 >
//                                   <div className="step-icon-wrap">
//                                     <div className="step-icon">
//                                       {stepIndex <= currentStep && (
//                                         <i className="fa fa-check"></i>
//                                       )}
//                                     </div>
//                                   </div>
//                                   <h4 className="step-title">{step}</h4>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                           {open && (
//                             <div className="card-footer">
//                               <div className=" ">
//                                 <div className=" ">
//                                   <form onSubmit={handleSubmit}>
//                                     <input
//                                       className="form-control"
//                                       type="text"
//                                       name="order_status"
//                                       id="order_status"
//                                       placeholder="Enter cancel reason"
//                                       value={canselReason}
//                                       onChange={(e) =>
//                                         setCanselReason(e.target.value)
//                                       }
//                                     />
//                                     <button
//                                       type="submit"
//                                       className="btn btn-primary mt-3 btn-sm"
//                                       onClick={(e) =>
//                                         productStatus("Cancelled")
//                                       }
//                                     >
//                                       Submit
//                                     </button>
//                                   </form>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 ))}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };
// const styles = {
//   backdrop: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     zIndex: 1000,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loader: {
//     color: "white",
//   },
// };

// export default SellerOrderDetail;

import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, ListGroup, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import Header from "../../../Component/Header/Header";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./sellerdetails.css";
import { doller } from "../../../Component/ReuseFormat/Doller";
import { formatCapitalize } from "../../../Component/ReuseFormat/ReuseFormat";

const SellerOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [canselReason, setCanselReason] = useState("");
  const [productId, setProductId] = useState(0);
  const [currentStep, setCurrentStep] = useState({});
  const steps = [
    "Placed",
    "Dispatched",
    "In transit",
    "Out for delivery",
    "Delivered",
    "Cancelled",
  ];

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
  } = order;

  const getProduct = async () => {
    setLoad(true);
    try {
      const response = await apiCallNew(
        "get",
        null,
        `${ApiEndPoints.SellerOrderDetail}${id}`
      );
      if (response?.success === true) {
        setOrder(response?.result[0]);
        setLoad(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoad(false);
    }
  };

  const productStatus = async (newStatus, ids) => {
    setLoad(true);
    const payload = {
      product_id: ids,
      status: newStatus,
      reason: newStatus === "Cancelled" ? canselReason : "",
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        `${ApiEndPoints.UpdateOrderProductStatus}${id}`
      );
      if (response?.success === true) {
        setLoad(false);
        getProduct();
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoad(false);
    }
  };

  const handleSubmit = (e, productId) => {
    e.preventDefault();
    productStatus("Cancelled", productId);
    setOpen(false);
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
            <Sidebar status="selling" bidchild="ordersell" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">
                  <ArrowBackIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/seller-orders-list")}
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
                    <strong>Subtotal:</strong> {doller.Aud} {sub_total}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Shipping Charge:</strong>
                    {doller.Aud} {shipping_charge}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Total:</strong> {doller.Aud} {total}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Status:</strong> {order_status}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Order Date:</strong>{" "}
                    {new Date(created_at).toLocaleDateString()}
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
                  <div key={index}>
                    <Card className="mb-3">
                      <Row noGutters>
                        <Col md={4}>
                          <Image
                            src={product?.product_image_path}
                            alt={product?.product_name}
                            fluid
                            style={{
                              objectFit: "contain",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              transition: "transform 0.3s ease",
                            }}
                            onClick={() =>
                              navigate(`/product/${product?.product_slug}`)
                            }
                          />
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <Card.Title
                              className="font-weight-bold"
                              onClick={() =>
                                navigate(`/product/${product?.product_slug}`)
                              }
                            >
                              {formatCapitalize(product?.product_name)}
                            </Card.Title>
                            <Card.Text>
                              <strong>Price:</strong> {doller.Aud}{" "}
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
                    <div className="main_container p-0">
                      <div className="container p-0 padding-bottom-3x mb-1">
                        <div className="card mb-3">
                          <div className="p-2 text-center text-white text-lg bg-dark rounded-top">
                            <span className="text-uppercase">
                              Tracking Order Id -{" "}
                            </span>
                            <span className="text-medium">{id}</span>
                          </div>
                          <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-2 px-2 bg-secondary">
                            <div className="w-100 text-center py-1 px-2">
                              <span className="text-medium">Status:</span>{" "}
                              <b>{product.order_product_status}</b>
                            </div>
                          </div>
                          <div className="card-body">
                            {/* <div className="stepper stepss d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                              {steps.map((step, idx) => {
                                const isCancelled =
                                  product.order_product_status ===
                                    "Cancelled" && step === "Cancelled";
                                return (
                                  <div
                                    key={idx}
                                    className={`stepper-item stepsss ${
                                      currentStep[product?.product_id] >= idx
                                        ? "completed"
                                        : ""
                                    } ${isCancelled ? "cancelled-step" : ""}`}
                                    onClick={() => {
                                      setProductId(product?.product_id);
                                      if (step === "Cancelled") {
                                        setOpen(true);
                                      } else {
                                        productStatus(
                                          step,
                                          product?.product_id
                                        );
                                      }
                                    }}
                                  >
                                    <div className="step-icon-wrap">
                                      <div className="step-icon">
                                        {currentStep[product?.product_id] >=
                                          idx &&
                                          (isCancelled ? (
                                            <i className="fa fa-times"></i>
                                          ) : (
                                            <i className="fa fa-check"></i>
                                          ))}
                                      </div>
                                    </div>
                                    <div className="step-name">{step}</div>
                                  </div>
                                );
                              })}
                            </div> */}
                            {/* <div className="stepper stepss d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                              {steps.map((step, idx) => {
                                const isCancelled =
                                  product.order_product_status ===
                                    "Cancelled" && step === "Cancelled";
                                const isCompleted =
                                  currentStep[product?.product_id] >= idx;
                                const isClickable =
                                  currentStep[product?.product_id] === idx ||
                                  currentStep[product?.product_id] + 1 === idx;

                                return (
                                  <div
                                    key={idx}
                                    className={`stepper-item stepsss ${
                                      isCompleted ? "completed" : ""
                                    } ${isCancelled ? "cancelled-step" : ""}`}
                                    onClick={() => {
                                      // Only allow clicking on the current or next step, disable previous steps
                                      if (isClickable) {
                                        setProductId(product?.product_id);
                                        if (step === "Cancelled") {
                                          setOpen(true);
                                        } else {
                                          productStatus(
                                            step,
                                            product?.product_id
                                          );
                                        }
                                      }
                                    }}
                                    style={{
                                      pointerEvents: isClickable
                                        ? "auto"
                                        : "none",
                                      cursor: isClickable
                                        ? "pointer"
                                        : "default",
                                    }}
                                  >
                                    <div className="step-icon-wrap">
                                      <div className="step-icon">
                                        {isCompleted &&
                                          (isCancelled ? (
                                            <i className="fa fa-times"></i>
                                          ) : (
                                            <i className="fa fa-check"></i>
                                          ))}
                                      </div>
                                    </div>
                                    <div className="step-name">{step}</div>
                                  </div>
                                );
                              })}
                            </div> */}
                            {/* <div className="stepper stepss d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                              {steps.map((step, idx) => {
                                const isCancelled =
                                  product.order_product_status ===
                                    "Cancelled" && step === "Cancelled";
                                const isCompleted =
                                  currentStep[product?.product_id] >= idx;
                                const isClickable =
                                  currentStep[product?.product_id] === idx ||
                                  currentStep[product?.product_id] + 1 === idx;

                                return (
                                  <div
                                    key={idx}
                                    className={`stepper-item stepsss ${
                                      isCompleted ? "completed" : ""
                                    } ${isCancelled ? "cancelled-step" : ""}`}
                                    onClick={() => {
                                      // Check if the user is trying to skip steps
                                      if (
                                        idx >
                                        currentStep[product?.product_id] + 1
                                      ) {
                                        alert(
                                          "You cannot skip steps. Please go step by step."
                                        );
                                        return;
                                      }

                                      // Show confirmation alert before proceeding
                                      if (isClickable) {
                                        const confirmation = window.confirm(
                                          `Do you want to change the status to "${step}"?`
                                        );
                                        if (confirmation) {
                                          setProductId(product?.product_id);
                                          if (step === "Cancelled") {
                                            setOpen(true);
                                          } else {
                                            productStatus(
                                              step,
                                              product?.product_id
                                            );
                                          }
                                        }
                                      }
                                    }}
                                    style={{
                                      pointerEvents: isClickable
                                        ? "auto"
                                        : "none",
                                      cursor: isClickable
                                        ? "pointer"
                                        : "default",
                                    }}
                                  >
                                    <div className="step-icon-wrap">
                                      <div className="step-icon">
                                        {isCompleted &&
                                          (isCancelled ? (
                                            <i className="fa fa-times"></i>
                                          ) : (
                                            <i className="fa fa-check"></i>
                                          ))}
                                      </div>
                                    </div>
                                    <div className="step-name">{step}</div>
                                  </div>
                                );
                              })}
                            </div> */}
                            <div className="stepper stepss d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                              {steps.map((step, idx) => {
                                const isCancelled =
                                  product.order_product_status ===
                                    "Cancelled" && step === "Cancelled";
                                const isCompleted =
                                  currentStep[product?.product_id] >= idx;
                                const isClickable =
                                  idx > currentStep[product?.product_id];

                                return (
                                  <div
                                    key={idx}
                                    className={`stepper-item stepsss ${
                                      isCompleted ? "completed" : ""
                                    } ${isCancelled ? "cancelled-step" : ""}`}
                                    onClick={() => {
                                      if (isClickable) {
                                        const confirmation = window.confirm(
                                          `Do you want to jump to "${step}"?`
                                        );
                                        if (confirmation) {
                                          setProductId(product?.product_id);
                                          if (step === "Cancelled") {
                                            setOpen(true);
                                          } else {
                                            productStatus(
                                              step,
                                              product?.product_id
                                            );
                                          }
                                        }
                                      }
                                    }}
                                    style={{
                                      pointerEvents: isClickable
                                        ? "auto"
                                        : "none",
                                      cursor: isClickable
                                        ? "pointer"
                                        : "default",
                                    }}
                                  >
                                    <div className="step-icon-wrap">
                                      <div className="step-icon">
                                        {isCompleted &&
                                          (isCancelled ? (
                                            <i className="fa fa-times"></i>
                                          ) : (
                                            <i className="fa fa-check"></i>
                                          ))}
                                      </div>
                                    </div>
                                    <div className="step-name">{step}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {/* <div className="card-body">
//                             <div className="stepss d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
//                               {steps.map((step, stepIndex) => (
//                                 <div
//                                   key={stepIndex}
//                                   className={`stepsss ${
//                                     step === "Cancelled"
//                                       ? "cancelled"
//                                       : stepIndex <= currentStep
//                                       ? "completed"
//                                       : ""
//                                   }`}
//                                   onClick={() => {
//                                     if (step !== "Cancelled") {
//                                       productStatus(step, product?.product_id);
//                                     } else {
//                                       setOpen(true);
//                                     }
//                                   }}
//                                 >
//                                   <div className="step-icon-wrap">
//                                     <div className="step-icon">
//                                       {stepIndex <= currentStep && (
//                                         <i className="fa fa-check"></i>
//                                       )}
//                                     </div>
//                                   </div>
//                                   <h4 className="step-title">{step}</h4>
//                                 </div>
//                               ))}
//                             </div>
//                           </div> */}
                        </div>
                      </div>
                    </div>
                    {open && (
                      <div className="form-group">
                        <form onSubmit={(e) => handleSubmit(e, productId)}>
                          <textarea
                            type="text"
                            name="description"
                            placeholder="Enter cancel reason"
                            className="form-control"
                            onChange={(e) => setCanselReason(e.target.value)}
                            required
                          />
                          <button
                            className="btn btn-primary mt-3"
                            type="submit"
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    )}
                    {product?.cancel_reason && (
                      <div className="card-footer mb-3">
                        <p>
                          <b>Reason:</b> {product?.cancel_reason}
                        </p>
                      </div>
                    )}
                    {product?.return_reason && (
                      <div className="card-footer mb-3">
                        <p>
                          <b>Reason:</b> {product?.return_reason}
                        </p>
                      </div>
                    )}
                  </div>
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
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: "#fff",
  },
};

export default SellerOrderDetail;
