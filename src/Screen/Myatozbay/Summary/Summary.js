import React from "react";
import Header from "../../../Component/Header/Header";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { Box, Tab, Tabs } from "@mui/material";

const Summary = () => {
  return (
    <div>
      <Header />
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <div className="d-flex">
            <div>
              <p className="mb-0" style={{ borderBottom: "2px solid black" }}>
                Activity
              </p>
            </div>
            <div>
              <p
                className="mb-0 ms-4"
                style={{ borderBottom: "2px solid black" }}
              >
                Message
              </p>
            </div>
            <div>
              <p
                className="mb-0 ms-4"
                style={{ borderBottom: "2px solid black" }}
              >
                Account
              </p>
            </div>
          </div>
        </Box> */}
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="summary" />
          </Col>
          <Col md={10}>
            <Row>
              <Col>
                <h2 className="helo">Summary</h2>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Summary;
