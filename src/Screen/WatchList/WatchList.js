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
import { doller } from "../../Component/ReuseFormat/Doller";

const WatchList = () => {
  const navigate = useNavigate();
  const [watchList, setWatchList] = useState([]);
  const [load, setload] = useState(false);
  const { handleCartCount, wishListCount } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredWatchList = watchList?.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="sideallspace mt-3">
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
              <Col xs={12} md={6} lg={6}>
                <Form className="me-3">
                  <Form.Control
                    type="search"
                    placeholder="Search your Watchlist"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </Form>
              </Col>
            </Row>
            <Row className="mt-3 mb-3 d-flex align-items-end">
              <Col className="d-flex align-items-center justify-content-lg-end">
                <span>Status: All ({wishListCount})</span>
              </Col>
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
            {/* {filteredWatchList?.map((item, index) => (
              <>
                <input
                  type="checkbox"
                  checked={selectedProducts?.includes(item?.id)}
                  onChange={() => handleCheckboxChange(item?.id)}
                />
                <Card className="mb-3" key={index}>
                  <Row className="justify-content-around">
                    <Col className="text-center" xs={12} lg={2} md={2}>
                      <Card.Img
                        className="img-fluid  mt-lg-4 ms-lg-3"
                        src={item?.product_image_path}
                        style={{
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                        onClick={() => viewProduct(item?.product_id)}
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
            ))} */}
            {filteredWatchList?.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={selectedProducts?.includes(item?.id)}
                  onChange={() => handleCheckboxChange(item?.id)}
                />
                <Card
                  className="mb-3 p-3"
                  style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  <Row
                    className="justify-content-around align-items-center"
                    style={{ height: "100%" }}
                  >
                    {/* Product Image */}
                    <Col className="text-center" xs={12} lg={2} md={2}>
                      <div
                        style={{
                          width: "100%",
                          paddingTop: "100%", // Maintains aspect ratio of 1:1
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "12px",
                          backgroundColor: "#f8f9fa",
                        }}
                      >
                        <Card.Img
                          className="img-fluid"
                          src={item?.product_image_path}
                          style={{
                            objectFit: "contain",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.3s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                          onClick={() => viewProduct(item?.product_id)}
                        />
                      </div>
                    </Col>

                    {/* Product Information */}
                    <Col xs={12} lg={6} md={6}>
                      <Card.Body>
                        <Card.Title
                          className="watch-title"
                          style={{
                            fontWeight: "600",
                            fontSize: "1.20rem",
                            marginBottom: "8px",
                          }}
                          onClick={() => viewProduct(item?.product_id)}
                        >
                          {formatCapitalize(item?.product_name)}
                        </Card.Title>
                        <Card.Text>
                          Condition: <b>Pre-owned</b>
                        </Card.Text>
                        <Row>
                          <Col xs={6} md={4}>
                            <Card.Text
                              style={{
                                fontSize: "14px",
                                color: "#666",
                                marginBottom: "0",
                              }}
                            >
                              ITEM PRICE:
                            </Card.Text>
                            <Card.Text
                              style={{
                                fontWeight: "700",
                                fontSize: "1.2rem",
                                color: "#000",
                              }}
                            >
                              {doller.Aud} {item?.product_price}
                            </Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>

                    {/* Action Buttons */}
                    <Col className="text-center" xs={12} lg={4} md={6}>
                      <div className="mt-3">
                        <Button
                          className="fill-btn"
                          style={{
                            backgroundColor: "#3665f3",
                            color: "#fff",
                            width: "100%",
                            padding: "10px 0",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            marginBottom: "10px",
                          }}
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
                            style={{
                              backgroundColor: "#fff",
                              color: "#007bff",
                              width: "100%",
                              padding: "10px 0",
                              fontSize: "1rem",
                              borderRadius: "8px",
                              border: "1px solid #007bff",
                              marginBottom: "10px",
                            }}
                            onClick={() => viewInCart()}
                          >
                            View in cart
                          </Button>
                        ) : (
                          <Button
                            className="no-fill-btn"
                            style={{
                              backgroundColor: "#fff",
                              color: "#007bff",
                              width: "100%",
                              padding: "10px 0",
                              fontSize: "1rem",
                              borderRadius: "8px",
                              border: "1px solid #007bff",
                              marginBottom: "10px",
                            }}
                          >
                            View other items
                          </Button>
                        )}
                      </div>
                      <div className="mt-2">
                        <Button
                          className="no-fill-btn"
                          style={{
                            backgroundColor: "#fff",
                            color: "#007bff",
                            width: "100%",
                            padding: "10px 0",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #007bff",
                          }}
                        >
                          More Actions
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}
          </Col>
        </Row>
      </div>
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
