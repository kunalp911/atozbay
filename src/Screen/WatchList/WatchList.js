import React from "react";

import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
// import "../../../src/Assets/css/test.css";
import "./watch.css";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  DropdownButton,
  Card,
  Dropdown,
} from "react-bootstrap";
import "./watch.css";

const WatchList = () => {
  return (
    <div>
      <Header />
      <Container>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <h2 className="helo">My atozbay - Watchlist</h2>
          </Col>
          <Col
            xs={12}
            md={6}
            lg={6}
            className="d-flex align-items-center justify-content-end"
          >
            <Form className="me-3">
              <Form.Control type="text" placeholder="Search your Watchlist" />
            </Form>
            <Button className="watch-search" style={{ borderRadius: "25px" }}>
              Search
            </Button>
          </Col>
        </Row>
        <Row className="mt-3 d-flex align-items-center">
          <Col
            xs={6}
            md={6}
            lg={9}
            className="d-flex align-items-center justify-content-lg-end"
          >
            <span>Status: All (2)</span>
          </Col>
          <Col
            xs={6}
            md={6}
            lg={3}
            className="d-flex    align-items-center justify-content-end"
          >
            <span className="me-2">Sort:</span>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Price Highest
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Price Highest</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Price Lowest</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Newest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} lg={12} md={6} className="mb-3 text-start">
            <Button variant="outline-primary" className="me-2">
              All Categories (2)
            </Button>
            <Button variant="outline-primary me-2">Men (2)</Button>
            <Button disabled variant="outline-primary">
              Delete
            </Button>
          </Col>
        </Row>
        {/* <Row className="mt-3 justify-content-around bg-light">
          <Col className="mt-2" xs={12} lg={2} xl={2} md={6}>
            <div className="card bg-dark">
              <div className="card-img-top">
                <Image
                  src="https://i.ebayimg.com/images/g/ICIAAOSwv1FmgDAy/s-l500.jpg"
                  className="img-fluid"
                />
              </div>
            </div>
          </Col>
          <Col className="mt-2" xs={12} lg={4} xl={4} md={6}>
            <div>
              <div>
                <p className="">
                  Size 13 - Jordan1 Retro OG High UNC Toe <br />
                  Condition: Pre-owend
                </p>
              </div>
              <div className="d-flex gap-5">
                <div>
                  <span className="d-block">ITEM PRICE:</span>
                  <span className="d-block fw-bold">US $155.00</span>
                  <span className="d-block mt-1">+US $89.03</span>
                </div>
                <div>
                  <span className="d-block">ITEM PRICE:</span>
                  <span className="d-block fw-bold">US $155.00</span>
                  <span className="d-block mt-1">+US $89.03</span>
                </div>
                <div>
                  <span className="d-block">ITEM PRICE:</span>
                  <span className="d-block fw-bold">US $155.00</span>
                  <span className="d-block mt-1">+US $89.03</span>
                </div>
              </div>
            </div>
          </Col>
          <Col className="text-center mt-2" xs={12} lg={4} xl={4} md={6}>
            3
          </Col>
        </Row> */}
        <input type="checkbox" />
        <Card className="mb-3">
          <Row className="justify-content-around">
            <Col className="text-center" xs={12} lg={2} md={2}>
              <Card.Img
                className="img-fluid  mt-lg-4 ms-lg-3"
                src="https://i.ebayimg.com/images/g/ICIAAOSwv1FmgDAy/s-l500.jpg"
              />
            </Col>
            <Col xs={12} lg={6} md={6}>
              <Card.Body>
                <Card.Title>
                  Size 13 - Jordan 1 Retro OG High UNC Toe
                </Card.Title>
                <Card.Text>Condition: Pre-owned</Card.Text>
                <Row>
                  <Col xs={6} md={4}>
                    <Card.Text>ITEM PRICE:</Card.Text>
                    <Card.Text className="font-weight-bold">
                      US $155.00
                    </Card.Text>
                    <Card.Text>+US $89.03</Card.Text>
                    <Card.Text className="mt-3 text-center watch">
                      22 watching
                    </Card.Text>
                  </Col>
                  <Col xs={6} md={4}>
                    <Card.Text>TIME ENDS:</Card.Text>
                    <Card.Text className="font-weight-bold">Jul-29</Card.Text>
                    <Card.Text>09:04</Card.Text>
                  </Col>
                  <Col xs={6} md={4}>
                    <Card.Text className="">SELLER:</Card.Text>
                    <Card.Text className="font-weight-bold">
                      <a href="#">oglium (196)</a>
                    </Card.Text>
                    <Card.Text>100% positive feedback</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Col>

            <Col className="text-center" xs={12} lg={4} md={6}>
              <div className="mt-3">
                <Button className="fill-btn">Buy It Now</Button>
              </div>
              <div className="mt-2">
                <Button className="no-fill-btn" block>
                  Make Best Offer
                </Button>
              </div>
              <div className="mt-2">
                <Button className="no-fill-btn" block>
                  More Actions
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
        <input type="checkbox" />
        <Card className="mb-3">
          <Row className="justify-content-around">
            <Col className="text-center" xs={12} lg={2} md={2}>
              <Card.Img
                className="img-fluid  mt-lg-4 ms-lg-3"
                src="https://i.ebayimg.com/images/g/ICIAAOSwv1FmgDAy/s-l500.jpg"
              />
            </Col>
            <Col xs={12} lg={6} md={6}>
              <Card.Body>
                <Card.Title>
                  Size 13 - Jordan 1 Retro OG High UNC Toe
                </Card.Title>
                <Card.Text>Condition: Pre-owned</Card.Text>
                <Row>
                  <Col xs={6} md={4}>
                    <Card.Text>ITEM PRICE:</Card.Text>
                    <Card.Text className="font-weight-bold">
                      US $155.00
                    </Card.Text>
                    <Card.Text>+US $89.03</Card.Text>
                    <Card.Text className="mt-3 text-center watch">
                      22 watching
                    </Card.Text>
                  </Col>
                  <Col xs={6} md={4}>
                    <Card.Text>TIME ENDS:</Card.Text>
                    <Card.Text className="font-weight-bold">Jul-29</Card.Text>
                    <Card.Text>09:04</Card.Text>
                  </Col>
                  <Col xs={6} md={4}>
                    <Card.Text className="">SELLER:</Card.Text>
                    <Card.Text className="font-weight-bold">
                      <a href="#">oglium (196)</a>
                    </Card.Text>
                    <Card.Text>100% positive feedback</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Col>

            <Col className="text-center" xs={12} lg={4} md={6}>
              <div className="mt-3">
                <Button className="fill-btn">Buy It Now</Button>
              </div>
              <div className="mt-2">
                <Button className="no-fill-btn" block>
                  Make Best Offer
                </Button>
              </div>
              <div className="mt-2">
                <Button className=" no-fill-btn" block>
                  More Actions
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default WatchList;
