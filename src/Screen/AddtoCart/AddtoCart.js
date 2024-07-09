import React from "react";
import "./addtocart.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
const AddtoCart = () => {
  // <img src="https://i.ebayimg.com/images/g/sgUAAOSwyppmavaz/s-l225.webp" alt="Laptop 1" className="product-image" />
  return (
    <main className="page">
      <Header />
      <section className="shopping-cart dark">
        <div className="container">
          <div className="block-heading">
            <h2 className="shoptitle">Shopping Cart</h2>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  <div className="product">
                    <div className="row">
                      <div className="col-md-3">
                        <img
                          className="img-fluid mx-auto d-block image"
                          src="https://i.ebayimg.com/images/g/sgUAAOSwyppmavaz/s-l225.webp"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="info">
                          <div className="row">
                            <div className="col-md-5 product-name">
                              <div className="product-name">
                                <a href="#">
                                  Lenovo ThinkPad T14 Gen 1 14" FHD
                                </a>
                                <div className="product-info">
                                  <div>
                                    Display:{" "}
                                    <span className="value">5 inch</span>
                                  </div>
                                  <div>
                                    RAM: <span className="value">4GB</span>
                                  </div>
                                  <div>
                                    Memory: <span className="value">32GB</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 quantity">
                              <label for="quantity">Quantity:</label>
                              <select
                                id="quantity"
                                type="number"
                                className="form-control quantity-input"
                                defaultValue={2}
                              >
                                <option value="0" hidden></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                            <div className="col-md-3 price">
                              <span>$120</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className=""
                      style={{
                        position: "absolute",
                        right: 25,
                        cursor: "pointer",
                      }}
                    >
                      <p className="border-bottom">Remove</p>
                    </div>
                  </div>
                  <hr />

                  <div className="product">
                    <div className="row">
                      <div className="col-md-3">
                        <img
                          className="img-fluid mx-auto d-block image"
                          src="https://i.ebayimg.com/images/g/Or8AAOSw4Ktmavcs/s-l225.jpg"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="info">
                          <div className="row">
                            <div className="col-md-5 product-name">
                              <div className="product-name">
                                <a href="#">
                                  Lenovo ThinkPad T14 Gen 1 14" FHD
                                </a>
                                <div className="product-info">
                                  <div>
                                    Display:{" "}
                                    <span className="value">5 inch</span>
                                  </div>
                                  <div>
                                    RAM: <span className="value">4GB</span>
                                  </div>
                                  <div>
                                    Memory: <span className="value">32GB</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 quantity">
                              <label for="quantity">Quantity:</label>
                              <select
                                id="quantity"
                                type="number"
                                className="form-control quantity-input"
                                defaultValue={1}
                              >
                                <option value="0" hidden></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                            <div className="col-md-3 price">
                              <span>$180</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className=""
                      style={{
                        position: "absolute",
                        right: 25,
                        cursor: "pointer",
                      }}
                    >
                      <p className="border-bottom">Remove</p>
                    </div>
                  </div>
                  <hr />
                  <div className="product">
                    <div className="row">
                      <div className="col-md-3">
                        <img
                          className="img-fluid mx-auto d-block image"
                          src="https://i.ebayimg.com/images/g/sgUAAOSwyppmavaz/s-l225.webp"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="info">
                          <div className="row">
                            <div className="col-md-5 product-name">
                              <div className="product-name">
                                <a href="#">
                                  Lenovo ThinkPad T14 Gen 1 14" FHD
                                </a>
                                <div className="product-info">
                                  <div>
                                    Display:{" "}
                                    <span className="value">5 inch</span>
                                  </div>
                                  <div>
                                    RAM: <span className="value">4GB</span>
                                  </div>
                                  <div>
                                    Memory: <span className="value">32GB</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 quantity">
                              <label for="quantity">Quantity:</label>
                              <select
                                id="quantity"
                                type="number"
                                className="form-control quantity-input"
                                defaultValue={2}
                              >
                                <option value="0" hidden></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                            <div className="col-md-3 price">
                              <span>$320</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className=""
                      style={{
                        position: "absolute",
                        right: 25,
                        cursor: "pointer",
                      }}
                    >
                      <p className="border-bottom">Remove</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-item">
                    <span className="text">Items (3)</span>
                    <span className="price">$620</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Discount</span>
                    <span className="price">$0</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Shipping</span>
                    <span className="price">$0</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Total</span>
                    <span
                      className="price"
                      style={{ fontWeight: "bold", fontSize: "23px" }}
                    >
                      $620
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AddtoCart;
