import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./review.css";
import Header from "../Header/Header";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatCapitalize } from "../ReuseFormat/ReuseFormat";
import Footer from "../Footer/Footer";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const orderid = location?.state?.orderId;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [productDetails, setProductLists] = React.useState({});
  const [load, setload] = useState(false);

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
    window.scrollTo(0, 0);
  }, []);

  const getProductDetails = (id) => {
    try {
      setload(true);
      apiCallNew("get", {}, ApiEndPoints.ProductShopDetail + id).then(
        (response) => {
          if (response.success) {
            setProductLists(response.result);
            setload(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const handleReview = (e) => {
    e.preventDefault();
    try {
      setload(true);
      const payload = {
        product_id: productDetails?.id,
        rating: rating,
        review: review,
        order_id: orderid,
      };
      apiCallNew("post", payload, ApiEndPoints.GiveReview).then((response) => {
        if (response.success) {
          toast.success(response.msg);
          navigate(`/order-details/${orderid}`);
          setload(false);
        } else {
          toast.error(response.msg);
          setload(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <div className="container mt-5 mb-5">
        <Card className="mb-3">
          <Row className="justify-content-around">
            <Col className="text-center" xs={12} lg={2} md={2}>
              <Card.Img
                className="img-fluid  mt-lg-4 ms-lg-3 mb-3"
                src={
                  productDetails?.product_images?.length > 0
                    ? productDetails.product_images[0].product_image
                    : ""
                }
                alt="Card image cap"
                style={{
                  objectFit: "contain",
                }}
              />
            </Col>
            <Col xs={12} lg={10} md={10}>
              <Card.Body>
                <Card.Title className="watch-title m-0">
                  {" "}
                  {formatCapitalize(productDetails?.name)}
                </Card.Title>
                <p className="m-0 text-muted"> {productDetails?.description}</p>
                <Card.Text>
                  Condition: <b>{productDetails?.item_condition}</b>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        <h3>Write Your Review</h3>
        <div>
          {Array(5)
            .fill(0)
            .map((_, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={30}
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
        </div>
        <Form onSubmit={handleReview}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Review:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <p className="text-muted">
              {1000 - review.length} Characters remaining
            </p>
          </Form.Group>
          <button
            type="submit"
            className="btn reviewclsbtn"
            onClick={() => navigate(`/order-details/${orderid}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn reviewbtn">
            Submit
          </button>
        </Form>
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

export default Review;
