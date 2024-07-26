import { ToastContainer } from "react-toastify";
import PublicRouter from "./Router/PublicRouter";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { CartProvider } from "./Component/context/AuthContext";

function App() {
  return (
    <CartProvider>
      <ToastContainer autoClose={1500} />
      <PublicRouter />
    </CartProvider>
  );
}

export default App;
