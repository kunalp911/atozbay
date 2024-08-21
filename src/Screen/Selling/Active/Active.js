import React, { useEffect } from "react";
import Header from "../../../Component/Header/Header";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../../Network_Call/apiservices";
import { formatCapitalize } from "../../../Component/ReuseFormat/ReuseFormat";
import { doller } from "../../../Component/ReuseFormat/Doller";
import { CircularProgress } from "@mui/material";

const Active = () => {
  const [productLists, setProductLists] = React.useState([]);
  const [load, setload] = React.useState(false);

  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = () => {
    const payload = {
      page: 0,
      keyword: "",
      category_id: "",
      // active_auction_product: 1,
      status: 1,
    };
    try {
      setload(true);
      apiCallNew("post", payload, ApiEndPoints.ProductList).then((response) => {
        if (response.success) {
          setProductLists(response.result);
          setload(false);
        } else {
          setload(false);
        }
      });
    } catch (error) {
      console.log(error);
      setload(false);
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
            <Sidebar status="selling" bidchild="active" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">Active</h2>
              </Col>
            </Row>
            {productLists?.map((item, index) => (
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
                        // onClick={() => viewProduct(item?.slug)}
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
                        // onClick={() => viewProduct(item?.slug)}
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
            {productLists?.length === 0 && (
              <div className="text-center mt-5">
                <p className="text-muted">No Product Found</p>
              </div>
            )}
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
export default Active;
