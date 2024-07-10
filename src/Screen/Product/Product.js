import React, { useState } from "react";
import "./product.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
const Product = () => {
  return (
    <div>
      <Header />
      <div className="container mt-4 mb-4">
        <div className="row">
          <div
            className="col-lg-6 col-md-12"
            style={{
              backgroundColor: "#f8f9fa",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="viewed-info badge badge-danger mb-2">
              6 VIEWED IN THE LAST 24 HOURS
            </div>
            <img
              src="https://i.ebayimg.com/images/g/QxgAAOSwB-plsB5T/s-l960.webp"
              className="img-fluid rounded"
              alt="Product Image"
            />
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
               <label for="quantity" className="mr-2">
                Quantity:
              </label> 
              <select
                id="quantity"
                type="number" 
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
              <button className="btn btn-secondary btn-block mb-2">
                Add to Cart
              </button>
              <button className="btn btn-info btn-block mb-2">
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
