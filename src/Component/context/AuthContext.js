import React, { createContext, useContext, useState } from "react";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

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

  return (
    <CartContext.Provider
      value={{
        cartCount,
        updateCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
