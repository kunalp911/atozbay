import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "./notification.css";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import moment from "moment/moment";

// const initialNotifications = [
//   {
//     id: 1,
//     title: "Order Shipped",
//     message:
//       "Your order #1234 has been shipped. Your order #1234 has been shipped.",
//   },
//   {
//     id: 2,
//     title: "Payment Received",
//     message: "We have received your payment for order #1234.",
//   },
//   {
//     id: 3,
//     title: "New Offer",
//     message:
//       "Check out our latest offers and discounts Check out our latest offers and discountsCheck out our latest offers and discountsCheck out our latest offers and discounts!",
//   },
//   // Add more notifications as needed
// ];
const Notification = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = () => {
    try {
      apiCallNew("post", {}, ApiEndPoints.NotificationList).then((response) => {
        if (response.success) {
          setNotificationList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(
        selectedNotifications.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const deleteSelectedNotifications = () => {
    selectedNotifications.forEach((id) => deleteNotification(id));
    setSelectedNotifications([]); // Clear selections after deleting
  };

  const deleteNotification = (id) => {
    try {
      apiCallNew("delete", {}, ApiEndPoints.NotificationDelete + id).then(
        (response) => {
          if (response.success) {
            getNotification();
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <Container className="p-3 mb-4">
        <h2
          className="text-center mb-4 helo"
          style={{ fontWeight: "bold", color: "#343a40" }}
        >
          Notifications
        </h2>
        <Button
          variant="danger"
          className="mb-3"
          size="sm"
          onClick={deleteSelectedNotifications}
          disabled={selectedNotifications.length === 0}
        >
          Delete Selected
        </Button>
        <Row>
          {notificationList.map((notification) => (
            <Col xs={12} key={notification.id} className="mb-3">
              <Card className="notification-card shadow-sm">
                <Card.Body className="d-flex align-items-start">
                  <Form.Check
                    type="checkbox"
                    className="me-3"
                    onChange={() => handleSelect(notification.id)}
                    checked={selectedNotifications.includes(notification.id)}
                  />
                  <div style={{ flex: 1 }}>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                        {notification.title}
                      </span>
                      <small className="text-muted">
                        {moment(notification.created_at).fromNow()}
                      </small>
                    </Card.Title>
                    <Card.Text className="mt-2" style={{ color: "#6c757d" }}>
                      {notification.message}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Notification;
