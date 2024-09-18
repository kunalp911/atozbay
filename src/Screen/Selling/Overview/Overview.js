import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../Component/Header/Header";
import { Button, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { doller } from "../../../Component/ReuseFormat/Doller";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";

const Overview = () => {
  const navigate = useNavigate();
  const [overCount, setOverCount] = useState({});

  useEffect(() => {
    getOverCount();
  }, []);
  const getOverCount = useCallback(() => {
    try {
      apiCallNew("post", {}, ApiEndPoints.SellerDashboard).then((response) => {
        if (response.success) {
          setOverCount(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay Selling Overview</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="selling" bidchild="overview" />
          </Col>
          <Col md={10} className="mt-3">
            <Row className="text-center py-4 bg-light">
              <Col>
                <div>
                  <h3>{overCount?.active_product_count}</h3>
                  <Link to="/active">
                    <p className="text-primary">Active</p>
                  </Link>
                </div>
              </Col>
              <Col>
                <div>
                  <h3>{overCount?.orders_count}</h3>
                  <Link to="/seller-orders-list">
                    <p className="text-primary">Orders</p>
                  </Link>
                </div>
              </Col>
              <Col>
                <div>
                  <h3>{overCount?.draft_product_count}</h3>
                  <Link to="/drafts">
                    <p className="text-primary">Drafts</p>
                  </Link>
                </div>
              </Col>
              {/* <Col>
                <div>
                  <h3>{doller.Aud} 0.00</h3>
                  <p>90-day total</p>
                </div>
              </Col> */}
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
      </div>
    </div>
  );
};

export default Overview;
