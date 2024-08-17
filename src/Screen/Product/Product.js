import React, { useEffect, useState } from "react";
import "./product.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Zoom from "react-medium-image-zoom";
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
import SharePopup from "./SharePopup";
import { AuctionTimer } from "../../Component/AuctionTimer/AuctionTimer";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getToken, getUserdata } from "../../Helper/Storage";
import { Card, Col, Row } from "react-bootstrap";
import { doller } from "../../Component/ReuseFormat/Doller";

const Product = () => {
  const { slug } = useParams();
  const location = useLocation();
  const bidstatus = location?.state?.bidStatus || 0;
  const token = getToken();
  const navigate = useNavigate();
  const [productDetails, setProductLists] = React.useState({});
  const [load, setload] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [winningBid, setWiningBid] = useState({});
  const [userData, setUserData] = useState({});
  const [shopProductLists, setShopProductLists] = useState([]);
  const averageRating =
    Number(productDetails?.avg_rating?.rating_all?.avg_rating) || 0;
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews
    ? productDetails?.product_reviews
    : productDetails?.product_reviews?.slice(0, 2);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [idArray, setIdArray] = useState(() => {
    const savedIds = localStorage.getItem("uniqueIds");
    return savedIds ? JSON.parse(savedIds) : [];
  });

  // console.log(
  //   "winningBid",
  //   winningBid?.user_id,
  //   "user id",
  //   userData?.id,
  //   "pro user",
  //   productDetails?.user_id
  // );
  useEffect(() => {
    if (slug) {
      getProductDetailsSlug(slug);
      winnigBid(slug);
    }
  }, [slug]);
  // useEffect(() => {
  //   getProductDetailsSlug();
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserdata();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleTimeEnd = () => {
    setIsAuctionEnded(true);
  };

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  const addUniqueId = (newId) => {
    setIdArray((prevArray) => {
      if (prevArray.includes(newId)) {
        return prevArray;
      }
      let updatedArray = [...prevArray];
      if (updatedArray.length >= 20) {
        updatedArray = updatedArray.slice(1);
      }
      updatedArray.push(newId);
      localStorage.setItem("uniqueIds", JSON.stringify(updatedArray));

      return updatedArray;
    });
  };

  // const getProductDetails = (id) => {
  //   try {
  //     setload(true);
  //     apiCallNew("get", {}, ApiEndPoints.ProductShopDetail + id).then(
  //       (response) => {
  //         if (response.success) {
  //           setProductLists(response.result);
  //           addUniqueId(response.result.id);
  //           getShopProductList(response.result.category_id);
  //           setload(false);
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     setload(false);
  //   }
  // };

  const getProductDetailsSlug = (slug) => {
    try {
      setload(true);
      apiCallNew("get", {}, ApiEndPoints.ProductShopDetailSlug + slug).then(
        (response) => {
          if (response.success) {
            setProductLists(response.result);
            addUniqueId(response.result.id);
            getShopProductList(response.result.category_id);
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
        getProductDetailsSlug(productDetails?.slug);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getShopProductList = async (id) => {
    const payload = {
      page: 0,
      category_id: id,
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ShopProductList
      );
      if (response.success) {
        setShopProductLists(response.result);
        // setCount(response.product_count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shopFilterProduct = shopProductLists?.filter(
    (item) => item?.id !== productDetails?.id
  );
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

  const winnigBid = (id) => {
    try {
      setload(true);
      apiCallNew("get", {}, ApiEndPoints.WinningBid + id).then((response) => {
        if (response.success) {
          setWiningBid(response.result);
          setload(false);
        }
      });
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const handlelogin = () => {
    if (token) {
      handleAddToWishList();
    } else {
      navigate("/login");
    }
  };

  const handleAddtocartLogin = () => {
    if (token) {
      handleAddToCart();
    } else {
      navigate("/login");
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
                <p
                  className="m-0 text-muted"
                  style={{
                    fontSize: "0.875rem",
                    color: "#6c757d",
                    marginBottom: "16px",
                  }}
                >
                  {productDetails?.description}
                </p>
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
                    {doller.Aud} {productDetails?.product_prices?.price}
                  </b>
                </p>
                {productDetails?.user_id == userData?.id ? (
                  ""
                ) : isAuctionEnded ? (
                  winningBid?.user_id == userData?.id ? (
                    <>
                      <input
                        className="form-control w-50"
                        type="text"
                        placeholder="Enter bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                      <p className="mt-0 text-muted">
                        Enter{" "}
                        <b>
                          {doller.Aud} {productDetails?.product_prices?.price}
                        </b>{" "}
                        or more
                      </p>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  <>
                    <input
                      className="form-control w-50"
                      type="text"
                      placeholder="Enter bid amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <p className="mt-0 text-muted">
                      Enter{" "}
                      <b>
                        {doller.Aud} {productDetails?.product_prices?.price}
                      </b>{" "}
                      or more
                    </p>
                  </>
                )}
              </div>
              <div className="buttonse mb-3 mt-5">
                {productDetails?.user_id == userData?.id ? (
                  <button
                    className="btn addcarditnow-btn btn-block mb-2"
                    onClick={() => navigate("/bids-offers")}
                  >
                    Bidding History
                  </button>
                ) : isAuctionEnded ? (
                  winningBid?.user_id == userData?.id ? (
                    <>
                      <p className="text-center offersexpire text-success">
                        You won this offer
                      </p>
                      <button
                        className="btn buyitnow-btn btn-block mb-2"
                        onClick={handleCheckout}
                      >
                        Pay Now
                      </button>
                    </>
                  ) : (
                    <p className="text-center offersexpire">Offer expired</p>
                  )
                ) : (
                  <button
                    className="btn buyitnow-btn btn-block mb-2"
                    onClick={handleBid}
                  >
                    Submit bid
                  </button>
                )}
              </div>
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
                {/* <span className="seller-name d-block prodesc">
                  {productDetails?.description}
                </span> */}
                <p
                  className="m-0 text-muted"
                  style={{
                    fontSize: "0.875rem",
                    color: "#6c757d",
                    marginBottom: "16px",
                  }}
                >
                  {productDetails?.description}
                </p>
              </div>
              <div className="price mb-3">
                <span className="price-valuee h4">
                  {doller.Aud} {productDetails?.product_prices?.price}
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
                  {[
                    ...Array(productDetails?.product_prices?.quantity).keys(),
                  ].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="buttonse mb-3 mt-5">
                <button
                  className="btn buyitnow-btn btn-block mb-2"
                  onClick={handleAddtocartLogin}
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
                    onClick={handleAddtocartLogin}
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
                    onClick={handlelogin}
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
              {/* <button
                className="btn additnow-btn"
                onClick={() => {
                  token
                    ? navigate(`/review/${productDetails?.id}`)
                    : toast.error("Please login first");
                }}
              >
                Write a review
              </button> */}
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
              <h4 className="ratingtextsss">
                Reviews{" "}
                <span className="ratingtext">
                  ({productDetails?.product_reviews?.length})
                </span>
              </h4>
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
      {/* <div
        className="m-5" 
      >
        <Row>
          {shopProductLists?.map((item) => (
            <Col xs={12} md={4} lg={2} key={item.id} className="mb-4">
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
                    <b>${item?.product_prices?.price}</b>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div> */}
      <div className="m-5 border-top">
        <h4 className="helo mt-4">Similar Items</h4>
        <Row className="justify-content-centes">
          {shopFilterProduct?.map((item) => (
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

export default Product;
