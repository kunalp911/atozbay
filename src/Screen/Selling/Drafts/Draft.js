import React, { useEffect, useState } from "react";
import Header from "../../../Component/Header/Header";
import { CircularProgress } from "@mui/material";
import { Button, Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../../Network_Call/apiservices";
import { formatCapitalize } from "../../../Component/ReuseFormat/ReuseFormat";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Draft = () => {
  const navigate = useNavigate();
  const [productLists, setProductLists] = React.useState([]);
  const [load, setload] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    }
  };

  const getProductList = () => {
    const payload = {
      page: 0,
      status: 2,
    };
    try {
      setload(true);
      apiCallNew("post", payload, ApiEndPoints.ProductList).then((response) => {
        if (response.success) {
          setProductLists(response.result);
          setload(false);
        }
      });
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const deleteProducts = async () => {
    try {
      for (let id of selectedProducts) {
        await apiCallNew("delete", {}, ApiEndPoints.ProductSellDelete + id);
      }
      toast.success("Selected products have been deleted.");
      getProductList();
      setSelectedProducts([]);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting products.");
    }
  };

  const handleUpdate = (product) => {
    navigate("/add-product", { state: { product: product, statuss: "draft" } });
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
            <Sidebar status="selling" bidchild="draft" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">Drafts</h2>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={12} lg={12} md={6} className="mb-3 text-start">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      const allProductIds = productLists.map((item) => item.id);
                      setSelectedProducts(allProductIds);
                    } else {
                      setSelectedProducts([]);
                    }
                  }}
                />
                <button
                  className="btn watch-delete"
                  onClick={deleteProducts}
                  disabled={selectedProducts.length === 0}
                >
                  Delete
                </button>
              </Col>
            </Row>
            {productLists?.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p>No product found</p>
              </div>
            )}
            {productLists?.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(item.id)}
                  onChange={(e) => handleCheckboxChange(e, item.id)}
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
                    <Col className="text-center" xs={12} lg={2} md={2}>
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
                          src={item?.product_images[0]?.product_image ?? " "}
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
                          //   onClick={() => viewProduct(item?.product_slug)}
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
                          onClick={() => handleUpdate(item)}
                        >
                          {formatCapitalize(item?.name)}
                        </Card.Title>
                        <Card.Text
                          className="m-0 text-muted"
                          style={{
                            fontSize: "0.875rem",
                            color: "#6c757d",
                            marginBottom: "16px",
                          }}
                        >
                          Updated:{" "}
                          {moment(item?.created_at).format(
                            "MMM DD, YYYY, h:mm A"
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Col>

                    {/* Action Buttons */}
                    <Col className="text-center" xs={12} lg={4} md={6}>
                      <div className="mt-3">
                        <Button
                          className="fill-btn"
                          style={{
                            backgroundColor: "#fff",
                            color: "#007bff",
                            width: "100%",
                            padding: "10px 0",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            marginBottom: "10px",
                            border: "1px solid #3665f3",
                          }}
                          onClick={() => handleUpdate(item)}
                        >
                          Resume draft
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
export default Draft;
