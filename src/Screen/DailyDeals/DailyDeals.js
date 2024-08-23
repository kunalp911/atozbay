import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatCapitalize } from "../../Component/ReuseFormat/ReuseFormat";
import { doller } from "../../Component/ReuseFormat/Doller";

const DailyDeals = () => {
  const navigate = useNavigate();
  const [shopProductLists, setShopProductLists] = useState([]);
  const [load, setload] = useState(false);

  useEffect(() => {
    getShopProductList();
  }, []);

  const getShopProductList = async () => {
    const payload = { page: 0, today_deal: 1, keyword: "" };
    try {
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ShopProductList
      );
      if (response.success) {
        setShopProductLists(response.result);
        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      console.error("Error fetching shop products:", error);
      setload(false);
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
      <div className="sideallspace mt-3 mb-3">
        <h4 className="helo mb-3">Deals</h4>
        <Row className="justify-content-centes">
          {shopProductLists?.map((item) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item.id}
              className="mb-4 d-flex"
            >
              <Card
                className="mainsscart w-100"
                onClick={() => navigate(`/product/${item.slug}`)}
              >
                <Card.Img
                  variant="top"
                  src={item?.product_images[0]?.product_image ?? ""}
                  alt={item?.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="">
                  <p className="titledescrip font-weight-bold mt-2 mb-1">
                    {formatCapitalize(item?.name)}
                  </p>
                  <Card.Text style={{ fontSize: "15px" }}>
                    <p className="descriptionsass">{item.description}</p>
                    <b>
                      {doller.Aud} {item?.product_prices?.price}
                    </b>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
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

export default DailyDeals;
