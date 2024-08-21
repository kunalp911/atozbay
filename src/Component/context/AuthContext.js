import React, { createContext, useContext, useEffect, useState } from "react";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishListCount, setWishListCount] = useState(0);
  const [cartnum, setCartnum] = useState(0);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    let savedCart = [];
    if (cartData) {
      try {
        savedCart = JSON.parse(cartData);
        setCartnum(savedCart?.length);
      } catch (error) {
        savedCart = [];
      }
    }
  }, []);

  const updateCartnum = (cart) => {
    setCartnum(cart?.length);
  };
  // const updateCart = () => {
  //   setCartnum(cart?.length);
  // };
  const updateCartCount = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.CartProductCount).then((response) => {
        if (response.success) {
          setCartCount(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartCount = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.WishListProductCount).then(
        (response) => {
          if (response.success) {
            setWishListCount(response.result);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        updateCartCount,
        wishListCount,
        handleCartCount,
        cartnum,
        updateCartnum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
