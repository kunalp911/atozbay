import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ImgPaymentSuccess = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <FaCheckCircle className="text-success" size={80} />
      <h1 className="text-successsss mt-3"> Package Purchased</h1>
      <p className="partext text-center mt-3">
        Thank you for subscribing to our new package!
        <br />
      </p>
      {/* <p className="paronetext text-muted text-center mt-3">
        Thanks for shopping with atozbay.
      </p> */}
      <p className="paronetext text-muted text-center mt-3">
        Please email{" "}
        <span className="text-success textemail">test@atozbay.com</span> if you
        have any questions.
      </p>
      <div className="mt-4 d-flex">
        <Link to={"/"}>
          <a href="/" className="btn btn-success mr-3">
            Continue Shopping
          </a>
        </Link>
        {/* <Link to={"/purchase"}>
          {" "}
          <a href="" className="btn btn-outline-success">
            View Orders
          </a>
        </Link> */}
      </div>
    </div>
  );
};

export default ImgPaymentSuccess;
