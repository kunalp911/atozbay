import React, { useEffect, useState } from "react";
import Header from "../../../Component/Header/Header";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";
import "../OrderList/OrderList.css";
import { doller } from "../../../Component/ReuseFormat/Doller";

const SellerOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    setLoad(true);
    const payload = {
      page: 0,
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.SellerOrderList
      );
      if (response.success == true) {
        setOrders(response.result);
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  return (
    <div>
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Header />
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="selling" bidchild="ordersell" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">Order List</h2>
              </Col>
            </Row>
            <Row>
              {orders?.map((order) => (
                <Col xs={12} md={6} lg={3} key={order.id} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>Order #{order?.id}</Card.Title>
                      <Card.Text style={{ fontSize: "14px" }}>
                        Total:{" "}
                        <b>
                          {doller.Aud} {order.total}
                        </b>
                        <br />
                        Shipping Charge:{" "}
                        <b>
                          {doller.Aud} {order?.shipping_charge}
                        </b>
                        <br />
                        Order Status: <b>{order?.order_status}</b>
                        <br />
                        Payment Status: <b>{order?.payment_status ?? "Null"}</b>
                        <br />
                        Created At:{" "}
                        <b>
                          {new Date(order?.created_at).toLocaleDateString()}
                        </b>
                      </Card.Text>
                      <Link to={`/seller-order-details/${order.id}`}>
                        <button className="btn orderdetailbtn">Details</button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
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

export default SellerOrderList;
