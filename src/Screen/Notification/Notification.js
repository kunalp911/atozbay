import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "./notification.css";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";

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
  // const [notifications, setNotifications] = useState([]);
  // const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [notificationList, setNotificationList] = useState([]);

  // const handleCheckboxChange = (id) => {
  //   setSelectedNotifications((prevSelected) =>
  //     prevSelected.includes(id)
  //       ? prevSelected.filter((notificationId) => notificationId !== id)
  //       : [...prevSelected, id]
  //   );
  // };

  // const handleMultipleDelete = () => {
  //   setNotifications(
  //     notifications.filter(
  //       (notification) => !selectedNotifications.includes(notification.id)
  //     )
  //   );
  //   setSelectedNotifications([]); // Clear the selection after deletion
  // };

  //   NotificationList

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
  return (
    <div>
      <Header />
      <Container className="p-3 mb-4">
        <h2 className="text-center helo mb-4">Notifications</h2>
        <Button variant="danger" className="mb-3" size="sm">
          Delete Selected
        </Button>
        <Row>
          {notificationList.map((notification) => (
            <Col xs={12} md={12} lg={12} key={notification.id} className="mb-3">
              <Card className="notification-card">
                <Card.Body>
                  <Form.Check type="checkbox" className="mb-1 mr-2 ms-1" />
                  <Card.Title className="ms-2">{notification.title}</Card.Title>
                  <Card.Text className="ms-2">{notification.message}</Card.Text>
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
