import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Header from "../Header/Header";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatCapitalize } from "../ReuseFormat/ReuseFormat";
import Footer from "../Footer/Footer";
import { CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Grid, Typography, Rating, Box } from "@mui/material";
import {
  Info,
  AddCircleOutline,
  IndeterminateCheckBoxOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
import "./feedback.css";

const Feedback = () => {
  const location = useLocation();
  const data = location.state || null;
  const [load, setload] = useState(false);
  const [ratings, setRatings] = useState({
    itemDescription: 0,
    shippingCosts: 0,
    shippingTime: 0,
    sellerCommunication: 0,
  });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");

  console.log("fedeeded", ratings, selectedStatus, reviewDescription);
  console.log("datadata", data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRatingChange = (field, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [field]: newValue,
    }));
  };
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const submitFeedback = async () => {
    const payloadsell = {
      product_id: data?.productId,
      review: reviewDescription,
      order_id: data?.orderId,
      order_product_id: data?.id,
      rating_type: selectedStatus,
      rating_product_desc: ratings?.itemDescription,
      rating_dispatch_time: ratings?.shippingTime,
      rating_seller_communication: ratings?.sellerCommunication,
    };
    const payloadcust = {
      product_id: data?.productId,
      review: reviewDescription,
      order_id: data?.orderId,
      order_product_id: data?.id,
      rating_type: selectedStatus,
      rating_product_desc: ratings?.itemDescription,
      rating_shipping_cost: ratings?.shippingCosts,
      rating_shipping_time: ratings?.shippingTime,
      rating_seller_communication: ratings?.sellerCommunication,
    };
    const endPoint =
      data?.status == "seller"
        ? ApiEndPoints.SellergiveReview
        : ApiEndPoints.CustomergiveReview;
    try {
      setload(true);
      const response = await apiCallNew(
        "post",
        data?.status == "seller" ? payloadsell : payloadcust,
        endPoint
      );
      if (response.success === true) {
        setload(false);
        toast.success(response.msg);
        setRatings({});
        setSelectedStatus("");
        setReviewDescription("");
      } else {
        setload(false);
        const errors = response.result;
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            errors[field].forEach((message) => {
              toast.error(message);
            });
          }
        }
      }
    } catch (error) {
      setload(false);
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
      <div className="container mt-3 mb-5">
        <h4 className="helo">Share Feedback</h4>
        <Box sx={{ width: "90%", margin: "auto", mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            How did it go?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Rate your experience
          </Typography>

          <Grid container spacing={4} sx={{ mb: 3 }}>
            <Grid item>
              <Button
                onClick={() => handleStatusClick("Positive")}
                style={{
                  width: 120,
                  height: 100,
                  fontWeight: "bold",
                  alignItems: "center",
                  color: selectedStatus === "Positive" ? "#fff" : "#000",
                  backgroundColor:
                    selectedStatus === "Positive" ? "#4CAF50" : "transparent",
                  border: "1px solid gray",
                }}
              >
                <AddCircleOutline
                  sx={{
                    fontSize: 40,
                    mb: 1,
                    color: selectedStatus === "Positive" ? "#fff" : "#4CAF50",
                  }}
                />
                Positive
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleStatusClick("Neutral")}
                style={{
                  width: 120,
                  height: 100,
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: selectedStatus === "Neutral" ? "#fff" : "#000",
                  backgroundColor:
                    selectedStatus === "Neutral" ? "#FFC107" : "transparent",
                  border: "1px solid gray",
                }}
              >
                <IndeterminateCheckBoxOutlined
                  sx={{
                    fontSize: 40,
                    mb: 1,
                    color: selectedStatus === "Neutral" ? "#fff" : "#FFC107",
                  }}
                />
                Neutral
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleStatusClick("Negative")}
                style={{
                  width: 120,
                  height: 100,
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: selectedStatus === "Negative" ? "#fff" : "#000",
                  backgroundColor:
                    selectedStatus === "Negative" ? "#F44336" : "transparent",
                  border: "1px solid gray",
                }}
              >
                <RemoveCircleOutline
                  sx={{
                    fontSize: 40,
                    mb: 1,
                    color: selectedStatus === "Negative" ? "#fff" : "#F44336",
                  }}
                />
                Negative
              </Button>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Rate the details (Optional)
          </Typography>

          {/* Ratings Grid */}
          <Grid container spacing={3} alignItems="center">
            {/* Item Description */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1">Item description</Typography>
              <Typography variant="body2" color="text.secondary">
                Item condition: Like New
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Rating
                name="itemDescription"
                value={ratings.itemDescription}
                onChange={(event, newValue) =>
                  handleRatingChange("itemDescription", newValue)
                }
                size="large"
              />
            </Grid>

            {/* Shipping Costs */}
            {data?.status == "customer" && (
              <>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">Shipping costs</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Rating
                    name="shippingCosts"
                    value={ratings.shippingCosts}
                    onChange={(event, newValue) =>
                      handleRatingChange("shippingCosts", newValue)
                    }
                    size="large"
                  />
                </Grid>
              </>
            )}

            {/* Shipping Time */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                {data?.status == "seller" ? "Dispatch Time" : "Shipping time"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Rating
                name="shippingTime"
                value={ratings.shippingTime}
                onChange={(event, newValue) =>
                  handleRatingChange("shippingTime", newValue)
                }
                size="large"
              />
            </Grid>

            {/* Seller Communication */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1">Seller communication</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Rating
                name="sellerCommunication"
                value={ratings.sellerCommunication}
                onChange={(event, newValue) =>
                  handleRatingChange("sellerCommunication", newValue)
                }
                size="large"
              />
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Review Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your review here..."
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
          />

          {/* Submit Button */}
          <Button
            style={{ marginTop: "15px", backgroundColor: "#3665f3" }}
            fullWidth
            disabled={!reviewDescription}
            onClick={submitFeedback}
          >
            Submit Review
          </Button>
        </Box>
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

export default Feedback;
