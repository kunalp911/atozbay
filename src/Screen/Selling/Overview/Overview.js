import React from "react";
import Header from "../../../Component/Header/Header";
import { Button, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Container className="mt-3">
        <h4 className="helo">My atozbay Selling Overview</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="selling" />
          </Col>
          <Col md={10} className="mt-3">
            <Row className="text-center py-4 bg-light">
              <Col>
                <div>
                  <h3>0</h3>
                  <p className="text-primary">Active</p>
                </div>
              </Col>
              <Col>
                <div>
                  <h3>0</h3>
                  <p className="text-primary">Orders</p>
                </div>
              </Col>
              <Col>
                <div>
                  <h3>0</h3>
                  <p className="text-primary">Unsold</p>
                </div>
              </Col>
              <Col>
                <div>
                  <h3>$0.00</h3>
                  <p>90-day total</p>
                </div>
              </Col>
              <Col>
                <button
                  className="btn listanbutton ms-3"
                  onClick={() => navigate("/selling/list-item")}
                >
                  List an item
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Overview;
