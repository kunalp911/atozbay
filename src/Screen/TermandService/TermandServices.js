import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../Network_Call/apiservices";

const removeHtmlTags = (html) => html?.replace(/<\/?[^>]+>/gi, "");

const TermandServices = () => {
  const [data, setData] = useState({});

  const plainTextContent = removeHtmlTags(data?.content);
  useEffect(() => {
    handlegetTerm();
  }, []);
  const handlegetTerm = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.Terms).then((response) => {
        if (response.success) {
          setData(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div
        className="container mt-4 mb-5"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* <h4 style={{ color: "#343a40", marginBottom: "1.5rem" }}>
            Terms & Conditions
          </h4> */}
          <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermandServices;
