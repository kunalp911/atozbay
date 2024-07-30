import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "./checkout.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatCapitalize } from "../../Component/ReuseFormat/ReuseFormat";
import { CircularProgress, Typography } from "@mui/material";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { useCart } from "../../Component/context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CheckOut = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const data = location?.state || {};
  const status = location?.state?.status || "";
  const [productDetails, setProductLists] = React.useState({});
  const [quantity, setQuantity] = useState(data?.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(
    productDetails?.product_prices?.price
  );
  const [shipAddList, setShipAddList] = useState([]);
  const [primaryAddress, setPrimaryAddress] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [totalPrices, setTotalPrices] = useState(0);
  const [load, setload] = useState(false);
  const { updateCartCount } = useCart();

  console.log("status", productDetails);
  const handlePrimaryChange = (index) => {
    setPrimaryAddress(index);
  };

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  useEffect(() => {
    setTotalPrice(quantity * productDetails?.product_prices?.price);
  }, [quantity, productDetails?.product_prices?.price]);

  useEffect(() => {
    getShipAddressList();
  }, []);

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = async () => {
    try {
      setload(true);
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.CartProductsList
      );
      if (response.success) {
        setCartList(response.result);
        calculateTotals(response.result);
        setload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCart = async (cart_id, cart_quantity) => {
    console.log(cart_id, cart_quantity);
    try {
      setload(true);
      const payload = {
        cart_id: cart_id,
        cart_quantity: cart_quantity,
      };
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.CartUpdate
      );
      if (response.success) {
        getCartList();
        setload(false);
      } else {
        toast.error(response.msg);
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartList = cartList.map((item, i) => {
      if (i === index) {
        handleUpdateCart(item.id, newQuantity);
        return { ...item, cart_quantity: newQuantity };
      }
      return item;
    });
    setCartList(updatedCartList);
    calculateTotals(updatedCartList);
  };

  const removeCart = async (id) => {
    try {
      const response = await apiCallNew(
        "delete",
        {},
        `${ApiEndPoints.DeleteCartProduct}?cart_id=${id}`
      );
      if (response.success) {
        toast.success(response.msg);
        getCartList();
        updateCartCount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeletion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCart(id);
      }
    });
  };

  const calculateTotals = (cartList) => {
    let total = 0;
    cartList?.forEach((item) => {
      total += item?.product_price * item?.cart_quantity;
    });
    setTotalPrices(total);
  };

  // const viewProduct = (id) => {
  //   navigate(`/product/${id}`);
  // };

  // const handleCheckout = () => {
  //   navigate("/checkout");
  // };

  const getShipAddressList = () => {
    try {
      apiCallNew("post", {}, ApiEndPoints.ShipAddressList).then((response) => {
        if (response.success) {
          setShipAddList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProductDetails = (id) => {
    try {
      setload(true);
      apiCallNew("get", {}, ApiEndPoints.ProductShopDetail + id).then(
        (response) => {
          if (response.success) {
            setProductLists(response.result);
            setload(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  return (
    <div>
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Container className="mt-3 mb-3">
        <Row>
          <Col md={8} style={{ height: "100vh", overflow: "auto" }}>
            <h4>Checkout</h4>
            {/* <Card className="mb-3">
              <Card.Body>
                <h5 className="paywithname">Pay with</h5>
                <Form>
                  <Form.Check
                    className="payment-checks"
                    type="radio"
                    defaultChecked
                    label={
                      <span>
                        <img
                          src={
                            "https://e7.pngegg.com/pngimages/711/9/png-clipart-paypal-logo-brand-font-payment-paypal-text-logo-thumbnail.png"
                          }
                          alt="PayPal"
                          width="50"
                          className="mr-2"
                        />
                        PayPal
                      </span>
                    }
                    name="paymentMethod"
                    id="paypal"
                  />
                  <Form.Check
                    className="payment-checks"
                    type="radio"
                    label={
                      <span>
                        <img
                          src={
                            "https://e7.pngegg.com/pngimages/711/9/png-clipart-paypal-logo-brand-font-payment-paypal-text-logo-thumbnail.png"
                          }
                          alt="Venmo"
                          width="50"
                          className="mr-2"
                        />
                        Venmo
                      </span>
                    }
                    name="paymentMethod"
                    id="venmo"
                  />
                  <Form.Check
                    className="payment-checks"
                    type="radio"
                    label={
                      <span>
                        <img
                          src={
                            "https://e7.pngegg.com/pngimages/711/9/png-clipart-paypal-logo-brand-font-payment-paypal-text-logo-thumbnail.png"
                          }
                          alt="Card"
                          width="50"
                          className="mr-2"
                        />
                        Add new card
                      </span>
                    }
                    name="paymentMethod"
                    id="newCard"
                  />
                  <Form.Check
                    className="payment-checks"
                    type="radio"
                    label={
                      <span>
                        <img
                          src={
                            "https://e7.pngegg.com/pngimages/711/9/png-clipart-paypal-logo-brand-font-payment-paypal-text-logo-thumbnail.png"
                          }
                          alt="Google Pay"
                          width="50"
                          className="mr-2"
                        />
                        Google Pay
                      </span>
                    }
                    name="paymentMethod"
                    id="googlePay"
                  />
                </Form>
              </Card.Body>
            </Card> */}

            <Card className="mb-3">
              <Card.Body>
                <h5 className="paywithname border-bottom pb-3">
                  Review item and shipping
                </h5>
                {status === 1 ? (
                  cartList &&
                  cartList?.map((data, index) => (
                    <Row className="mt-3 border-bottom pb-3" key={index}>
                      <Col md={2}>
                        <Image src={data?.product_image_path} fluid />
                      </Col>
                      <Col md={10}>
                        <Card.Title className="card-titlesss">
                          {formatCapitalize(data?.product_name)}
                        </Card.Title>
                        <b>US ${data?.product_price * data?.cart_quantity}</b>
                        <Row>
                          <Col md={10}>
                            <Form.Group controlId="quantity">
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Quantity
                              </p>
                              <Form.Control
                                as="select"
                                className="w-25"
                                value={data?.cart_quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    index,
                                    Number(e.target.value)
                                  )
                                }
                              >
                                {[...Array(10).keys()].map((num) => (
                                  <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <p
                              className="text-primary"
                              style={{ cursor: "pointer", fontSize: "14px" }}
                              onClick={() => confirmDeletion(data?.id)}
                            >
                              <u>Remove</u>
                            </p>
                          </Col>
                        </Row>
                        <p className="m-0" style={{ fontSize: "14px" }}>
                          <strong>Delivery:</strong> .........!
                        </p>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <Row className="mt-3 border-bottom pb-3">
                    <Col md={2}>
                      <Image
                        src={
                          productDetails?.product_images?.[0]?.product_image ||
                          "path_to_default_image"
                        }
                        fluid
                      />
                    </Col>
                    <Col md={10}>
                      <Card.Title className="card-titlesss">
                        {formatCapitalize(productDetails?.name)}
                      </Card.Title>
                      <b>US ${totalPrice?.toFixed(2)}</b>
                      <Form.Group controlId="quantity">
                        <p className="m-0" style={{ fontSize: "14px" }}>
                          Quantity
                        </p>
                        <Form.Control
                          as="select"
                          className="w-25"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </Form.Control>
                      </Form.Group>
                      <p className="m-0" style={{ fontSize: "14px" }}>
                        <strong>Delivery:</strong> .........!
                      </p>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <h5 className="paywithname">Ship to</h5>
                {shipAddList?.map((item, index) => (
                  <Card.Text key={index}>
                    <Form.Check
                      type="radio"
                      id={`primary-address-${index}`}
                      name="primaryAddress"
                      checked={primaryAddress === index}
                      onChange={() => handlePrimaryChange(index)}
                      label={
                        <>
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            {item?.address_1}
                          </p>
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            {item?.address_2}, {item?.city_name}, (
                            {item?.pincode})
                          </p>
                        </>
                      }
                    />
                    <p className="addchanges">
                      <u>Changes</u>
                    </p>
                    <p className="addchanges">
                      <u>Edit</u>
                    </p>
                  </Card.Text>
                ))}
                <p className="addaddress">
                  <u>Add Address</u>
                </p>
              </Card.Body>
              {/* <Card.Body>
                <h5 className="paywithname">Ship to</h5>
                <Form action="javascript:void(0);">
                  <Row className="mb-2">
                    <Col md={6} className="mb-2">
                      <Form.Select>
                        <option value="">Select State</option>
                        <option value="1">USA</option>
                      </Form.Select>
                    </Col>
                    <Col md={6} className="mb-2">
                      <Form.Group controlId="city">
                        <Form.Select>
                          <option value="">Select State</option>
                          <option value="1">USA</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={6} className="mb-2">
                      <Form.Group controlId="state">
                        <Form.Control type="text" placeholder="Enter state" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-2">
                      <Form.Group controlId="zip">
                        <Form.Control type="text" placeholder="Enter zip" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={6} className="mb-2">
                      <Form.Group controlId="country">
                        <Form.Control type="text" placeholder="Enter country" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={3}>
                      <button className="btn mt-2 addsavebtn">Save</button>
                    </Col>
                    <Col md={3}>
                      <button className="btn mt-2 addcancelbtn">Cancel</button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body> */}
            </Card>
            <Card className="mt-4">
              <Card.Body>
                <Form.Group controlId="coupon">
                  <h5 className="paywithname">
                    Gift cards, coupons, atozbay Bucks{" "}
                  </h5>
                  <Form.Control type="text" placeholder="Enter code" />
                  <button className="btn mt-2 applybtn">Apply</button>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Form.Group controlId="charity">
                  <h5 className="paywithname">Donate to charity (optional)</h5>
                  <Form.Control as="select">
                    <option>None</option>
                    <option>Plan International</option>
                    <option>Other charity</option>
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Make a gift to Plan International USA, a girl's rights
                    organization that partners with girls and their communities
                    to overcome gender inequality. Donations are non-refundable
                    and typically tax deductible.
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="address-detailss">
            <Card>
              {status === 1 ? (
                <Card.Body>
                  <h5 className="paywithname">Order total</h5>
                  <Row>
                    <Col>Item ({cartList.length})</Col>
                    <Col className="text-right">${totalPrices?.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col className="text-right">$0</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Total</Col>
                    <Col className="text-right">
                      <b>${totalPrices?.toFixed(2)}</b>
                    </Col>
                  </Row>
                  <button className="btn mt-4 buynowbtn">
                    Confirm and Pay
                  </button>
                </Card.Body>
              ) : (
                <Card.Body>
                  <h5 className="paywithname">Order total</h5>
                  <Row>
                    <Col>Item ({quantity})</Col>
                    <Col className="text-right">${totalPrice?.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col className="text-right">$0</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Total</Col>
                    <Col className="text-right">
                      <b>${totalPrice?.toFixed(2)}</b>
                    </Col>
                  </Row>
                  <button className="btn mt-4 buynowbtn">
                    Confirm and Pay
                  </button>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={8}></Col>
        </Row>
      </Container>
      <Footer />
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

export default CheckOut;
