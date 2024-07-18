import React, { useEffect, useState } from "react";
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ProductDetailsmodal from "../../../ShopCategoryComponent/ProductDetailsmodal";
import "./productlist.css";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Image,
  Button,
} from "react-bootstrap";

const ProductList = () => {
  const [productLists, setProductLists] = React.useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    try {
      apiCallNew("post", {}, ApiEndPoints.ProductList).then((response) => {
        if (response.success) {
          setProductLists(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      {/* <ProductDetailsmodal itemOpen={itemOpen} setItemOpen={setItemOpen} /> */}
      <div className="" style={{ padding: "0px 40px" }}>
        <div className="row">
          <div className="col-md-2">
            <div className="mt-2">
              <h3>Seller Hub</h3>
            </div>
          </div>
          <div className="col-md-10">
            <div className="mt-2">
              <h3>All Product</h3>
            </div>
            <div className="mt-2">
              <Container fluid className="my-4">
                {productLists?.map((product, index) => (
                  <Card className="mt-2">
                    <Card.Header className="d-flex justify-content-between">
                      <Typography variant="h6">
                        {index + 1}. Title: {product?.name}
                      </Typography>
                      <i className="fa fa-trash"></i>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={3}>
                          <ImageCarousel
                            productImages={product?.product_images}
                          />
                        </Col>
                        <Col md={9}>
                          <Table responsive bordered>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>SKU</strong>
                                </td>
                                <td>{product?.sku}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Category</strong>
                                </td>
                                <td>{product?.category_name}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Brand</strong>
                                </td>
                                <td>{product?.brand_name}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Condition</strong>
                                </td>
                                <td>{product?.item_condition}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Condition Description</strong>
                                </td>
                                <td>{product?.condition_description}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Price</strong>
                                </td>
                                <td>${product?.product_prices?.price}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Auction Duration</strong>
                                </td>
                                <td>
                                  {product?.product_prices?.auction_duration}{" "}
                                  days
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <h5>Attributes</h5>
                          <Table responsive bordered>
                            <thead>
                              <tr>
                                <th>Attribute</th>
                                <th>Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product?.product_attributes?.map((attr) => (
                                <tr key={attr?.id}>
                                  <td>{attr?.attribute_name}</td>
                                  <td>{attr?.attr_val_name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </Container>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ImageCarousel = ({ productImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + productImages.length) % productImages.length
    );
  };

  return (
    <div>
      <Image src={productImages[currentIndex]?.product_image} fluid />
      {productImages?.length > 1 && (
        <div className="carousel-control container justify-content-between d-flex">
          <i
            className="fa fa-angle-left"
            onClick={handlePrev}
            style={{ cursor: "pointer", fontSize: "30px" }}
          ></i>
          <i
            className="fa fa-angle-right"
            onClick={handleNext}
            style={{ cursor: "pointer", fontSize: "30px" }}
          ></i>
        </div>
      )}
    </div>
  );
};

export default ProductList;
