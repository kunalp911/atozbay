import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../Component/context/AuthContext";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { toast } from "react-toastify";
import Header from "../../../Component/Header/Header";
import { Box, CircularProgress, Pagination } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import { formatCapitalize } from "../../../Component/ReuseFormat/ReuseFormat";
import Footer from "../../../Component/Footer/Footer";
import "./biddinghis.css";
import { doller } from "../../../Component/ReuseFormat/Doller";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const AllProduct = () => {
  const navigate = useNavigate();
  const [shopProductLists, setShopProductLists] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [load, setload] = useState(false);
  const [keyword, setKeyword] = React.useState("");
  const debouncedKeyword = useDebounce(keyword, 500);
  const itemsPerPage = 20;

  useEffect(() => {
    getShopProductList(page);
  }, [page, debouncedKeyword]);

  const viewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const getShopProductList = async (page) => {
    const payload = { page: page - 1, keyword: debouncedKeyword };
    try {
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ShopProductList
      );
      if (response.success) {
        setShopProductLists(response.result);
        setCount(response.product_count);
        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      console.error(error);
      setload(false);
    }
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const currentItems = shopProductLists;

  const handleSearch = (event) => {
    setKeyword(event.target.value);
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
            <Sidebar status="biddinghis" bidchild="all" />
          </Col>
          <Col md={10}>
            <Row className="mt-3 mb-3">
              <Col xs={12} md={6}>
                <h2 className="helo"> All Products</h2>
              </Col>
              <Col xs={12} md={6} className="d-flex justify-content-end">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={keyword}
                  onChange={handleSearch}
                />
              </Col>
            </Row>
            {currentItems?.map((item, index) => (
              <Card
                className="mb-4 p-3"
                key={index}
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
                  <Col className="text-center" xs={12} lg={3} md={3}>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "100%",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "12px",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <Card.Img
                        className="img-fluid"
                        src={item?.product_images[0]?.product_image}
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
                        onClick={() => viewProduct(item?.slug)}
                      />
                    </div>
                  </Col>
                  <Col xs={12} lg={9} md={9}>
                    <Card.Body
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Card.Title
                        className="watch-title m-0"
                        style={{
                          fontWeight: "600",
                          fontSize: "1.20rem",
                          marginBottom: "8px",
                        }}
                        onClick={() => viewProduct(item?.slug)}
                      >
                        {formatCapitalize(item?.name)}
                      </Card.Title>
                      <p
                        className="m-0 text-muted"
                        style={{
                          fontSize: "0.875rem",
                          color: "#6c757d",
                          marginBottom: "16px",
                        }}
                      >
                        {item?.description}
                      </p>
                      <Card.Text
                        style={{ fontSize: "0.9rem", marginBottom: "16px" }}
                      >
                        Condition: <b>{item?.item_condition}</b>
                      </Card.Text>
                      <Row>
                        <Col xs={6} md={4}>
                          <Card.Text
                            style={{
                              fontSize: "0.875rem",
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
                            {doller.Aud} {item?.product_prices?.price}
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
        </Row>
        {count > itemsPerPage && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(count / itemsPerPage)}
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          </Box>
        )}
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

export default AllProduct;
