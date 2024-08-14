import React, { useEffect, useState } from "react";
import Header from "../../../Component/Header/Header";
import { CircularProgress } from "@mui/material";
import { Card, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { useNavigate } from "react-router-dom";
import "./recently.css";
import { formatCapitalize } from "../../../Component/ReuseFormat/ReuseFormat";
import { doller } from "../../../Component/ReuseFormat/Doller";

const RecentlyView = () => {
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const savedIds = localStorage.getItem("uniqueIds");
  const uniqueIds = savedIds ? JSON.parse(savedIds) : [];
  const [recentViewList, setRecentViewList] = useState([]);

  useEffect(() => {
    getShopProductList();
  }, []);

  const getShopProductList = async () => {
    const formdata = new FormData();
    if (uniqueIds && uniqueIds.length > 0) {
      uniqueIds?.forEach((id) => {
        formdata.append("products_id[]", id);
      });
    } else {
      console.error("No IDs found in storedIds array");
      return;
    }
    try {
      setload(true);
      const response = await apiCallNew(
        "post",
        formdata,
        ApiEndPoints.ShopProductList
      );
      if (response.success) {
        setRecentViewList(response.result);
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
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="recently" />
          </Col>
          <Col md={10}>
            <Row>
              <Col>
                <h2 className="helo">Recently viewed</h2>
              </Col>
            </Row>
            <Row>
              {recentViewList?.map((item) => (
                <Col xs={12} md={6} lg={3} key={item.id} className="mb-4">
                  <Card
                    className="mainsscart"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <Card.Img
                      variant="top"
                      src={item?.product_images[0]?.product_image ?? ""}
                      alt={`Product image for order #${item.id}`}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <p className="font-weight-bold mt-2 mb-1">
                        {formatCapitalize(item?.category_name)}
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

export default RecentlyView;
