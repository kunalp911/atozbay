import React from "react";
import Header from "../../../Component/Header/Header";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";

const Purchase = () => {
  return (
    <div>
      <Header />
      <Container className="mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="purchase" />
          </Col>
          <Col md={10}>
            <Row>
              <Col>
                <h2 className="helo">Purchase</h2>
              </Col>
              <Col>
                <div className="mb-3">
                  <input
                    type="search"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Search your orders"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Purchase;
