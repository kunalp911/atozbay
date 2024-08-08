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
import { AuctionTimer } from "../../../Component/AuctionTimer/AuctionTimer";

const AuctionProduct = () => {
  const navigate = useNavigate();
  const [shopProductLists, setShopProductLists] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const itemsPerPage = 20;
  console.log("shopProductLists", shopProductLists);

  useEffect(() => {
    getShopProductList(page);
  }, [page]);

  const viewProduct = (id) => {
    navigate(`/product/${id}`, { state: { bidStatus: 1 } });
  };

  const getShopProductList = async (page) => {
    const payload = { page: page - 1, auction_product: 1 };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ShopProductList
      );
      if (response.success) {
        setShopProductLists(response.result);
        setCount(response.product_count);
      }
    } catch (error) {
      console.error("Error fetching shop products:", error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentItems = shopProductLists;

  return (
    <div>
      <Header />
      <Container className="mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="biddinghis" bidchild="auctionp" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">Auction Products</h2>
              </Col>
            </Row>
            {/* <Row className="mt-3 mb-3 d-flex align-items-end">
              <Col className="d-flex align-items-center justify-content-lg-end">
                <span>Status: All ({wishListCount})</span>
              </Col>
            </Row> */}
            {currentItems?.map((item, index) => (
              <>
                <Card className="mb-3" key={index}>
                  <Row className="justify-content-around">
                    <Col className="text-center" xs={12} lg={2} md={2}>
                      <Card.Img
                        className="img-fluid  mt-lg-4 ms-lg-3"
                        src={item?.product_images[0]?.product_image}
                        style={{
                          objectFit: "contain",
                        }}
                        onClick={() => viewProduct(item?.id)}
                      />
                    </Col>
                    <Col xs={12} lg={10} md={10}>
                      <div className="d-flex justify-content-end mr-2">
                        <AuctionTimer
                          createdAt={item?.created_at}
                          auctionDuration={
                            item?.product_prices?.auction_duration
                          }
                        />
                      </div>
                      <Card.Body>
                        <Card.Title
                          className="watch-title m-0"
                          onClick={() => viewProduct(item?.id)}
                        >
                          {formatCapitalize(item?.name)}
                        </Card.Title>
                        <p className="m-0 text-muted">
                          {item?.condition_description}
                        </p>
                        <Card.Text>
                          Condition: <b>{item?.item_condition}</b>
                        </Card.Text>
                        <Row>
                          <Col xs={6} md={4}>
                            <Card.Text
                              style={{ fontSize: "14px", marginBottom: "0" }}
                            >
                              ITEM PRICE:
                            </Card.Text>
                            <Card.Text className="font-weight-bold">
                              US ${item?.product_prices?.price}
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

export default AuctionProduct;
