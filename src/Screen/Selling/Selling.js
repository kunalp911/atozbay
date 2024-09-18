import React from "react";
import Header from "../../Component/Header/Header";
import "./selling.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/Footer/Footer";
import { Col, Row } from "react-bootstrap";
const Selling = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="" style={{ padding: "10px 40px" }}>
        <Row>
          <Col sm={12} md={6}>
            <h4 className="helo">Selling</h4>
          </Col>
          <Col className="d-flex justify-content-end">
            <button
              className="btn listanbutton"
              onClick={() => navigate("/product-list")}
            >
              Product List
            </button>
            <button
              className="btn listanbutton ms-3"
              onClick={() => navigate("/selling/select-condition")}
            >
              List an item
            </button>
          </Col>
        </Row>
        <div className="row my-4">
          <div className="col-12">
            <img
              src="https://i.ebayimg.com/00/s/NDk2WDE0NDA=/z/hcQAAOSwg2dj6n~7/$_57.JPG"
              alt="Luxury summer special"
              className="custom-image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Selling;
