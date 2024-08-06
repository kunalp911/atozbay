import React, { useEffect, useState } from "react";
import "./product.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Zoom from "react-medium-image-zoom";
import ReactImageMagnify from "react-image-magnify";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "react-medium-image-zoom/dist/styles.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";
import logos from "../../Assets/image/bay.png";
import { formatCapitalize } from "../../Component/ReuseFormat/ReuseFormat";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import SharePopup from "./SharePopup";
import { Col, Row } from "react-bootstrap";
import { AuctionTimer } from "../../Component/AuctionTimer/AuctionTimer";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Api, Task } from "@mui/icons-material";

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const bidstatus = location?.state?.bidStatus || 0;
  const navigate = useNavigate();
  const [productDetails, setProductLists] = React.useState({});
  const [load, setload] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const averageRating =
    Number(productDetails?.avg_rating?.rating_all?.avg_rating) || 0;
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews
    ? productDetails?.product_reviews
    : productDetails?.product_reviews?.slice(0, 2);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  const handleTimeEnd = () => {
    setIsAuctionEnded(true);
  };

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };
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

  const handleAddToCart = () => {
    try {
      setload(true);
      const payload = {
        product_id: productDetails.id,
        product_price_id: productDetails.product_prices.id,
        cart_quantity: quantity,
      };
      apiCallNew("post", payload, ApiEndPoints.AddToCart).then((response) => {
        if (response.success) {
          console.log("res", response);
          toast.success(response.msg);
          navigate("/add-to-cart");
          setload(false);
        } else {
          toast.error(response.msg);
          setload(false);
        }
      });
    } catch (error) {
      console.log(error);

      setload(false);
    }
  };

  const handleAddToWishList = () => {
    try {
      setload(true);
      const payload = {
        product_id: productDetails.id,
      };
      apiCallNew("post", payload, ApiEndPoints.AddToWishList).then(
        (response) => {
          if (response.success) {
            console.log("res", response);
            toast.success(response.msg);
            navigate("/watch-list");
            setload(false);
          } else {
            toast.error(response.msg);
            setload(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const removeCart = async (productDetails) => {
    try {
      const response = await apiCallNew(
        "delete",
        {},
        ApiEndPoints.DeleteWishListProduct + productDetails?.wishlist_id
      );
      if (response.success === true) {
        toast.success(response.msg);
        getProductDetails(productDetails?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    navigate(`/checkout/${productDetails?.id}`, { state: { quantity } });
  };

  const viewInCart = () => {
    navigate("/add-to-cart");
  };

  // ******************bidding function************

  const handleBid = () => {
    try {
      setload(true);
      const payload = {
        product_id: productDetails?.id,
        bid_price:
          bidAmount >= productDetails?.product_prices?.price ? bidAmount : "",
      };
      apiCallNew("post", payload, ApiEndPoints.Bidgive).then((response) => {
        if (response.success) {
          console.log("res", response);
          toast.success(response.msg);
          setload(false);
          setBidAmount("");
        } else {
          toast.error("Enter bid price grater than starting bid");
          setload(false);
        }
      });
    } catch (error) {
      console.log(error);
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
      <Link to={`/category/${productDetails?.category_id}`}>
        <div
          className="p-1 d-flex"
          style={{ cursor: "pointer", color: "#000" }}
        >
          <ChevronLeftIcon />
          <p className="" style={{ fontSize: "14px" }}>
            <u>Back to previous page</u>
          </p>
        </div>
      </Link>
      <div className="container mt-4 mb-4">
        <div className="row justify-content-center">
          <div
            className="col-lg-6 col-md-12 d-flex flex-column align-items-center"
            style={{
              backgroundColor: "#f8f9fa",
            }}
          >
            <div
              id="productCarousel"
              className="carousel slide main-image-container"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {productDetails?.product_images?.map((src, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <Zoom>
                      <img
                        alt={`Product ${index + 1}`}
                        src={src?.product_image ? src?.product_image : logos}
                        style={{
                          width: "100%",
                          height: "500px",
                          objectFit: "contain",
                        }}
                      />
                    </Zoom>
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#productCarousel"
                role="button"
                data-slide="prev"
                style={{ color: "black" }}
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                  style={{ filter: "invert(100%)" }}
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#productCarousel"
                role="button"
                data-slide="next"
                style={{ color: "black" }}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                  style={{ filter: "invert(100%)" }}
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <div className="scrollable-containeras">
                {productDetails?.product_images?.map((src, index) => (
                  <img
                    key={index}
                    src={src?.product_image ? src?.product_image : logos}
                    className="img-thumbnail mx-1"
                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                    alt={`Thumbnail ${index + 1}`}
                    data-target="#productCarousel"
                    data-slide-to={index}
                  />
                ))}
              </div>
            </div>
          </div>
          {bidstatus === 1 ? (
            <div className="col-lg-6 col-md-12">
              <div className="d-flex justify-content-between">
                <h1 className="product-titlee">
                  {formatCapitalize(productDetails?.name)}
                </h1>
                <p className="shareicon" onClick={toggleShareModal}>
                  <i class="fa fa-share"></i> Share
                </p>
              </div>
              <div className="seller-infoe mb-3">
                <span className="seller-name d-block font-weight-bold">
                  {productDetails?.description}
                </span>
              </div>

              <div className="conditione mb-3 border-top">
                <p className="mt-3 mb-0">
                  Condition: <b>{productDetails?.item_condition}</b>
                </p>
                <p>
                  Time Left:{" "}
                  <AuctionTimer
                    createdAt={productDetails?.created_at}
                    auctionDuration={
                      productDetails?.product_prices?.auction_duration
                    }
                    onTimeEnd={handleTimeEnd}
                  />
                </p>
              </div>
              <div className="price mb-3 border-top mt-2">
                <p className="mt-3">
                  Current bid:
                  <b className="ms-4 price-valuee">
                    ${productDetails?.product_prices?.price}
                  </b>
                </p>
                <input
                  className="form-control w-50"
                  type="text"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <p className="mt-0 text-muted">
                  Enter <b>${productDetails?.product_prices?.price}</b> or more
                </p>
              </div>
              {isAuctionEnded ? (
                <div className="buttonse mb-3 mt-5">
                  <button
                    className="btn buyitnow-btn btn-block mb-2"
                    onClick={handleCheckout}
                  >
                    Pay Now
                  </button>
                </div>
              ) : (
                <div className="buttonse mb-3">
                  <button
                    className="btn buyitnow-btn btn-block mb-2"
                    onClick={handleBid}
                  >
                    Submit bid
                  </button>
                  <button
                    className="btn addcarditnow-btn btn-block mb-2"
                    onClick={handleCheckout}
                  >
                    Buy It Now
                  </button>
                  {productDetails?.cart_quantity ? (
                    <button
                      className="btn addcarditnow-btn btn-block mb-2"
                      onClick={viewInCart}
                    >
                      View in Cart
                    </button>
                  ) : (
                    <button
                      className="btn addcarditnow-btn btn-block mb-2"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  )}
                  {productDetails?.wishlist_id ? (
                    <button
                      className="btn additnow-btn btn-block mb-2"
                      onClick={() => removeCart(productDetails)}
                    >
                      <FavoriteIcon />
                      Unwatch
                    </button>
                  ) : (
                    <button
                      className="btn  additnow-btn btn-block mb-2"
                      onClick={handleAddToWishList}
                    >
                      <FavoriteBorderIcon />
                      Add to Watchlist
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="col-lg-6 col-md-12">
              <div className="d-flex justify-content-between">
                <h1 className="product-titlee">
                  {formatCapitalize(productDetails?.name)}
                </h1>
                <p className="shareicon" onClick={toggleShareModal}>
                  <i class="fa fa-share"></i> Share
                </p>
              </div>
              <div className="seller-infoe mb-3">
                <span className="seller-name d-block font-weight-bold">
                  {productDetails?.description}
                </span>
                <a href="" className="d-block">
                  Seller's other items
                </a>
                <a href="" className="d-block">
                  Contact seller
                </a>
              </div>
              <div className="price mb-3">
                <span className="price-valuee h4">
                  ${productDetails?.product_prices?.price}
                </span>
                <span className="price-offere d-block">or Best Offer</span>
              </div>
              <div className="conditione mb-3">
                <span>
                  Condition: <b>{productDetails?.item_condition}</b>
                </span>
              </div>
              <div className="quantitye mb-3">
                <label htmlFor="quantity" className="mr-2">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  defaultValue={1}
                  className="form-control quantity-input w-25 text-center"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  <option value="0" hidden></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="buttonse mb-3">
                <button
                  className="btn buyitnow-btn btn-block mb-2"
                  onClick={handleCheckout}
                >
                  Buy It Now
                </button>
                {productDetails?.cart_quantity ? (
                  <button
                    className="btn addcarditnow-btn btn-block mb-2"
                    onClick={viewInCart}
                  >
                    View in Cart
                  </button>
                ) : (
                  <button
                    className="btn addcarditnow-btn btn-block mb-2"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                )}
                {productDetails?.wishlist_id ? (
                  <button
                    className="btn additnow-btn btn-block mb-2"
                    onClick={() => removeCart(productDetails)}
                  >
                    <FavoriteIcon />
                    Unwatch
                  </button>
                ) : (
                  <button
                    className="btn  additnow-btn btn-block mb-2"
                    onClick={handleAddToWishList}
                  >
                    <FavoriteBorderIcon />
                    Add to Watchlist
                  </button>
                )}
              </div>
              <div className="watchinge">
                <span className="text-muted">
                  People want this. 24 people are watching this.
                </span>
              </div>
            </div>
          )}
          <div className="col-lg-12 col-md-12 bg-light mt-5">
            <div className="d-flex justify-content-between mt-3">
              <h4> Product ratings and reviews</h4>
              <button
                className="btn additnow-btn"
                onClick={() => navigate(`/review/${productDetails?.id}`)}
              >
                Write a review
              </button>
            </div>
            <div className="mt-4 d-flex border-bottom">
              {Array(5)
                .fill(0)
                .map((_, i) => {
                  const fullStar = i < Math.floor(averageRating);
                  const halfStar =
                    i === Math.floor(averageRating) && averageRating % 1 !== 0;
                  return (
                    <label key={i}>
                      <input type="radio" style={{ display: "none" }} />
                      {fullStar ? (
                        <FaStar
                          size={20}
                          color="#ffc107"
                          style={{ margin: "2px" }}
                        />
                      ) : halfStar ? (
                        <FaStarHalfAlt
                          size={20}
                          color="#ffc107"
                          style={{ margin: "2px" }}
                        />
                      ) : (
                        <FaStar
                          size={20}
                          color="#ccc"
                          style={{ margin: "2px" }}
                        />
                      )}
                    </label>
                  );
                })}
              <p className="ratingtext">
                Rating:
                <span className="ms-1 mt-1">
                  {averageRating > 0 ? averageRating?.toFixed(1) : "No rating"}
                </span>
              </p>
            </div>
            <div className="mt-3">
              <h4 className="ratingtextsss">Reviews</h4>
              {productDetails?.product_reviews?.length > 0 ? (
                displayedReviews?.map((item) => (
                  <div className="border p-2">
                    <p>
                      <span className="userrating">
                        {item?.rating}{" "}
                        <FaStar
                          size={10}
                          color="#fff"
                          style={{ marginTop: "-4px" }}
                        />
                      </span>
                    </p>
                    <p className="ratingfeed">{item?.review} </p>
                    <p className="ratingfeedname">
                      {item?.name} {item?.surname}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews yet</p>
              )}
              {productDetails?.product_reviews?.length > 2 &&
                !showAllReviews && (
                  <p
                    className="viewallre"
                    onClick={() => setShowAllReviews(true)}
                  >
                    View All Reviews
                  </p>
                )}
              {showAllReviews && (
                <p
                  className="viewallre"
                  onClick={() => setShowAllReviews(false)}
                >
                  Show Less
                </p>
              )}
            </div>
          </div>
        </div>
        <SharePopup
          show={isShareModalOpen}
          onHide={toggleShareModal}
          product={productDetails}
        />
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

export default Product;
