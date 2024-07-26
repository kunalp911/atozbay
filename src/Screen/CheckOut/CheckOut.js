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
import { useLocation } from "react-router-dom";
import { formatCapitalize } from "../../Component/ReuseFormat/ReuseFormat";
import { Typography } from "@mui/material";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
const CheckOut = () => {
  const location = useLocation();
  const data = location?.state;
  const [quantity, setQuantity] = useState(data?.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(
    data?.product?.product_prices?.price
  );
  const [shipAddList, setShipAddList] = useState([]);
  const [primaryAddress, setPrimaryAddress] = useState(0);

  const handlePrimaryChange = (index) => {
    setPrimaryAddress(index);
  };
  console.log("shipAddList", shipAddList, primaryAddress);
  useEffect(() => {
    setTotalPrice(quantity * data?.product?.product_prices?.price);
  }, [quantity, data?.product?.product_prices?.price]);

  useEffect(() => {
    getShipAddressList();
  }, []);
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
  return (
    <div>
      <Header />
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
                <h5 className="paywithname">Review item and shipping</h5>
                <Row className="mt-3">
                  <Col md={2}>
                    <Image
                      src={data?.product?.product_images[0]?.product_image}
                      fluid
                    />
                  </Col>
                  <Col md={10}>
                    <Card.Title className="card-titlesss">
                      {formatCapitalize(data?.product?.name)}
                    </Card.Title>
                    <b>US ${totalPrice?.toFixed(2)}</b>
                    <Form.Group controlId="quantity">
                      <Form.Label>Quantity</Form.Label>
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
                    <Card.Text>
                      <strong>Delivery:</strong> Est. delivery: Aug 27 – Sep 12
                      <br />
                      atozbay International Shipping <b>US $0</b>
                      <br />
                      Authorities may apply duties, fees, and taxes upon
                      delivery
                    </Card.Text>
                  </Col>
                </Row>
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
                          <p className="mb-0">{item?.address_1}</p>
                          <p className="mb-0">
                            {item?.address_2}, {item?.city_name}, (
                            {item?.pincode})
                          </p>
                        </>
                      }
                    />
                    <Typography color="primary" className="addchanges">
                      <u>Changes</u>
                    </Typography>
                    <Typography color="primary" className="addchanges">
                      <u>Edit</u>
                    </Typography>
                  </Card.Text>
                ))}
                <Typography color="primary" className="addaddress">
                  <u>Add Address</u>
                </Typography>
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
                <button className="btn mt-4 buynowbtn">Confirm and Pay</button>
              </Card.Body>
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

export default CheckOut;
