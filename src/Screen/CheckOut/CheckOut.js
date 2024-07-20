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
const CheckOut = () => {
  const location = useLocation();
  const data = location?.state;
  const [quantity, setQuantity] = useState(data?.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(
    data?.product?.product_prices?.price
  );

  useEffect(() => {
    setTotalPrice(quantity * data?.product?.product_prices?.price);
  }, [quantity, data?.product?.product_prices?.price]);

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
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      defaultValue="kunal"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      defaultValue="indore, MP 452001"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      defaultValue="911123711"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
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
