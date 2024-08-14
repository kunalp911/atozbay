import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  InputGroup,
  Image,
} from "react-bootstrap";
import "./message.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaPaperclip } from "react-icons/fa";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../Network_Call/apiservices";
import moment from "moment/moment";

const MessageScreen = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  console.log("messageHistory", messageHistory);
  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageHistory]);

  useEffect(() => {
    if (selectedUser) {
      getMessagesForUser(selectedUser.user_id);
      getMessagesHistory(selectedUser.user_id);
      console.log("<><><>", selectedUser.user_id);
    }
  }, [selectedUser]);

  const getUserList = () => {
    try {
      apiCallNew("post", {}, ApiEndPoints.MessageUserList).then((response) => {
        if (response.success) {
          setUserList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMessagesForUser = (userId) => {
    try {
      apiCallNew("post", { user_id: userId }, ApiEndPoints.GetMessages).then(
        (response) => {
          if (response.success) {
            setMessages(response.result);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getMessagesHistory = (id) => {
    try {
      apiCallNew("post", {}, ApiEndPoints.MessageHistory + id).then(
        (response) => {
          if (response.success) {
            setMessageHistory(response.result);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const payload = {
      to_id: selectedUser.user_id,
      message: newMessage,
    };

    try {
      apiCallNew("post", payload, ApiEndPoints.SendMessage).then((response) => {
        if (response.success) {
          setMessages([
            ...messages,
            { id: Date.now(), text: newMessage, sender: "You", time: "Now" },
          ]);
          getMessagesHistory(selectedUser.user_id);
          setNewMessage("");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log("userList", userList);

  return (
    <div>
      <Header />
      <div className="sideallspace mt-3">
        <h4 className="helo mt-3">Messages</h4>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-3 bg-light">
            <ListGroup>
              <ListGroup.Item className="font-weight-bold">
                From atozbay
              </ListGroup.Item>
              <ListGroup.Item className="font-weight-bold">
                From members
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={12} md={4} lg={3} className=" border-end">
            <div className="d-flex justify-content-between align-items-center border-bottom">
              <Form.Check type="checkbox" className="mb-3 ml-4" />
              <IconButton aria-label="delete" className="ml-auto">
                <DeleteIcon />
              </IconButton>
            </div>
            <ListGroup className="mt-1 ml-2">
              {userList?.map((user) => (
                <ListGroup.Item
                  key={user.user_id}
                  onClick={() => handleUserSelection(user)}
                  className={
                    selectedUser?.user_id === user.user_id
                      ? "text-primary font-weight-bold"
                      : ""
                  }
                  style={{ cursor: "pointer" }}
                >
                  <Form.Check type="checkbox" className="ml-1" />
                  <img
                    src="https://i.ebayimg.com/00/s/MzAwWDMwMA==/z/-BwAAOSwvdZko4Ug/$_7.PNG"
                    alt="eBay"
                    className="me-2 rounded-circle ms-2"
                    width={20}
                    height={20}
                  />
                  {user?.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col xs={12} md={8} lg={7} className="pl-3 mx-auto">
            <Card className="chat-card">
              <Card.Body>
                <Card.Title className="mb-4">
                  {selectedUser?.name || "Select a user to chat"}
                </Card.Title>

                <div className="chat-messages mb-4">
                  {messageHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-bubble ${
                        message.to_id === selectedUser.user_id
                          ? "sent"
                          : "received"
                      }`}
                    >
                      <Row
                        className={
                          message.sender === "You" ? "flex-row-reverse" : ""
                        }
                      >
                        <Col
                          xs={12}
                          className={`d-flex ${
                            message.to_id === selectedUser.user_id
                              ? "justify-content-end"
                              : "justify-content-start"
                          }`}
                        >
                          <div
                            className={`message-box ${
                              message.to_id === selectedUser.user_id
                                ? "sent-message"
                                : "received-message"
                            }`}
                          >
                            <p className="mb-1">{message.message}</p>
                            <small className="text-muted">
                              {moment(message.created_at).format("LT")}
                            </small>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <hr />

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Write a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                    disabled={!selectedUser} // Disable if no user is selected
                  />
                  <button
                    className="btn send-buttonchat"
                    onClick={handleSendMessage}
                    disabled={!selectedUser} // Disable if no user is selected
                  >
                    Send
                  </button>
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default MessageScreen;
