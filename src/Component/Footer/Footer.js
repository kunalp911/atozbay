import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { getToken } from "../../Helper/Storage";
const Footer = () => {
  const token = getToken();
  return (
    <div>
      <footer
        className="footer text-lg-start"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <div className="container p-4 pb-0">
          <section>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercasess">Buy</h6>
                <ul className="list-unstyled mb-0">
                  {/* <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      atozbay Money Back Guarantee
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Bidding & buying help
                    </a>
                  </li> */}
                  {!token && (
                    <li>
                      <Link to={"/signup"}>
                        <a href="#" className="text-dark footerdroptitle">
                          Registration
                        </a>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={"/all-product"}>
                      <a href="#!" className="text-dark footerdroptitle">
                        Stores
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercasess">Sell</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to={"/selling"}>
                      <a href="#!" className="text-dark footerdroptitle">
                        Start selling
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/selling"}>
                      <a href="#!" className="text-dark footerdroptitle">
                        Learn to sell
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercasess">Stay connected</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to={"/blogs"}>
                      <a href="#!" className="text-dark footerdroptitle">
                        atozbay Blogs
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com"
                      className="text-dark footerdroptitle"
                      target="_blank"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      className="text-dark footerdroptitle"
                      target="_blank"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercasess">About atozbay</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Company info
                    </a>
                  </li>
                  <li>
                    <Link to={"/privacy-policy"}>
                      <a className="text-dark footerdroptitle">
                        Privacy Policy
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/terms-conditions"}>
                      <a className="text-dark footerdroptitle">
                        Terms & Conditions
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercasess">Help & Contact</h6>
                <ul className="list-unstyled mb-0">
                  {/* <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Seller Information Center
                    </a>
                  </li> */}
                  <li>
                    <Link to={"/contact-us"}>
                      <a className="text-dark footerdroptitle">Contact us</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/report"}>
                      <a className="text-dark footerdroptitle">Report</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div className="text-center footertitle p-3">
          © 2024 Copyright:
          <a className="text-dark footertitles">
            Copyright © 1995-2024 atozbay Inc. All Rights Reserved.
            Accessibility, User Agreement, Privacy, Payments Terms of Use,
            Cookies, CA Privacy Notice, Your Privacy Choices and AdChoice
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
