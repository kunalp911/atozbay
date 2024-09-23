import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import "./blog.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/image/bay.png";

const Blogs = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [blogs, setBlogs] = useState([]);
  console.log("first", blogs);

  useEffect(() => {
    getBlogs();
    window.scrollTo(0, 0);
  }, []);

  const getBlogs = async () => {
    setLoad(true);
    try {
      const response = await apiCallNew("post", null, ApiEndPoints.BlogList);
      if (response.success == true) {
        setBlogs(response.result);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  return (
    <div>
      {" "}
      <Header />
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Container fluid>
        <div className="row my-4">
          <div className="col-12">
            <div className="text-white blogheadercss">
              <h3 className="display fw-bold">Blogs</h3>
            </div>
          </div>
        </div>
        <Row className="my-3">
          {blogs?.map((blog) => (
            <Col xs={12} md={4} lg={3} key={blog.id} className="mb-4">
              <Card
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/blogs/${blog?.slug}`)}
              >
                <Card.Img
                  variant="top"
                  src={blog?.image ? blog?.image : logo}
                  alt={blog?.title}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{blog.title}</Card.Title>
                  <Card.Text className="blog-description">
                    <div
                      dangerouslySetInnerHTML={{ __html: blog?.description }}
                    />
                  </Card.Text>
                </Card.Body>
                {/* <Card.Footer> */}
                <small className="text-muted text-end p-2">
                  Published on: {blog?.publish_date}
                </small>
                {/* </Card.Footer> */}
              </Card>
            </Col>
          ))}
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

export default Blogs;
