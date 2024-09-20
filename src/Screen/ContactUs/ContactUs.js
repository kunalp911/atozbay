import React, { useState } from "react";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./contact.css";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { getToken } from "../../Helper/Storage";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    message: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setload(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.Contactus
      );
      if (response.success === true) {
        setload(false);
        toast.success(response.msg);
        setFormData({
          name: "",
          email: "",
          mobile_number: "",
          message: "",
          subject: "",
        });
      } else {
        setload(false);
        const errors = response.result;
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            errors[field].forEach((message) => {
              toast.error(message);
            });
          }
        }
      }
    } catch (error) {
      setload(false);
      console.log(error);
    }
  };
  const loginNavigate = () => {
    if (token) {
      handleSubmit();
    } else {
      navigate("/login");
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
      <Container className="mt-3 mb-5">
        <div className="text-center">
          <h2 className="helo text-center">Contact Us</h2>
          <p className="text-muted">
            We’re here to help! Whether you have a question, feedback, or need
            assistance, feel free to reach out to us through any of the methods
            below. Our team is ready to assist you.
          </p>
        </div>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your mobile number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className="mt-3 btncontact" onClick={loginNavigate}>
            Submit
          </Button>
        </Form>
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

export default ContactUs;
