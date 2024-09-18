import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // You can use js-cookie or other libraries for handling cookies
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const consent = Cookies.get("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie-consent", "accepted", { expires: 365 }); // Store the consent in a cookie
    setShowBanner(false);
  };

  const handleDecline = () => {
    Cookies.set("cookie-consent", "declined", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={bannerStyle}>
      <p style={textStyle}>
        We use cookies to enhance your experience. By continuing to visit this
        site, you agree to our use of cookies. A cookie is a small text file
        that a website saves on your computer or mobile device when you visit
        the site. It enables the website to remember your actions and
        preferences (such as login, language, font size and other display
        preferences) over a period of time, so you don’t have to keep
        re-entering them whenever you come back to the site or browse from one
        page to another.{" "}
        {/* <Link to="/cookies-policy" style={linkStyle}>
          Read our cookies policy
        </Link> */}
      </p>
      <div style={buttonContainerStyle}>
        <button onClick={handleAccept} style={acceptButtonStyle}>
          Accept
        </button>
        <button onClick={handleDecline} style={declineButtonStyle}>
          Decline
        </button>
      </div>
    </div>
  );
};

const bannerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "15px",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const textStyle = {
  margin: "0 0 10px 0",
  fontSize: "14px",
  fontFamily: "Arial, sans-serif",
};

const linkStyle = {
  color: "#00A5FF",
  textDecoration: "underline",
};

const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
};

const acceptButtonStyle = {
  backgroundColor: "#3665f3",
  color: "#fff",
  border: "none",
  padding: "0px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
};

const declineButtonStyle = {
  backgroundColor: "#FF5252",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
};

export default CookieConsent;
