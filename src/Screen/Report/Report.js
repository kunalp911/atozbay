import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { getToken } from "../../Helper/Storage";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const Report = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [issueDescription, setIssueDescription] = useState("");
  const [issueType, setIssueType] = useState(null);
  const [load, setload] = useState(false);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    getProblemList();
    window.scrollTo(0, 0);
  }, []);

  const handleDescriptionChange = (e) => {
    setIssueDescription(e.target.value);
  };

  const handleIssueType = (id) => {
    setIssueType(id);
  };

  const getProblemList = async () => {
    try {
      setload(true);
      const response = await apiCallNew("get", {}, ApiEndPoints.ProblemList);
      if (response.success === true) {
        setTypeList(response.result);
        setload(false);
      } else {
        setload(false);
      }
    } catch (error) {
      setload(false);
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      problem_id: issueType,
      message: issueDescription,
    };
    try {
      setload(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ReportProblem
      );
      if (response.success === true) {
        setload(false);
        toast.success(response.msg);
        setIssueDescription("");
        setIssueType(null);
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
  const loginNavigate = (event) => {
    event.preventDefault();
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
      <Container className="my-3">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={8}>
            <h3 className="text-center helo">Report a technical issue</h3>
            <p className="text-center">
              We're sorry you're facing a technical issue with the Atozbay app!
              Please describe the issue with as much detail and we will get back
              to you.
            </p>

            <Form onSubmit={loginNavigate}>
              <Form.Group controlId="issueType mt-2">
                <Form.Label className="fw-bold">
                  Select Report Reason
                </Form.Label>
                <div>
                  {typeList?.map((item, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      id={`radio-${item.id}`}
                      label={
                        <span
                          style={{
                            color: "#1e1e1e",
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                        >
                          {item?.title}
                        </span>
                      }
                      name="issueType"
                      value={item.id}
                      onClick={() => handleIssueType(item?.id)}
                      checked={issueType === item.id}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group controlId="issueDescription">
                <Form.Label className="fw-bold mt-3">Report Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  maxLength={1000}
                  value={issueDescription}
                  onChange={handleDescriptionChange}
                  placeholder="Describe the issue..."
                />
                <small>{issueDescription?.length}/1000</small>
              </Form.Group>
              <Button
                type="submit"
                className="w-100 mt-3"
                style={{ backgroundColor: "#3665f3" }}
                disabled={!issueDescription}
              >
                Send
              </Button>
              <p className="mt-3 text-muted text-center">
                Please don't include any personal information such as your name,
                address, or phone number.
              </p>
              <p className="small text-muted text-center">
                By submitting your report, you agree to our terms and conditions
                and privacy policy. if you have any questions or concerns,
                please contact us.
              </p>
            </Form>
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

export default Report;
