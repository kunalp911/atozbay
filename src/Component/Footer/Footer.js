import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
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
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Registration
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      atozbay Money Back Guarantee
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Bidding & buying help
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Stores
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercasess">Sell</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Start selling
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Learn to sell
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Affiliates
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercasess">Stay connected</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      atozbay Blogs
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
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
                    <Link to={"/terms-services"}>
                      <a className="text-dark footerdroptitle">
                        Terms & Services
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercasess">Help & Contact</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-dark footerdroptitle">
                      Seller Information Center
                    </a>
                  </li>
                  <li>
                    <Link to={"/contact-us"}>
                      <a className="text-dark footerdroptitle">Contact us</a>
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
