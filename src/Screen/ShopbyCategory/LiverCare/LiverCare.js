import React from "react";
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import Topheader from "../../../ShopCategoryComponent/Topheader";
import '../shopcategory.css'

const LiverCare = () => {
  return (
    <div>
      <Header />
      <div className="" style={{ padding: "0px 40px" }}>
        <Topheader
          mainTitle="Liver Care"
          description="Shop designer watches, Jewelry and bags on atozbay."
        />
        <div className="row my-4">
          <div className="col-md-2">
            <h5>Shop by Brand</h5>
            <ul className="list-group">
              <li className="list-group-item">Audemars Piguet</li>
              <li className="list-group-item">Balenciaga</li>
              <li className="list-group-item">Breitling</li>
            </ul>
          </div>
          <div className="col-md-10">
            <img
              src="https://i.ebayimg.com/00/s/MTM4OFgzODEw/z/RdYAAOSwzZtmbBpI/$_57.JPG"
              alt="Luxury summer special"
              className="custom-image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LiverCare;
