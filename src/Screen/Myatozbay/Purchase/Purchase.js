import React, { useEffect, useState } from "react";
import Header from "../../../Component/Header/Header";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { Box, CircularProgress, Pagination } from "@mui/material";
import "../../Orders/OrderList/OrderList.css";
import { doller } from "../../../Component/ReuseFormat/Doller";

const Purchase = () => {
  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getProductList(page);
  }, [page]);

  const getProductList = async (page) => {
    setLoad(true);
    const payload = {
      page: page - 1,
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.OrderList
      );
      if (response.success == true) {
        setOrders(response.result);
        setTotalPages(Math.ceil(response.orders_count / 20));
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  return (
    <div>
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="purchase" />
          </Col>
          <Col md={10}>
            <Row>
              <Col>
                <h2 className="helo">Orders</h2>
              </Col>
              {/* <Col>
                <div className="mb-3">
                  <input
                    type="search"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Search your orders"
                  />
                </div>
              </Col> */}
            </Row>
            <Row>
              {orders?.map((order) => (
                <Col xs={12} md={6} lg={3} key={order.id} className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={order?.order_product[0]?.product_image_path ?? ""}
                      alt={`Product image for order #${order.id}`}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
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
                        Payment Status: <b>{order?.payment_status ?? "Null"}</b>
                        <br />
                        Created At:{" "}
                        <b>
                          {new Date(order?.created_at).toLocaleDateString()}
                        </b>
                      </Card.Text>
                      <Link to={`/order-details/${order.id}`}>
                        <button className="btn orderdetailbtn">Details</button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  showFirstButton
                  showLastButton
                />
              </Box>
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
export default Purchase;
