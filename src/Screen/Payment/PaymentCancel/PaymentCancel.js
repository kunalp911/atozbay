import React from "react";
import { FaTimesCircle } from "react-icons/fa"; // Import an icon from react-icons (optional)
import { Button } from "react-bootstrap"; // Assuming you are using react-bootstrap
import { Link, useLocation } from "react-router-dom";

const PaymentCancel = () => {
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
      )}
    </>
  );
};

export default PaymentCancel;
