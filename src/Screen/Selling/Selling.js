import React from "react";
import Header from "../../Component/Header/Header";
import "./selling.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/Footer/Footer";
const Selling = () => {
   const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="" style={{ padding: "10px 40px" }}>
        <div className="d-flex justify-content-between">
          <div>
            <h4>Selling</h4>
          </div>
          <div>
            <button className="btn listanbutton" onClick={() => navigate("/selling/list-item")}>List an item</button>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-12">
            <img
              src="https://i.ebayimg.com/00/s/NDk2WDE0NDA=/z/hcQAAOSwg2dj6n~7/$_57.JPG"
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

export default Selling;
