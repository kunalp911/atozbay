import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { CircularProgress } from "@mui/material";

const PrivacyPolicy = () => {
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setload(true);
    const response = await apiCallNew("get", null, ApiEndPoints.Privacy);
    if (response.success == true) {
      setData(response.result);
      setload(false);
    } else {
      setload(false);
    }
  };
  console.log("data", data);

  return (
    <div>
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <div className="container mt-3">
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: "white",
  },
};

export default PrivacyPolicy;
