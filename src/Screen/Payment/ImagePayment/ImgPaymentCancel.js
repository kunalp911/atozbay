import React from "react";
import { Button } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ImgPaymentCancel = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <FaTimesCircle className="text-danger" size={80} />
      <h1 className="text-danger mt-3">Payment Canceled</h1>
      <p className="text-muted text-center mt-3">
        Unfortunately, your payment was not processed. Please try again or
        contact support if the issue persists.
      </p>
      <div className="mt-4 d-flex">
        <Link to="/">
          {" "}
          <Button variant="danger" className="mr-3">
            Retry
          </Button>
        </Link>
        <Link to="/">
          {" "}
          <Button variant="outline-danger">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default ImgPaymentCancel;
