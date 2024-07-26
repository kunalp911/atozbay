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

const AddtoCart = () => {
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [load, setload] = useState(false);
  const { updateCartCount } = useCart();

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = async () => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.CartProductsList
      );
      if (response.success) {
        setCartList(response.result);
        calculateTotals(response.result);
      }
    } catch (error) {
      console.log(error);
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
        toast.success(response.msg);
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
    setTotalPrice(total);
  };

  const viewProduct = (id) => {
    navigate(`/product/${id}`);
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
                  {cartList &&
                    cartList?.map((data, index) => (
                      <div className="product" key={data?.product_id}>
                        <div className="row">
                          <div className="col-md-3 mt-3">
                            <img
                              className="img-fluid mx-auto d-block image"
                              src={data?.product_image_path}
                              alt={data?.product_name}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="info">
                              <div className="row">
                                <div className="col-md-5 product-name">
                                  <div className="product-name">
                                    <a
                                      href=""
                                      className="pro-name"
                                      onClick={() =>
                                        viewProduct(data?.product_id)
                                      }
                                    >
                                      {data?.product_name}
                                    </a>
                                  </div>
                                </div>
                                <div className="col-md-4 quantity">
                                  <label htmlFor="quantity">Quantity:</label>
                                  <select
                                    id="quantity"
                                    className="form-control quantity-input"
                                    value={data?.cart_quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        index,
                                        Number(e.target.value)
                                      )
                                    }
                                  >
                                    {[...Array(10).keys()].map((num) => (
                                      <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-md-3 price">
                                  <span>
                                    ${data?.product_price * data?.cart_quantity}
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
                            cursor: "pointer",
                          }}
                        >
                          <p
                            className="border-bottom"
                            onClick={() => confirmDeletion(data?.id)}
                          >
                            Remove
                          </p>
                        </div>
                        <hr className="mt-5" />
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-item">
                    <span className="text">Items ({cartList.length})</span>
                    <span className="price">${totalPrice}</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Discount</span>
                    <span className="price">$0</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Shipping</span>
                    <span className="price">$0</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Total</span>
                    <span
                      className="price"
                      style={{ fontWeight: "bold", fontSize: "23px" }}
                    >
                      ${totalPrice}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-lg btn-block checkout-btn"
                  >
                    Go to checkout
                  </button>
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

// import React, { useEffect, useState } from "react";
// import "./addtocart.css";
// import Header from "../../Component/Header/Header";
// import Footer from "../../Component/Footer/Footer";
// import { apiCallNew } from "../../Network_Call/apiservices";
// import ApiEndPoints from "../../Network_Call/ApiEndPoint";
// const AddtoCart = () => {
//   const [cartList, setCartList] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   // const [quantity, setQuantity] = useState("");

//   console.log("cartList", cartList, cartCount);
//   useEffect(() => {
//     getCartList();
//     handleCartCount();
//   }, []);
//   const getCartList = () => {
//     try {
//       apiCallNew("get", {}, ApiEndPoints.CartProductsList).then((response) => {
//         if (response.success) {
//           setCartList(response.result);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleQuantityChange = (index, newQuantity) => {
//     const updatedCartList = cartList.map((item, i) => {
//       if (i === index) {
//         return { ...item, cart_quantity: newQuantity };
//       }
//       return item;
//     });
//     setCartList(updatedCartList);
//   };

//   const handleCartCount = () => {
//     try {
//       apiCallNew("get", {}, ApiEndPoints.CartProductCount).then((response) => {
//         if (response.success) {
//           setCartCount(response.result);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

// Today Update.

//   return (
//     <main className="page">
//       <Header handleCartCount={handleCartCount} counts={cartCount} />
//       <section className="shopping-cart dark">
//         <div className="container">
//           <div className="block-heading">
//             <h2 className="shoptitle">Shopping Cart</h2>
//           </div>
//           <div className="content">
//             <div className="row">
//               <div className="col-md-12 col-lg-8">
//                 <div className="items">
//                   {cartList &&
//                     cartList?.map((data, index) => (
//                       <div className="product">
//                         <div className="row">
//                           <div className="col-md-3 mt-3">
//                             <img
//                               className="img-fluid mx-auto d-block image"
//                               src="https://i.ebayimg.com/images/g/sgUAAOSwyppmavaz/s-l225.webp"
//                             />
//                           </div>
//                           <div className="col-md-8">
//                             <div className="info">
//                               <div className="row">
//                                 <div className="col-md-5 product-name">
//                                   <div className="product-name">
//                                     <a href="#" className="pro-name">
//                                       {data?.product_name}
//                                     </a>
//                                     <div className="product-info">
//                                       <div>
//                                         Display:{" "}
//                                         <span className="value">5 inch</span>
//                                       </div>
//                                       <div>
//                                         RAM: <span className="value">4GB</span>
//                                       </div>
//                                       <div>
//                                         Memory:{" "}
//                                         <span className="value">32GB</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-4 quantity">
//                                   <label for="quantity">Quantity:</label>
//                                   <select
//                                     id="quantity"
//                                     type="number"
//                                     className="form-control quantity-input"
//                                     defaultValue={data?.cart_quantity}
//                                     value={data.cart_quantity}
//                                     onChange={(e) =>
//                                       handleQuantityChange(
//                                         index,
//                                         Number(e.target.value)
//                                       )
//                                     }
//                                   >
//                                     {[...Array(10).keys()].map((num) => (
//                                       <option key={num + 1} value={num + 1}>
//                                         {num + 1}
//                                       </option>
//                                     ))}
//                                   </select>
//                                 </div>
//                                 <div className="col-md-3 price">
//                                   <span>
//                                     ${data.product_id * data.cart_quantity}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className=""
//                           style={{
//                             position: "absolute",
//                             right: 25,
//                             cursor: "pointer",
//                           }}
//                         >
//                           <p className="border-bottom">Remove</p>
//                         </div>
//                         <hr className="my-5" />
//                       </div>
//                     ))}
//                 </div>
//               </div>
//               <div className="col-md-12 col-lg-4">
//                 <div className="summary">
//                   <h3>Summary</h3>
//                   <div className="summary-item">
//                     <span className="text">Items (3)</span>
//                     <span className="price">$620</span>
//                   </div>
//                   <div className="summary-item">
//                     <span className="text">Discount</span>
//                     <span className="price">$0</span>
//                   </div>
//                   <div className="summary-item">
//                     <span className="text">Shipping</span>
//                     <span className="price">$0</span>
//                   </div>
//                   <div className="summary-item">
//                     <span className="text">Total</span>
//                     <span
//                       className="price"
//                       style={{ fontWeight: "bold", fontSize: "23px" }}
//                     >
//                       $620
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     className="btn btn-lg btn-block checkout-btn"
//                   >
//                     Go to checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </main>
//   );
// };

// export default AddtoCart;

// import React, { useEffect, useState } from "react";
// import "./addtocart.css";
// import Header from "../../Component/Header/Header";
// import Footer from "../../Component/Footer/Footer";
// import { apiCallNew } from "../../Network_Call/apiservices";
// import ApiEndPoints from "../../Network_Call/ApiEndPoint";
// import { useNavigate } from "react-router-dom";

// const AddtoCart = () => {
//   const navigate = useNavigate();
//   const [cartList, setCartList] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   console.log("cartList", cartList);
//   useEffect(() => {
//     getCartList();
//   }, []);

//   const getCartList = () => {
//     try {
//       apiCallNew("get", {}, ApiEndPoints.CartProductsList).then((response) => {
//         if (response.success) {
//           setCartList(response.result);
//           calculateTotals(response.result);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeCart = (id) => {
//     try {
//       apiCallNew("delete", {}, ApiEndPoints.RemoveCart + id).then(
//         (response) => {
//           if (response.success) {
//             getCartList();
//           }
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleQuantityChange = (index, newQuantity) => {
//     const updatedCartList = cartList.map((item, i) => {
//       if (i === index) {
//         return { ...item, cart_quantity: newQuantity };
//       }
//       return item;
//     });
//     setCartList(updatedCartList);
//     calculateTotals(updatedCartList);
//   };

//   const calculateTotals = (cartList) => {
//     let total = 0;
//     let count = 0;
//     cartList.forEach((item) => {
//       total += item.product_id * item.cart_quantity;
//       count += item.cart_quantity;
//     });
//     setTotalPrice(total);
//   };

//   const viewProduct = (id) => {
//     navigate(`/product/${id}`);
//   };
//   return (
//     <main className="page">
//       <Header />
//       <section className="shopping-cart dark">
//         <div className="container">
//           <div className="block-heading">
//             <h2 className="shoptitle">Shopping Cart</h2>
//           </div>
//           <div className="content">
//             <div className="row">
//               <div className="col-md-12 col-lg-8">
//                 <div className="items">
//                   {cartList &&
//                     cartList?.map((data, index) => (
//                       <div className="product" key={data.product_id}>
//                         <div className="row">
//                           <div className="col-md-3 mt-3">
//                             <img
//                               className="img-fluid mx-auto d-block image"
//                               src="https://i.ebayimg.com/images/g/sgUAAOSwyppmavaz/s-l225.webp"
//                               alt={data.product_name}
//                             />
//                           </div>
//                           <div className="col-md-8">
//                             <div className="info">
//                               <div className="row">
//                                 <div className="col-md-5 product-name">
//                                   <div className="product-name">
//                                     <a
//                                       href=""
//                                       className="pro-name"
//                                       onClick={() =>
//                                         viewProduct(data.product_id)
//                                       }
//                                     >
//                                       {data?.product_name}
//                                     </a>
//                                     <div className="product-info">
//                                       <div>
//                                         Display:{" "}
//                                         <span className="value">5 inch</span>
//                                       </div>
//                                       <div>
//                                         RAM: <span className="value">4GB</span>
//                                       </div>
//                                       <div>
//                                         Memory:{" "}
//                                         <span className="value">32GB</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-4 quantity">
//                                   <label htmlFor="quantity">Quantity:</label>
//                                   <select
//                                     id="quantity"
//                                     type="number"
//                                     className="form-control quantity-input"
//                                     defaultValue={data?.cart_quantity}
//                                     value={data.cart_quantity}
//                                     onChange={(e) =>
//                                       handleQuantityChange(
//                                         index,
//                                         Number(e.target.value)
//                                       )
//                                     }
//                                   >
//                                     {[...Array(10).keys()].map((num) => (
//                                       <option key={num + 1} value={num + 1}>
//                                         {num + 1}
//                                       </option>
//                                     ))}
//                                   </select>
//                                 </div>
//                                 <div className="col-md-3 price">
//                                   <span>
//                                     ${data.product_id * data.cart_quantity}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className=""
//                           style={{
//                             position: "absolute",
//                             right: 25,
//                             cursor: "pointer",
//                           }}
//                         >
//                           <p
//                             className="border-bottom"
//                             onClick={() => removeCart(data.id)}
//                           >
//                             Remove
//                           </p>
//                         </div>
//                         <hr className="my-5" />
//                       </div>
//                     ))}
//                 </div>
//               </div>
//               <div className="col-md-12 col-lg-4">
//                 <div className="summary">
//                   <h3>Summary</h3>
//                   <div className="summary-item">
//                     <span className="text">Items ()</span>
//                     <span className="price">${totalPrice}</span>
//                   </div>
//                   <div className="summary-item">
//                     <span className="text">Discount</span>
//                     <span className="price">$0</span>
//                   </div>
//                   <div className="summary-item">
//                     <span className="text">Shipping</span>
//                     <span className="price">$0</span>
//                   </div>
//                   <div className="summary-item">
//                     <span className="text">Total</span>
//                     <span
//                       className="price"
//                       style={{ fontWeight: "bold", fontSize: "23px" }}
//                     >
//                       ${totalPrice}
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     className="btn btn-lg btn-block checkout-btn"
//                   >
//                     Go to checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </main>
//   );
// };

// export default AddtoCart;
