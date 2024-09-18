import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "./subscrip.css";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { doller } from "../../Component/ReuseFormat/Doller";

const Subscription = () => {
  const [packages, setPackages] = React.useState([]);
  const [load, setload] = React.useState(false);

  React.useEffect(() => {
    getPakageList();
  }, []);

  const makePayment = async (id) => {
    setload(true);
    try {
      const payload = {
        package_id: id,
      };
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.BuySubscription
      );
      if (response?.success == true) {
        toast.success(response?.msg);
        setload(false);
        if (response?.result?.url) {
          window.location.href = response?.result?.url;
        }
      } else {
        setload(false);
        toast.error(response?.msg);
      }
    } catch (error) {
      setload(false);
      toast.error(error);
    }
  };

  const getPakageList = async () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.PackageList).then((response) => {
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
      <Header />{" "}
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Container className="py-4 subscription-container">
        <h2 className="text-center mb-4 helo">Package List</h2>
        <Row className="g-4">
          {packages?.map((pkg) => (
            <Col key={pkg.id} xs={12} sm={6} md={4} lg={4}>
              <Card className="h-100 shadow-lg subscription-card">
                <Card.Body>
                  <Card.Title className="pkgtitle text-gradient">
                    {pkg.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-3 price-tag">
                    {doller?.Aud} {pkg.price}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Valid for:</strong> {pkg.days} days
                    <br />
                    <strong>No. of Images:</strong> {pkg.no_of_images}
                  </Card.Text>
                  <Card.Text>{pkg.description.replace(/\r\n/g, " ")}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button
                    className="subsbtn"
                    size="sm"
                    onClick={() => makePayment(pkg.id)}
                  >
                    Buy Now
                  </Button>
                </Card.Footer>
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

export default Subscription;
