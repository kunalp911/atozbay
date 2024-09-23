import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import logo from "../../Assets/image/bay.png";
const BlogDetails = () => {
  const { slug } = useParams();
  const [BlogDetails, setBlogDetails] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getBlogDetails();
    window.scrollTo(0, 0);
  }, []);

  const getBlogDetails = async () => {
    setLoad(true);
    try {
      const response = await apiCallNew(
        "get",
        null,
        ApiEndPoints.BlogDetail + slug
      );
      if (response.success == true) {
        setBlogDetails(response.result);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  return (
    <div>
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={10}>
            <h2 className="text-center fw-bold">{BlogDetails.title}</h2>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col xs={12} md={10} lg={10}>
            <Image
              src={BlogDetails?.image ? BlogDetails?.image : logo}
              fluid
              className="mb-4"
              alt={BlogDetails.title}
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={10}>
            <div
              dangerouslySetInnerHTML={{ __html: BlogDetails.description }}
            />
          </Col>
        </Row>
      </Container>
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

export default BlogDetails;
