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
import "./bidding.css";
import Review from "../../../Component/Review/Review";
import { doller } from "../../../Component/ReuseFormat/Doller";

const BidandOffer = () => {
  const navigate = useNavigate();
  const [bidProductList, setBidProductList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const itemsPerPage = 20;

  useEffect(() => {
    getShopProductList();
  }, []);

  const viewProduct = (id) => {
    navigate(`/product/${id}`, { state: { bidStatus: 1 } });
  };

  const getShopProductList = async (page) => {
    const payload = { page: page - 1, auction_product: 1 };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.UserBidList
      );
      if (response.success) {
        setBidProductList(response.result);
        // setCount(response.product_count);
      }
    } catch (error) {
      console.error("Error fetching shop products:", error);
    }
  };

  // const handleChange = (event, value) => {
  //   setPage(value);
  // };

  // const currentItems = shopProductLists;

  return (
    <div>
      <Header />
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="bidding" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">Bidding</h2>
              </Col>
            </Row>
            {bidProductList?.length == 0 && (
              <p className="text-center mt-5 text-muted">No Bidding</p>
            )}
            {bidProductList?.map((item, index) => (
              <>
                {/* <Card className="mb-3" key={index}>
                  <Row className="justify-content-around">
                    <Col className="text-center" xs={12} lg={2} md={2}>
                      <Card.Img
                        className="img-fluid  mt-lg-4 ms-lg-3 mb-3"
                        src={item?.product_image_path}
                        style={{
                          objectFit: "contain",
                        }}
                        onClick={() => viewProduct(item?.product_id)}
                      />
                    </Col>
                    <Col xs={12} lg={10} md={10}>
                      <Card.Body>
                        <Card.Title
                          className="watch-title m-0"
                          onClick={() => viewProduct(item?.product_id)}
                        >
                          {formatCapitalize(item?.product_name)}
                        </Card.Title>
                        <p className="m-0 text-muted">
                          {item?.condition_description}
                        </p>
                        <Row className="mt-3">
                          <Col xs={6} md={4}>
                            <Card.Text
                              style={{ fontSize: "14px", marginBottom: "0" }}
                            >
                              Bidding Price:
                            </Card.Text>
                            <Card.Text className="font-weight-bold">
                              US ${item?.bid_price}
                            </Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card> */}
                <Card
                  className="mb-4 p-2"
                  key={index}
                  style={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    border: "none",
                  }}
                  // onMouseEnter={(e) =>
                  //   (e.currentTarget.style.transform = "scale(1.02)")
                  // }
                  // onMouseLeave={(e) =>
                  //   (e.currentTarget.style.transform = "scale(1)")
                  // }
                >
                  <Row className="justify-content-around">
                    <Col className="text-center" xs={12} lg={3} md={3}>
                      <div
                        style={{
                          width: "100%",
                          paddingTop: "100%", // Maintains aspect ratio of 1:1
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "10px",
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
                            cursor: "pointer",
                          }}
                          onClick={() => viewProduct(item?.product_id)}
                        >
                          {formatCapitalize(item?.product_name)}
                        </Card.Title>
                        <Row className="mt-3">
                          <Col xs={6} md={4}>
                            <Card.Text
                              style={{
                                fontSize: "0.875rem",
                                color: "#666",
                                marginBottom: "0",
                              }}
                            >
                              Bidding Price:
                            </Card.Text>
                            <Card.Text
                              style={{
                                fontWeight: "700",
                                fontSize: "1rem",
                                color: "#000",
                              }}
                            >
                              {doller.Aud} {item?.bid_price}
                            </Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </>
            ))}
          </Col>
        </Row>
        {/* {count > itemsPerPage && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(count / itemsPerPage)}
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          </Box>
        )} */}
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

export default BidandOffer;
