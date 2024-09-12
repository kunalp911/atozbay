import React from "react";
import Header from "../../../Component/Header/Header";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { FaCalendarAlt, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import "./activep.css";

const ActivePackage = () => {
  const [packages, setPackages] = React.useState([]);
  const [load, setload] = React.useState(false);

  const successPlans = packages?.filter(
    (plan) => plan.payment_status === "success"
  );

  React.useEffect(() => {
    getPakageList();
  }, []);

  const getPakageList = async () => {
    try {
      apiCallNew("post", {}, ApiEndPoints.SubscriptionList).then((response) => {
        if (response.success) {
          setPackages(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="selling" bidchild="active-pack" />
          </Col>
          <Col md={10}>
            <h2 className="helo">Active Package</h2>
            <Container className="my-5">
              <Row>
                {successPlans?.length > 0 ? (
                  successPlans?.map((plan) => (
                    <Col xs={12} md={6} lg={4} key={plan.id} className="mb-4">
                      <Card className="subscriptionss-card shadow-sm">
                        <Card.Body className="d-flex flex-column align-items-center">
                          <FaCheckCircle
                            className="text-success subscriptionss-icon"
                            size={40}
                          />
                          <Card.Title className="mt-3 mb-2 text-center subscriptionss-title">
                            {plan.package_title}
                          </Card.Title>
                          <Card.Text className="text-center">
                            <p className="mb-2">
                              <FaDollarSign className="me-2 text-primary" />
                              <strong>Price:</strong> ${plan.package_price}
                            </p>
                            <p className="mb-2">
                              <strong>No. of Images:</strong>
                              {plan.package_no_of_images}
                            </p>
                            <p className="mb-2">
                              <FaCalendarAlt className="me-2 text-info" />
                              <strong>Start Date:</strong>{" "}
                              {plan.package_start_date}
                            </p>
                            <p className="mb-2">
                              <FaCalendarAlt className="me-2 text-danger" />
                              <strong>End Date:</strong> {plan.package_end_date}
                            </p>
                            <p className="mt-3">
                              <Badge bg="success">
                                Transaction ID: {plan.transaction_id}
                              </Badge>
                            </p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p className="text-center">No active subscriptions found.</p>
                )}
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ActivePackage;
