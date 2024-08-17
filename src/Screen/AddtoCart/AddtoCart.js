import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Component/context/AuthContext";
import Footer from "../../Component/Footer/Footer";
import Header from "../../Component/Header/Header";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import "./addtocart.css";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import { formatCapitalize } from "../../Component/ReuseFormat/ReuseFormat";
import { doller } from "../../Component/ReuseFormat/Doller";

const AddtoCart = () => {
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const [saveLateList, setSaveLateList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [load, setload] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const { updateCartCount } = useCart();

  console.log("saveLateList", saveLateList);
  useEffect(() => {
    getCartList();
    getSaveLateList();
    handleSaveCount();
  }, []);

  const getCartList = async () => {
    try {
      setload(true);
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.CartProductsList
      );
      if (response.success === true) {
        setCartList(response.result);
        calculateTotals(response.result);
        setload(false);
      } else {
        setload(false);
        setCartList([]);
        calculateTotals([]);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const getSaveLateList = async () => {
    try {
      setload(true);
      const response = await apiCallNew("get", {}, ApiEndPoints.SaveLaterList);
      if (response.success === true) {
        setSaveLateList(response.result);
        setload(false);
      } else {
        setload(false);
        setCartList([]);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const handleUpdateCart = async (cart_id, cart_quantity) => {
    console.log(cart_id, cart_quantity);
    try {
      setload(true);
      const payload = {
        cart_id: cart_id,
        cart_quantity: cart_quantity,
      };
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.CartUpdate
      );
      if (response.success) {
        getCartList();
        setload(false);
      } else {
        toast.error(response.msg);
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const addSaveforLater = async (datas) => {
    try {
      setload(true);
      const payload = {
        product_id: datas.product_id,
      };
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.AddToSaveLater
      );
      if (response.success) {
        getCartList();
        getSaveLateList();
        handleSaveCount();
        removeCart(datas.id);
        setload(false);
      } else {
        toast.error(response.msg);
        setload(false);
      }
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const handleSaveCount = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.SaveLaterCount).then((response) => {
        if (response.success) {
          setSaveCount(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartList = cartList.map((item, i) => {
      if (i === index) {
        handleUpdateCart(item.id, newQuantity);
        return { ...item, cart_quantity: newQuantity };
      }
      return item;
    });
    setCartList(updatedCartList);
    calculateTotals(updatedCartList);
  };

  const handleAddToCart = (item) => {
    try {
      setload(true);
      const payload = {
        product_id: item.product_id,
        product_price_id: item.product_price_id,
        cart_quantity: 1,
      };
      apiCallNew("post", payload, ApiEndPoints.AddToCart).then((response) => {
        if (response.success) {
          toast.success(response.msg);
          getCartList();
          updateCartCount();
          removeSave(item.id);
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

  const removeSave = async (id) => {
    try {
      const response = await apiCallNew(
        "delete",
        {},
        `${ApiEndPoints.DeleteSaveLater}${id}`
      );
      if (response.success === true) {
        toast.success(response.msg);
        getSaveLateList();
        handleSaveCount();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeCart = async (id) => {
    try {
      const response = await apiCallNew(
        "delete",
        {},
        `${ApiEndPoints.DeleteCartProduct}?cart_id=${id}`
      );
      if (response.success === true) {
        await getCartList();
        updateCartCount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeletion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCart(id);
      }
    });
  };

  const calculateTotals = (cartList) => {
    let total = 0;
    cartList?.forEach((item) => {
      total += item?.product_price * item?.cart_quantity;
    });
    setTotalPrice(total);
  };

  const viewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCheckout = () => {
    navigate(`/checkout/${cartList[0]?.product_id}`, {
      state: { status: 1 },
    });
  };

  const handlesingleCheckout = (data) => {
    const quantity = data?.cart_quantity;
    navigate(`/checkout/${data?.product_id}`, { state: { quantity } });
  };

  return (
    <main className="page">
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <section className="shopping-cart dark">
        <div className="container">
          <div className="block-heading">
            <h2 className="shoptitle">Shopping Cart</h2>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  {cartList.length > 0 ? (
                    cartList?.map((data, index) => (
                      <div className="product pt-0" key={data.product_id}>
                        <p
                          className="m-0 pt-0 text-end text-primary"
                          style={{ fontSize: "14px", cursor: "pointer" }}
                          onClick={() => handlesingleCheckout(data)}
                        >
                          <u>Pay only this product</u>
                        </p>
                        <div className="row">
                          <div className="col-md-3 mt-3">
                            <div
                              style={{
                                width: "100%",
                                paddingTop: "100%",
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "12px",
                                backgroundColor: "#f8f9fa",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                cursor: "pointer",
                                transition: "transform 0.2s ease-in-out",
                              }}
                              onClick={() => viewProduct(data.product_slug)}
                            >
                              <img
                                className="img-fluid mx-auto d-block"
                                src={data.product_image_path}
                                alt={data.product_name}
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
                                  (e.currentTarget.style.transform =
                                    "scale(1.1)")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.transform = "scale(1)")
                                }
                              />
                            </div>
                          </div>

                          <div className="col-md-8">
                            <div className="info">
                              <div className="row">
                                <div className="col-md-5 product-name">
                                  <div className="product-name">
                                    <a
                                      href="#"
                                      className="pro-name"
                                      onClick={() =>
                                        viewProduct(data.product_slug)
                                      }
                                    >
                                      <u>
                                        {formatCapitalize(data.product_name)}
                                      </u>
                                    </a>
                                  </div>
                                </div>
                                <div className="col-md-4 quantity">
                                  <label htmlFor="quantity">Quantity:</label>
                                  <select
                                    id="quantity"
                                    className="form-control quantity-input"
                                    value={data.cart_quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        index,
                                        Number(e.target.value)
                                      )
                                    }
                                  >
                                    {[...Array(data.quantity).keys()].map(
                                      (x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                                <div className="col-md-3 price">
                                  <span>
                                    {doller.Aud}{" "}
                                    {data.product_price * data.cart_quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className=""
                          style={{
                            position: "absolute",
                            right: 25,
                            display: "flex",
                          }}
                        >
                          <p
                            style={{
                              cursor: "pointer",
                              fontSize: "14px",
                              marginTop: "7px",
                            }}
                            onClick={() => addSaveforLater(data)}
                          >
                            <u>Save for later</u>
                          </p>
                          <p
                            className="ms-3 mt-2"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                            onClick={() => confirmDeletion(data.id)}
                          >
                            <u>Remove</u>
                          </p>
                        </div>
                        <hr className="mt-5" />
                      </div>
                    ))
                  ) : (
                    <div
                      className="text-center text-muted"
                      style={{ marginTop: "9rem" }}
                    >
                      <h4 className="text-center">
                        You don't have any items in your cart. Let's get
                        shopping!
                      </h4>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-item">
                    <span className="text">Items ({cartList.length})</span>
                    <span className="price">
                      {doller.Aud} {totalPrice}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Discount</span>
                    <span className="price">{doller.Aud} 0</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Shipping</span>
                    <span className="price">{doller.Aud} 0</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Total</span>
                    <span
                      className="price"
                      style={{ fontWeight: "bold", fontSize: "23px" }}
                    >
                      {doller.Aud} {totalPrice}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-lg btn-block checkout-btn"
                    onClick={handleCheckout}
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="block-heading">
            <h2 className="shoptitle">Saved for later ({saveCount})</h2>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="items">
                  {saveLateList?.map((item, index) => (
                    <div className="product pt-0" key={item.product_id}>
                      <div className="row">
                        <div className="col-md-3 mt-3">
                          <div
                            style={{
                              width: "100%",
                              paddingTop: "100%", // Ensures a square aspect ratio
                              position: "relative",
                              overflow: "hidden",
                              borderRadius: "12px",
                              backgroundColor: "#f8f9fa",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              cursor: "pointer",
                              transition: "transform 0.2s ease-in-out",
                            }}
                            onClick={() => viewProduct(item.product_slug)}
                          >
                            <img
                              className="img-fluid mx-auto d-block"
                              src={item.product_image_path}
                              alt={item.product_name}
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
                            />
                          </div>
                        </div>

                        <div className="col-md-9">
                          <div className="info">
                            <div className="row">
                              <div className="col-md-5 product-name">
                                <div className="product-name">
                                  <a
                                    href="#"
                                    className="pro-name"
                                    onClick={() =>
                                      viewProduct(item.product_slug)
                                    }
                                  >
                                    <u>{formatCapitalize(item.product_name)}</u>
                                  </a>
                                </div>
                              </div>
                              <div className="col-md-7 justify-content-end text-end">
                                <b>
                                  {" "}
                                  <span className="price mr-2">
                                    {doller.Aud} {item.product_price}
                                  </span>
                                </b>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className=""
                        style={{
                          position: "absolute",
                          right: 25,
                          display: "flex",
                        }}
                      >
                        <p
                          style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            marginTop: "7px",
                          }}
                          onClick={() => handleAddToCart(item)}
                        >
                          <u>Add to cart</u>
                        </p>
                        <p
                          className="ms-3 mt-2"
                          style={{ cursor: "pointer", fontSize: "14px" }}
                          onClick={() => removeSave(item.id)}
                        >
                          <u>Remove</u>
                        </p>
                      </div>
                      <hr className="mt-5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
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

export default AddtoCart;
