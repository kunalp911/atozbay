import React from "react";

const Topheader = ({ mainTitle, description }) => {
  return (
    <div className="row my-4">
      <div className="col-12">
        <div className="p-4 text-white topheadercss">
          <h3 className="display">{mainTitle}</h3>
          {/* <p className="lead" style={{ fontWeight: "500" }}> 
          {description}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Topheader;
