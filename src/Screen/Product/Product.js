import React, { useState } from "react";
import "./product.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import Zoom from "react-medium-image-zoom";
import ReactImageMagnify from "react-image-magnify";

import "react-medium-image-zoom/dist/styles.css";
const Product = () => {
  const images = [
    "https://i.ebayimg.com/images/g/QxgAAOSwB-plsB5T/s-l960.webp",
    " https://i.ebayimg.com/images/g/1GEAAOSwt69jPeFq/s-l1600.webp",
    "https://i.ebayimg.com/images/g/QxgAAOSwB-plsB5T/s-l960.webp",
    "https://i.ebayimg.com/images/g/azkAAOSwQGFmjs8k/s-l960.webp",
    "https://i.ebayimg.com/images/g/azkAAOSwQGFmjs8k/s-l960.webp",
  ];
  return (
    <div>
      <Header />
      <div className="container mt-4 mb-4">
        <div className="row justify-content-center">
          <div
            className="col-lg-6 col-md-12 d-flex flex-column align-items-center"
            style={{
              backgroundColor: "#f8f9fa",
            }}
          >
            <div className="viewed-info badge badge-danger mb-2">
              6 VIEWED IN THE LAST 24 HOURS
            </div>
            <div
              id="productCarousel"
              className="carousel slide main-image-container"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <Zoom>
                      <img
                        className="c"
                        alt={`Product Image ${index + 1}`}
                        src={src}
                        style={{
                          width: "100%",
                          height: "500px",
                          objectFit: "contain",
                        }}
                      />
                    </Zoom>
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#productCarousel"
                role="button"
                data-slide="prev"
                style={{ color: "black" }}
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                  style={{ filter: "invert(100%)" }}
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#productCarousel"
                role="button"
                data-slide="next"
                style={{ color: "black" }}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                  style={{ filter: "invert(100%)" }}
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <div className="d-flex justify-content-center mt-2">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="img-thumbnail mx-1"
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  alt={`Thumbnail ${index + 1}`}
                  data-target="#productCarousel"
                  data-slide-to={index}
                />
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <h1 className="product-titlee">
              Apple iPad Pro 3rd Gen. 64GB, Wi-Fi, 12.9 in - Silver
            </h1>
            <div className="seller-infoe mb-3">
              <span className="seller-name d-block font-weight-bold">
                KARTECH LLC
              </span>
              <span className="seller-rating text-success">99.8% positive</span>
              <a href="#" className="d-block">
                Seller's other items
              </a>
              <a href="#" className="d-block">
                Contact seller
              </a>
            </div>
            <div className="price mb-3">
              <span className="price-valuee h4 text-danger">$1,299.99</span>
              <span className="price-offere d-block">or Best Offer</span>
            </div>
            <div className="conditione mb-3">
              <span>Condition: New</span>
            </div>
            <div className="quantitye mb-3">
              <label htmlFor="quantity" className="mr-2">
                Quantity:
              </label>
              <select
                id="quantity"
                defaultValue={1}
                className="form-control quantity-input w-25 text-center"
              >
                <option value="0" hidden></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="buttonse mb-3">
              <button className="btn buyitnow-btn btn-block mb-2">
                Buy It Now
              </button>
              <button className="btn btn-secondary addcarditnow-btn btn-block mb-2">
                Add to Cart
              </button>
              <button className="btn btn-info additnow-btn btn-block mb-2">
                Add to Watchlist
              </button>
            </div>
            <div className="watchinge">
              <span className="text-muted">
                People want this. 24 people are watching this.
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
