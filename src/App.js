import { ToastContainer } from "react-toastify";
import PublicRouter from "./Router/PublicRouter";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { CartProvider } from "./Component/context/AuthContext";

function App() {
  // const PaymentSuccessListener = () => {
  //   const location = useLocation();

  //   useEffect(() => {
  //     if (location.pathname === "/payment-success") {
  //       const query = new URLSearchParams(location.search);
  //       const id = query.get("id");
  //       console.log("id", id);
  //       console.log("query", query);

  //       if (id) {
  //         const token = getToken(); // Get the token from storage
  //         const postData = {
  //           subscribe_id: id,
  //           payment_status: "success",
  //         };

  //         axios
  //           .post(ApiEndPoints.Payment_Response, postData, {
  //             headers: {
  //               Authorization: `Bearer ${token}`, // Include the token in the headers
  //             },
  //           })
  //           .then((response) => {
  //             console.log("API Success Response:", response.data);
  //           })
  //           .catch((error) => {
  //             console.error("API Error:", error);
  //           });
  //       }
  //     } else if (location.pathname === "/payment-cancel") {
  //       const query = new URLSearchParams(location.search);
  //       const id = query.get("id");
  //       console.log("id", id);
  //       console.log("query", query);

  //       if (id) {
  //         const token = getToken(); // Get the token from storage
  //         const postData = {
  //           subscribe_id: id,
  //           payment_status: "cancel",
  //         };

  //         axios
  //           .post(ApiEndPoints.Payment_Response, postData, {
  //             headers: {
  //               Authorization: `Bearer ${token}`, // Include the token in the headers
  //             },
  //           })
  //           .then((response) => {
  //             console.log("API Cancel Response:", response.data);
  //           })
  //           .catch((error) => {
  //             console.error("API Error:", error);
  //           });
  //       }
  //     } else if (location.pathname === "/payment-declined") {
  //       const query = new URLSearchParams(location.search);
  //       const id = query.get("id");
  //       console.log("id", id);
  //       console.log("query", query);

  //       if (id) {
  //         const token = getToken(); // Get the token from storage
  //         const postData = {
  //           subscribe_id: id,
  //           payment_status: "declined",
  //         };

  //         axios
  //           .post(ApiEndPoints.Payment_Response, postData, {
  //             headers: {
  //               Authorization: `Bearer ${token}`, // Include the token in the headers
  //             },
  //           })
  //           .then((response) => {
  //             console.log("API Declined Response:", response.data);
  //           })
  //           .catch((error) => {
  //             console.error("API Error:", error);
  //           });
  //       }
  //     }
  //   }, [location]);

  //   return null; // This component doesn't render anything
  // };
  return (
    <CartProvider>
      <ToastContainer autoClose={1500} />
      <PublicRouter />
    </CartProvider>
  );
}

export default App;
