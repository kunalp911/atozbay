import React from "react";
import Header from "../../Component/Header/Header";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../Myatozbay/Sidebar/Sidebar";

const HelpFees = () => {
  return (
    <div>
      {" "}
      <Header />
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="help" bidchild="help" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">atozbay Help Fees</h2>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HelpFees;
