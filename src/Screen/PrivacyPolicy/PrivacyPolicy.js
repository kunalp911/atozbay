import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";

const PrivacyPolicy = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await apiCallNew("get", null, ApiEndPoints.Privacy);
    if (response.success == true) {
      setData(response.result);
    }
  };
  console.log("data", data);

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h4>Privacy Policy</h4>
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
