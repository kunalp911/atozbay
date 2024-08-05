import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "./watch.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./watch.css";
import { useNavigate } from "react-router-dom";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";
import { formatCapitalize } from "../../Component/ReuseFormat/ReuseFormat";
import { toast } from "react-toastify";
import { useCart } from "../../Component/context/AuthContext";
import Sidebar from "../Myatozbay/Sidebar/Sidebar";

const WatchList = () => {
  const navigate = useNavigate();
  const [watchList, setWatchList] = useState([]);
  const [load, setload] = useState(false);
  const { handleCartCount, wishListCount } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    getWatchList();
    getCartList();
  }, []);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const getWatchList = async () => {
    try {
      setload(true);
      const response = await apiCallNew("get", {}, ApiEndPoints.WishList);
      if (response.success === true) {
        setWatchList(response.result);
        handleCartCount();
        setload(false);
      } else {
        setload(false);
        setWatchList([]);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const getCartList = async () => {
    try {
      setload(true);
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.CartProductsList
      );
      if (response.success === true) {
        setCartList(response.result);
        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const removeCart = async (id) => {
    try {
      const response = await apiCallNew(
        "delete",
        {},
        ApiEndPoints.DeleteWishListProduct + id
      );
      if (response.success === true) {
        toast.success(response.msg);
        await getWatchList();
        handleCartCount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelectedProducts = () => {
    selectedProducts.forEach((id) => removeCart(id));
    setSelectedProducts([]);
  };

  const viewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const viewInCart = () => {
    navigate("/add-to-cart");
  };

  return (
    <div>
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Container className="mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="watchlist" />
          </Col>
          <Col md={10}>
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
                  <Form.Control
                    type="text"
                    placeholder="Search your Watchlist"
                  />
                </Form>
                <Button
                  className="watch-search"
                  style={{ borderRadius: "25px" }}
                >
                  Search
                </Button>
              </Col>
            </Row>
            <Row className="mt-3 mb-3 d-flex align-items-end">
              <Col className="d-flex align-items-center justify-content-lg-end">
                <span>Status: All ({wishListCount})</span>
              </Col>
              {/* <Col
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
          </Col> */}
            </Row>

            <Row className="mt-3">
              <Col xs={12} lg={12} md={6} className="mb-3 text-start">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === watchList?.length}
                  onChange={() => {
                    if (selectedProducts?.length === watchList?.length) {
                      setSelectedProducts([]);
                    } else {
                      setSelectedProducts(watchList?.map((item) => item?.id));
                    }
                  }}
                />
                <button
                  className="btn watch-delete"
                  onClick={deleteSelectedProducts}
                  disabled={selectedProducts?.length === 0}
                >
                  Delete
                </button>
              </Col>
            </Row>
            {watchList?.map((item, index) => (
              <>
                <input
                  type="checkbox"
                  checked={selectedProducts?.includes(item?.id)}
                  onChange={() => handleCheckboxChange(item?.id)}
                />
                <Card className="mb-3" key={index}>
                  <Row className="justify-content-around">
                    <Col className="text-center" xs={12} lg={2} md={2}>
                      {/* <div
                    className="card-img-containerss"
                    onClick={() => viewProduct(item?.product_id)}
                  >
                  </div> */}
                      <Card.Img
                        className="img-fluid  mt-lg-4 ms-lg-3"
                        src={item?.product_image_path}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </Col>
                    <Col xs={12} lg={6} md={6}>
                      <Card.Body>
                        <Card.Title
                          className="watch-title"
                          onClick={() => viewProduct(item?.product_id)}
                        >
                          {formatCapitalize(item?.product_name)}
                        </Card.Title>
                        <Card.Text>
                          Condition: <b>Pre-owned </b>
                        </Card.Text>
                        <Row>
                          <Col xs={6} md={4}>
                            <Card.Text
                              style={{ fontSize: "14px", marginBottom: "0" }}
                            >
                              ITEM PRICE:
                            </Card.Text>
                            <Card.Text className="font-weight-bold">
                              US ${item?.product_price}
                            </Card.Text>
                            {/* <Card.Text>+US $89.03</Card.Text>
                      <Card.Text className="mt-3 text-center watch">
                        22 watching
                      </Card.Text> */}
                          </Col>
                          {/* <Col xs={6} md={4}>
                        <Card.Text>TIME ENDS:</Card.Text>
                        <Card.Text className="font-weight-bold">
                          Jul-29
                        </Card.Text>
                        <Card.Text>09:04</Card.Text>
                      </Col> */}
                          <Col xs={6} md={4}>
                            {/* <Card.Text className="">SELLER:</Card.Text>
                        <Card.Text className="font-weight-bold">
                          <a href="#">oglium (196)</a>
                        </Card.Text> */}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>

                    <Col className="text-center" xs={12} lg={4} md={6}>
                      <div className="mt-3">
                        <Button
                          className="fill-btn"
                          onClick={() => viewProduct(item?.product_id)}
                        >
                          Buy It Now
                        </Button>
                      </div>
                      <div className="mt-2">
                        {cartList?.find(
                          (items) => items?.product_id === item?.product_id
                        ) ? (
                          <Button
                            className="no-fill-btn"
                            onClick={() => viewInCart()}
                          >
                            View in cart
                          </Button>
                        ) : (
                          <Button className="no-fill-btn" block>
                            View other items
                          </Button>
                        )}
                      </div>
                      <div className="mt-2">
                        <Button className="no-fill-btn" block>
                          More Actions
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </>
            ))}
          </Col>
        </Row>
      </Container>
      <Footer />
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

export default WatchList;
