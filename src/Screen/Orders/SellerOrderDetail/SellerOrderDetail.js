import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, ListGroup, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import Header from "../../../Component/Header/Header";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";
const SellerOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [load, setLoad] = useState(false);
  console.log("ORDERRR", order);

  useEffect(() => {
    getProduct();
  }, [id]);

  const {
    order_no,
    transaction_id,
    sub_total,
    shipping_charge,
    total,
    order_status,
    created_at,
    order_address,
    order_product,
  } = order;

  const getProduct = async () => {
    setLoad(true);
    try {
      const response = await apiCallNew(
        "get",
        null,
        `${ApiEndPoints.SellerOrderDetail}${id}`
      );
      if (response?.success == true) {
        setOrder(response?.result[0]);
        setLoad(false);
      }
    } catch (error) {
      console.log("ERROR", error);
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
      <Container className="mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="orderlist" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">Order Details</h2>
              </Col>
            </Row>
            <Card className="mt-3">
              <Card.Header>Order Information</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Order ID:</strong> {id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Transaction ID:</strong> {transaction_id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Subtotal:</strong> ${sub_total}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Shipping Charge:</strong> ${shipping_charge}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Total:</strong> ${total}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Status:</strong> {order_status}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Order Date:</strong>{" "}
                    {new Date(created_at).toLocaleDateString()}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Header>Shipping Address</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {order_address?.address_first_name}{" "}
                    {order_address?.address_last_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Address:</strong> {order_address?.address_1},{" "}
                    {order_address?.address_2}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>City:</strong> {order_address?.city_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Pincode:</strong> {order_address?.pincode}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Country Code:</strong> {order_address?.country_code}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Mobile Number:</strong>{" "}
                    {order_address?.mobile_number}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Header>Product Details</Card.Header>
              <Card.Body>
                {order_product?.map((product, index) => (
                  <Link to={`/product/${product?.product_id}`}>
                    {" "}
                    <Card key={index} className="mb-3">
                      <Row noGutters>
                        <Col md={4}>
                          <Image
                            src={product?.product_image_path}
                            alt={product?.product_name}
                            fluid
                          />
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <Card.Title>{product?.product_name}</Card.Title>
                            <Card.Text>
                              <strong>Price:</strong> ${product?.product_price}
                              <br />
                              <strong>Quantity:</strong> {product?.quantity}
                              <br />
                              <strong>Description:</strong>{" "}
                              {product?.description}
                              <br />
                              <strong>SKU:</strong> {product?.product_sku}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Link>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
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

export default SellerOrderDetail;
