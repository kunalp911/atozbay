import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "./checkout.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatCapitalize } from "../../Component/ReuseFormat/ReuseFormat";
import { CircularProgress, Typography } from "@mui/material";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { useCart } from "../../Component/context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import { getToken } from "../../Helper/Storage";
import { doller } from "../../Component/ReuseFormat/Doller";

const CheckOut = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const data = location?.state || {};
  const bid_id = location?.state?.bidID || {};
  const winstatus = location?.state?.winstatus || {};
  const status = location?.state?.status || "";
  const token = getToken();
  const [productDetails, setProductLists] = React.useState({});
  const [quantity, setQuantity] = useState(data?.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(
    productDetails?.product_prices?.price
  );
  const [shipAddList, setShipAddList] = useState([]);
  const [shipAdd, setShipAdd] = useState({});
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [cartList, setCartList] = useState([]);
  const [totalPrices, setTotalPrices] = useState(0);
  const [load, setload] = useState(false);
  const { updateCartCount } = useCart();
  const [addShow, setAddShow] = useState(1);
  const [countryList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [isOpen, setIsOpen] = useState(false);
  const [addId, setAddId] = useState(0);
  const [addShipAddress, setAddShipAddress] = useState({
    country_id: "",
    city_name: "",
    address_1: "",
    address_2: "",
    state_id: "",
    pincode: "",
    address_type: "Shipping",
  });
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(0);
  const [shipCharge, setShipCharge] = useState(0);

  const isEmpty = (obj) => !Object.keys(obj).length;

  // const DirectPrice = responseData?.product_prices?.price;
  // const Price = status === "wining" ? auctionPrice : DirectPrice;

  console.log("bid_id", bid_id, ">>", winstatus);
  console.log("productDetails", productDetails);
  useEffect(() => {
    if (shipAddList?.length > 0 && primaryAddress === null) {
      setPrimaryAddress(shipAddList[0]?.id);
    }
  }, [shipAddList, primaryAddress]);

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  useEffect(() => {
    setTotalPrice(
      winstatus == "win"
        ? quantity * productDetails?.auctions?.bid_price
        : quantity * productDetails?.product_prices?.price
    );
  }, [quantity, productDetails?.product_prices?.price]);

  useEffect(() => {
    getShipAddressList();
    getCountries();
  }, []);

  useEffect(() => {
    getCartList();
  }, []);

  useEffect(() => {
    if (shipAddList?.length > 0 && !primaryAddress) {
      const primary = shipAddList?.find((item) => item?.is_primary === 1);
      if (primary) {
        setPrimaryAddress(primary?.id);
        getShipAddressById(primary);
      }
    }
  }, [shipAddList]);

  const handlePrimaryChange = (id) => {
    setPrimaryAddress(id);
    getPrimaryAddress(id);
    getShipAddressById({ id });
    setAddShow(1);
  };

  const handleAddAddressChange = (e) => {
    const { name, value } = e.target;
    setAddShipAddress({
      ...addShipAddress,
      [name]: value,
    });
    if (name === "country_id") {
      getStates(value);
    }
  };

  const getCartList = async () => {
    try {
      setload(true);
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.CartProductsList
      );
      if (response.success) {
        setCartList(response.result);
        setShipCharge(response.shipping_charge);
        calculateTotals(response.result);
        setload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCart = async (cart_id, cart_quantity) => {
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

  const removeCart = async (id) => {
    try {
      const response = await apiCallNew(
        "delete",
        {},
        `${ApiEndPoints.DeleteCartProduct}?cart_id=${id}`
      );
      if (response.success) {
        toast.success(response.msg);
        getCartList();
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
    setTotalPrices(total);
  };

  const handlePhoneChange = (value, country) => {
    const countryCode = country.dialCode;
    const phoneNumber = value.slice(countryCode.length);
    setCountryCode(countryCode);
    setPhone(phoneNumber);
    setAddShipAddress({
      ...addShipAddress,
      mobile_number: phoneNumber,
      country_code: countryCode,
    });
  };

  const handleEdit = (item) => {
    setAddShow(3);
    setIsOpen(true);
    setAddShipAddress({
      country_id: item.country_id,
      state_id: item.state_id,
      city_name: item.city_name,
      address_1: item.address_1,
      address_2: item.address_2,
      address_type: item.address_type,
      pincode: item.pincode,
      mobile_number: item.mobile_number,
      country_code: item.country_code,
      address_first_name: item.address_first_name,
      address_last_name: item.address_last_name,
    });
    setPhone(item.mobile_number);
    setCountryCode(item.country_code);
    setAddId(item.id);
  };

  const getShipAddressList = () => {
    try {
      apiCallNew("post", {}, ApiEndPoints.ShipAddressList).then((response) => {
        if (response.success) {
          setShipAddList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getShipAddressById = ({ id }) => {
    try {
      setload(true);
      apiCallNew("get", {}, ApiEndPoints.GetAddressById + id).then(
        (response) => {
          if (response.success) {
            setShipAdd(response.result);
            setload(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const getPrimaryAddress = (id) => {
    try {
      setload(true);
      apiCallNew("get", {}, ApiEndPoints.AddressPrimary + id).then(
        (response) => {
          if (response.success) {
            getShipAddressList();
            toast.success(response.msg);
            setload(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(error);
      setload(false);
    }
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

  const handleShipAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCallNew(
        "post",
        addShipAddress,
        ApiEndPoints.AddAddress
      );
      if (response.success) {
        toast.success(response.msg);
        getShipAddressList();
        setAddShipAddress({});
        setAddShow(2);
        setPhone("");
        setCountryCode("");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShipAddUpdate = async (addId) => {
    try {
      const response = await apiCallNew(
        "post",
        addShipAddress,
        ApiEndPoints.UpdateAddress + addId
      );
      if (response.success) {
        toast.success(response.msg);
        getShipAddressList();
        setAddShow(2);
        setAddShipAddress({});
        setPhone("");
        setCountryCode("");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCountries = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.CountryList).then((response) => {
        if (response.success) {
          setCountriesList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getStates = (id) => {
    try {
      apiCallNew("get", {}, ApiEndPoints.StateList + id).then((response) => {
        if (response.success) {
          setStateList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearStateData = () => {
    setAddShipAddress({});
    setAddShow(2);
    setPhone("");
    setCountryCode("");
  };

  const makePayment = async () => {
    setload(true);
    try {
      const payload = {
        shipping_id: shipAdd?.id,
        sub_total: totalPrices,
        total: totalPrices,
        coupon_code: couponCode,
        coupon_amount: couponData,
        shipping_charge: shipCharge,
        device_type: "web",
        bid_id: winstatus == "win" ? bid_id : null,
        product_id: status == 1 ? "" : id,
      };
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.MakePayment
      );
      if (response?.success == true) {
        toast.success(response?.msg);
        setload(false);
        if (response?.result?.url) {
          window.location.href = response?.result?.url;
        }
      } else {
        setload(false);
        toast.error(response?.msg);
      }
    } catch (error) {
      setload(false);
      toast.error(error);
    }
  };

  const applyCoupon = async () => {
    setload(true);
    try {
      const payload = {
        coupon_code: couponCode,
      };
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ApplyCoupon
      );
      if (response?.success == true) {
        setCouponData(response?.result?.coupon_amt);
        toast.success(response?.msg);
        setload(false);
      } else {
        setload(false);
        toast.error(response?.msg);
      }
    } catch (error) {
      setload(false);
      toast.error(error);
    }
  };

  const handleContinue = () => {
    if (token) {
      if (shipAdd?.id) {
        makePayment();
      } else {
        toast.error("Please add shipping address");
      }
    } else {
      navigate("/login");
    }
  };

  console.log("status", status, ">>>tt", totalPrices);
  return (
    <div>
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Container className="mt-3 mb-3">
        <Row>
          <Col md={8} style={{ height: "100vh", overflow: "auto" }}>
            <h4 className="helo">Checkout</h4>
            <Card className="mb-3">
              <Card.Body>
                <h5 className="paywithname border-bottom pb-3">
                  Review item and shipping
                </h5>
                {status === 1 ? (
                  cartList &&
                  cartList?.map((data, index) => (
                    <Row className="mt-3 border-bottom pb-3" key={index}>
                      <Col md={2}>
                        <Image src={data?.product_image_path} fluid />
                      </Col>
                      <Col md={10}>
                        <Card.Title className="card-titlesss">
                          {formatCapitalize(data?.product_name)}
                        </Card.Title>
                        <b>
                          {doller.Aud}{" "}
                          {data?.product_price * data?.cart_quantity}
                        </b>
                        <Row>
                          <Col md={10}>
                            <Form.Group controlId="quantity">
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                Quantity
                              </p>
                              <Form.Control
                                as="select"
                                className="w-25"
                                value={data?.cart_quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    index,
                                    Number(e.target.value)
                                  )
                                }
                              >
                                {[...Array(data.quantity).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <p
                              className="text-primary"
                              style={{ cursor: "pointer", fontSize: "14px" }}
                              onClick={() => confirmDeletion(data?.id)}
                            >
                              <u>Remove</u>
                            </p>
                          </Col>
                        </Row>
                        <p className="m-0" style={{ fontSize: "14px" }}>
                          <strong>Delivery:</strong> .........!
                        </p>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <Row className="mt-3 border-bottom pb-3">
                    <Col md={2}>
                      <Image
                        src={
                          productDetails?.product_images?.[0]?.product_image ||
                          "path_to_default_image"
                        }
                        fluid
                      />
                    </Col>
                    <Col md={10}>
                      <Card.Title className="card-titlesss">
                        {formatCapitalize(productDetails?.name)}
                      </Card.Title>
                      <b>
                        {doller.Aud} {totalPrice?.toFixed(2)}
                      </b>
                      <Form.Group controlId="quantity">
                        <p className="m-0" style={{ fontSize: "14px" }}>
                          Quantity
                        </p>
                        <Form.Control
                          as="select"
                          className="w-25"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
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
                        </Form.Control>
                      </Form.Group>
                      <p className="m-0" style={{ fontSize: "14px" }}>
                        <strong>Delivery:</strong> .........!
                      </p>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              {isEmpty(shipAdd) &&
                (token ? (
                  <p
                    className="addaddress ms-3"
                    onClick={() => {
                      setAddShow(3);
                      setIsOpen(false);
                    }}
                  >
                    <u>Add Address</u>
                  </p>
                ) : (
                  <p
                    className="addaddress ms-3"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <u>Add Address</u>
                  </p>
                ))}

              {isEmpty(shipAdd) == false && token && addShow === 1 && (
                <Card.Body>
                  <h5 className="paywithname">Ship to</h5>
                  <Card.Text>
                    <p className="mb-0" style={{ fontSize: "14px" }}>
                      {shipAdd.address_first_name} {shipAdd.address_last_name}
                    </p>
                    <p className="mb-0" style={{ fontSize: "14px" }}>
                      {shipAdd.address_1}, {shipAdd.address_2}
                    </p>
                    <p className="mb-0" style={{ fontSize: "14px" }}>
                      {shipAdd.city_name}, {shipAdd.state_name} (
                      {shipAdd.pincode})
                    </p>
                    <p className="mb-0" style={{ fontSize: "14px" }}>
                      {shipAdd.country_name}
                    </p>
                    <p className="mb-0" style={{ fontSize: "14px" }}>
                      {shipAdd.mobile_number}
                    </p>
                    <p
                      className="mb-0 text-primary"
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      onClick={() => setAddShow(2)}
                    >
                      <u>Changes</u>
                    </p>
                  </Card.Text>
                </Card.Body>
              )}

              {addShow === 2 && (
                <Card.Body>
                  <h5 className="paywithname">Ship to</h5>
                  {shipAddList?.map((item, index) => (
                    <Card.Text key={index}>
                      <Form.Check
                        type="radio"
                        id={`primary-address-${item?.id}`}
                        name="primaryAddress"
                        checked={primaryAddress === item?.id}
                        onChange={() => handlePrimaryChange(item?.id)}
                        label={
                          <>
                            <p className="mb-0" style={{ fontSize: "14px" }}>
                              {item.address_first_name} {item.address_last_name}
                            </p>
                            <p className="mb-0" style={{ fontSize: "14px" }}>
                              {item?.address_1}, {item?.address_2}
                            </p>
                            <p className="mb-0" style={{ fontSize: "14px" }}>
                              {item?.city_name}, {item?.country_name} (
                              {item?.pincode})
                            </p>
                            <p className="mb-0" style={{ fontSize: "14px" }}>
                              {item?.country_name}
                            </p>
                          </>
                        }
                      />
                      <p
                        className="addchanges"
                        onClick={() => handleEdit(item)}
                      >
                        <u>Edit</u>
                      </p>
                    </Card.Text>
                  ))}
                  <p
                    className="addaddress"
                    onClick={() => {
                      setAddShow(3);
                      setIsOpen(false);
                    }}
                  >
                    <u>Add Address</u>
                  </p>
                  <p className="addaddress" onClick={() => setAddShow(1)}>
                    <u>Cancel</u>
                  </p>
                </Card.Body>
              )}
              {addShow === 3 && (
                <Card.Body>
                  <h5 className="paywithname">Ship to</h5>
                  <Form action="javascript:void(0);">
                    <Row className="mb-2">
                      <Col md={6} className="mb-2">
                        <Form.Select
                          name="country_id"
                          value={addShipAddress.country_id}
                          onChange={handleAddAddressChange}
                        >
                          <option value="">Select Country</option>
                          {countryList.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={6} className="mb-2">
                        <Form.Group controlId="city">
                          <Form.Select
                            name="state_id"
                            value={addShipAddress.state_id}
                            onChange={handleAddAddressChange}
                          >
                            <option value="">Select State</option>
                            {stateList.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={6} className="mb-2">
                        <Form.Group controlId="fname">
                          <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            name="address_first_name"
                            value={addShipAddress.address_first_name}
                            onChange={handleAddAddressChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-2">
                        <Form.Group controlId="lname">
                          <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            name="address_last_name"
                            value={addShipAddress.address_last_name}
                            onChange={handleAddAddressChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={6} className="mb-2">
                        <Form.Group controlId="address">
                          <Form.Control
                            type="text"
                            placeholder="Street address"
                            name="address_1"
                            value={addShipAddress.address_1}
                            onChange={handleAddAddressChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-2">
                        <Form.Group controlId="address">
                          <Form.Control
                            type="text"
                            placeholder="Street address 2(optional)"
                            name="address_2"
                            value={addShipAddress.address_2}
                            onChange={handleAddAddressChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={6} className="mb-2">
                        <Form.Group controlId="city">
                          <Form.Control
                            type="text"
                            placeholder="City"
                            name="city_name"
                            value={addShipAddress.city_name}
                            onChange={handleAddAddressChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-2">
                        <Form.Group controlId="zip">
                          <Form.Control
                            type="text"
                            placeholder="Zip code"
                            name="pincode"
                            value={addShipAddress.pincode}
                            onChange={handleAddAddressChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={12} className="mb-2">
                        <PhoneInput
                          country={"in"}
                          value={`${countryCode}${phone}`}
                          onChange={(value, country) =>
                            handlePhoneChange(value, country)
                          }
                          inputProps={{
                            name: "country_code",
                            required: true,
                            autoFocus: true,
                          }}
                          containerStyle={{ width: "100%" }}
                          inputStyle={{
                            width: "100%",
                            paddingLeft: "50px",
                            fontSize: "16px",
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col md={3}>
                        {isOpen ? (
                          <button
                            className="btn mt-2 addsavebtn"
                            onClick={() => handleShipAddUpdate(addId)}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            className="btn mt-2 addsavebtn"
                            onClick={handleShipAddSubmit}
                          >
                            Add
                          </button>
                        )}
                      </Col>
                      <Col md={3}>
                        <button
                          className="btn mt-2 addcancelbtn"
                          onClick={() => clearStateData()}
                        >
                          Cancel
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              )}
            </Card>
            <Card className="mt-4">
              <Card.Body>
                <Form.Group controlId="coupon">
                  <h5 className="paywithname">
                    Gift cards, coupons, atozbay Bucks{" "}
                  </h5>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="btn mt-2 applybtn"
                    onClick={() => applyCoupon()}
                  >
                    Apply
                  </button>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* <Card className="mt-4">
              <Card.Body>
                <Form.Group controlId="charity">
                  <h5 className="paywithname">Donate to charity (optional)</h5>
                  <Form.Control as="select">
                    <option>None</option>
                    <option>Plan International</option>
                    <option>Other charity</option>
                  </Form.Control>
                </Form.Group>
              </Card.Body>
            </Card> */}
          </Col>

          <Col md={4} className="address-detailss">
            <Card>
              {status === 1 ? (
                <Card.Body>
                  <h5 className="paywithname">Order total</h5>
                  <Row>
                    <Col>Item ({cartList.length})</Col>
                    <Col className="text-right">
                      {doller.Aud} {totalPrices?.toFixed(2)}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col className="text-right">
                      + {doller.Aud} {shipCharge?.toFixed(2)}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Discount</Col>
                    <Col className="text-right">
                      - {doller.Aud} {couponData?.toFixed(2)}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Total</Col>
                    <Col className="text-right">
                      <b>
                        {doller.Aud}{" "}
                        {(totalPrices + shipCharge - couponData)?.toFixed(2)}
                      </b>
                    </Col>
                  </Row>
                  <button
                    className="btn mt-4 buynowbtn"
                    onClick={handleContinue}
                  >
                    Confirm and Pay
                  </button>
                </Card.Body>
              ) : (
                <Card.Body>
                  <h5 className="paywithname">Order total</h5>
                  <Row>
                    <Col>Item ({quantity})</Col>
                    <Col className="text-right">
                      {doller.Aud} {totalPrice?.toFixed(2)}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col className="text-right">
                      + {doller.Aud}{" "}
                      {productDetails?.product_shipping?.shipping_charge?.toFixed(
                        2
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Discount</Col>
                    <Col className="text-right">
                      - {doller.Aud} {couponData?.toFixed(2)}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Total</Col>
                    <Col className="text-right">
                      <b>
                        {doller.Aud}{" "}
                        {(
                          totalPrice +
                          productDetails?.product_shipping?.shipping_charge -
                          couponData
                        )?.toFixed(2)}
                      </b>
                    </Col>
                  </Row>
                  <button
                    className="btn mt-4 buynowbtn"
                    onClick={handleContinue}
                  >
                    Confirm and Pay
                  </button>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={8}></Col>
        </Row>
      </Container>
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

export default CheckOut;
