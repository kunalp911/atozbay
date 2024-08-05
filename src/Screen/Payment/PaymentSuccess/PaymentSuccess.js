import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import an icon from react-icons (optional)
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <FaCheckCircle className="text-success" size={80} />
      <h1 className="text-success mt-3">Payment Successful!</h1>
      <p className="text-muted text-center mt-3">
        Thank you for your purchase. Your payment has been processed
        successfully.
      </p>
      <div className="mt-4 d-flex">
        <Link to={"/subscrib-Pkg-List"}>
          <a href="/order-details" className="btn btn-success mr-3">
            View Your Subscription
          </a>
        </Link>
        <Link to={"/"}>
          {" "}
          <a href="/" className="btn btn-outline-success">
            Go to Dashboard
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
