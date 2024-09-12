import React from "react";
import { Button } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ImgPaymentDecliend = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <FaExclamationTriangle className="text-danger" size={80} />
      <h1 className="text-danger mt-3">Payment Declined</h1>
      <p className="text-muted text-center mt-3">
        Unfortunately, your payment was declined. Please check your payment
        details and try again.
      </p>
      <div className="mt-4 d-flex">
        <Link to="/">
          {" "}
          <Button variant="danger" className="mr-3">
            Retry
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ImgPaymentDecliend;
