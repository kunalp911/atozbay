import React from "react";
import Header from "../../../Component/Header/Header";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";

const Summary = () => {
  return (
    <div>
      <Header />
      <Container className="mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="summary" />
          </Col>
          <Col md={10}>
            <Row>
              <Col>
                <h2 className="helo">Summary</h2>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Summary;
