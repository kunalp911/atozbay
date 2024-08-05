import React, { useState } from "react";
import { ListGroup, Collapse } from "react-bootstrap";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ status }) => {
  const [open, setOpen] = useState({ selling: false, saved: false });

  console.log("?????????", status);
  const toggleOpen = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (section) => status === section;
  return (
    <div>
      <ListGroup variant="flush">
        <Link to="/summary" className="text-decoration-none">
          <ListGroup.Item
            className={`fw-bold fs-6 ${
              isActive("summary") ? "listitemname" : "listitemnamess"
            }`}
          >
            Summary
          </ListGroup.Item>
        </Link>
        <ListGroup.Item
          className={`fw-bold fs-6 ${
            isActive("Recently viewed") ? "listitemname" : "listitemnamess"
          }`}
        >
          Recently viewed
        </ListGroup.Item>
        <Link to="/bids-offers" className="text-decoration-none">
          <ListGroup.Item
            className={`fw-bold fs-6 ${
              isActive("bidding") ? "listitemname" : "listitemnamess"
            }`}
          >
            Bids & offers
          </ListGroup.Item>
        </Link>
        <Link to="/watch-list" className="text-decoration-none">
          <ListGroup.Item
            className={`fw-bold fs-6 ${
              isActive("watchlist") ? "listitemname" : "listitemnamess"
            }`}
          >
            Watchlist
          </ListGroup.Item>
        </Link>
        <Link to="/purchase" className="text-decoration-none">
          <ListGroup.Item
            className={`fw-bold fs-6 ${
              isActive("purchase") ? "listitemname" : "listitemnamess"
            }`}
          >
            Purchases
          </ListGroup.Item>
        </Link>
        <ListGroup.Item
          className={`fw-bold fs-6 ${
            isActive("selling") ? "listitemname" : "listitemnamess"
          }`}
          onClick={() => toggleOpen("selling")}
          aria-controls="selling-collapse"
          aria-expanded={open.selling}
        >
          Selling{" "}
          {open.selling ? (
            <i className="fa fa-angle-up" style={{ float: "right" }}></i>
          ) : (
            <i className="fa fa-angle-down" style={{ float: "right" }}></i>
          )}
        </ListGroup.Item>
        <Collapse in={open.selling}>
          <div id="selling-collapse" className="ms-3">
            <ListGroup variant="flush">
              <Link to="/selling/overview" className="text-decoration-none">
                <ListGroup.Item className="fs-6">Overview</ListGroup.Item>
              </Link>
              <ListGroup.Item className="fs-6">Sell an item</ListGroup.Item>
            </ListGroup>
          </div>
        </Collapse>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
