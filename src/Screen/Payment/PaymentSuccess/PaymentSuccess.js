import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import an icon from react-icons (optional)
import { Link, useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const location = useLocation();
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  const queryParams = getQueryParams(location.search);

  const deviceType = queryParams.get("device_type");
  return (
    <>
      {deviceType == "mobile" ? (
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          Redirecting...
        </div>
      ) : (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
          <FaCheckCircle className="text-success" size={80} />
          <h1 className="text-successsss mt-3">Order Completed</h1>
          <p className="partext text-center mt-3">
            Thank you! We've received your order.
            <br />
          </p>
          <p className="paronetext text-muted text-center mt-3">
            Thanks for shopping with atozbay.
          </p>
          <p className="paronetext text-muted text-center mt-3">
            Please email{" "}
            <span className="text-success textemail">test@atozbay.com</span> if
            you have any questions.
          </p>
          <div className="mt-4 d-flex">
            <Link to={"/"}>
              <a href="/" className="btn btn-success mr-3">
                Continue Shopping
              </a>
            </Link>
            <Link to={"/purchase"}>
              {" "}
              <a href="" className="btn btn-outline-success">
                View Orders
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;

{
  /* <p className="text-muted text-center mt-3">
        Thank you for your purchase. Your payment has been processed
        successfully.
      </p> */
}
