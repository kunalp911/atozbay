import React, { useState } from "react";
import { ListGroup, Collapse } from "react-bootstrap";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ status, bidchild }) => {
  const [open, setOpen] = useState({ selling: false, saved: false });

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
        <Link to="/recently-view" className="text-decoration-none">
          <ListGroup.Item
            className={`fw-bold fs-6 ${
              isActive("recently") ? "listitemname" : "listitemnamess"
            }`}
          >
            Recently viewed
          </ListGroup.Item>
        </Link>
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
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "overview" ? "text-primary" : "text-muted"
                  }`}
                >
                  Overview
                </ListGroup.Item>
              </Link>
              <Link to="/seller-orders-list" className="text-decoration-none">
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "ordersell" ? "text-primary" : "text-muted"
                  }`}
                >
                  Orders
                </ListGroup.Item>
              </Link>
              <Link to="/active" className="text-decoration-none">
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "active" ? "text-primary" : "text-muted"
                  }`}
                >
                  Active
                </ListGroup.Item>
              </Link>
              <Link to="/drafts" className="text-decoration-none">
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "draft" ? "text-primary" : "text-muted"
                  }`}
                >
                  Drafts
                </ListGroup.Item>
              </Link>
              <Link to="/active-package" className="text-decoration-none">
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "active-pack" ? "text-primary" : "text-muted"
                  }`}
                >
                  Active Package
                </ListGroup.Item>
              </Link>
              <Link to="/packages" className="text-decoration-none">
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "draftss" ? "text-primary" : "text-muted"
                  }`}
                >
                  Packages
                </ListGroup.Item>
              </Link>
              <Link to="/wallet-history" className="text-decoration-none">
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "earning" ? "text-primary" : "text-muted"
                  }`}
                >
                  Wallet
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        </Collapse>
        <ListGroup.Item
          className={`fw-bold fs-6 ${
            isActive("biddinghis") ? "listitemname" : "listitemnamess"
          }`}
          onClick={() => toggleOpen("biddinghis")}
          aria-controls="selling-collapse"
          aria-expanded={open.biddinghis}
        >
          Bidding History{" "}
          {open.biddinghis ? (
            <i className="fa fa-angle-up" style={{ float: "right" }}></i>
          ) : (
            <i className="fa fa-angle-down" style={{ float: "right" }}></i>
          )}
        </ListGroup.Item>
        <Collapse in={open.biddinghis}>
          <div id="selling-collapse" className="ms-3">
            <ListGroup variant="flush">
              <Link
                to="/all-product"
                className="text-decoration-none"
                onClick={() => toggleOpen("biddinghis")}
              >
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "all" ? "text-primary" : "text-muted"
                  }`}
                >
                  All
                </ListGroup.Item>
              </Link>
              <Link
                to="/auction-product"
                className="text-decoration-none"
                onClick={() => toggleOpen("biddinghis")}
              >
                <ListGroup.Item
                  className={`fs-6 ${
                    bidchild == "auctionp" ? "text-primary" : "text-muted"
                  }`}
                >
                  Auction
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        </Collapse>
        <Link to="/message" className="text-decoration-none">
          <ListGroup.Item
            className={`fw-bold fs-6 ${
              isActive("message") ? "listitemname" : "listitemnamess"
            }`}
          >
            Messages
          </ListGroup.Item>
        </Link>
        <Link to="/help-fees" className="text-decoration-none">
          <ListGroup.Item
            className={`fw-bold fs-6 ${
              isActive("help") ? "listitemname" : "listitemnamess"
            }`}
          >
            Help & Fees
          </ListGroup.Item>
        </Link>
      </ListGroup>
    </div>
  );
};

export default Sidebar;

// import React, { useState } from "react";
// import { ListGroup, Collapse } from "react-bootstrap";
// import "./sidebar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { List, ListItem, ListItemText } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";

// const Sidebar = ({ status, bidchild }) => {
//   const [open, setOpen] = React.useState({
//     selling: false,
//     biddinghis: false,
//   });

//   const navigate = useNavigate();

//   const toggleOpen = (section) => {
//     setOpen((prevOpen) => ({
//       ...prevOpen,
//       [section]: !prevOpen[section],
//     }));
//   };

//   const isActive = (section) => status === section;
//   return (
//     <List component="nav">
//       <ListItem
//         button
//         onClick={() => navigate("/summary")}
//         className={isActive("summary") ? "listitemname" : "listitemnamess"}
//       >
//         <ListItemText primary="Summary" />
//       </ListItem>

//       <ListItem
//         button
//         onClick={() => navigate("/recently-view")}
//         className={isActive("recently") ? "listitemname" : "listitemnamess"}
//       >
//         <ListItemText primary="Recently viewed" />
//       </ListItem>

//       <ListItem
//         button
//         onClick={() => navigate("/bids-offers")}
//         className={isActive("bidding") ? "listitemname" : "listitemnamess"}
//       >
//         <ListItemText primary="Bids & offers" />
//       </ListItem>

//       <ListItem
//         button
//         onClick={() => navigate("/watch-list")}
//         className={isActive("watchlist") ? "listitemname" : "listitemnamess"}
//       >
//         <ListItemText primary="Watchlist" />
//       </ListItem>

//       <ListItem
//         button
//         onClick={() => navigate("/purchase")}
//         className={isActive("purchase") ? "listitemname" : "listitemnamess"}
//       >
//         <ListItemText primary="Purchases" />
//       </ListItem>

//       <ListItem button onClick={() => toggleOpen("selling")}>
//         <ListItemText primary="Selling" />
//         {open.selling ? <ExpandLess /> : <ExpandMore />}
//       </ListItem>
//       <Collapse in={open.selling} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding sx={{ pl: 4 }}>
//           <ListItem
//             button
//             onClick={() => navigate("/selling/overview")}
//             className={isActive("overview") ? "text-primary" : "text-muted"}
//           >
//             <ListItemText primary="Overview" />
//           </ListItem>
//           <ListItem className="text-muted">
//             <ListItemText primary="Sell an item" />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => navigate("/seller-orders-list")}
//             className={isActive("ordersell") ? "text-primary" : "text-muted"}
//           >
//             <ListItemText primary="Orders" />
//           </ListItem>
//         </List>
//       </Collapse>

//       <ListItem button onClick={() => toggleOpen("biddinghis")}>
//         <ListItemText primary="Bidding History" />
//         {open.biddinghis ? <ExpandLess /> : <ExpandMore />}
//       </ListItem>
//       <Collapse in={open.biddinghis} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding sx={{ pl: 4 }}>
//           <ListItem
//             button
//             onClick={() => navigate("/all-product")}
//             className={isActive("all") ? "text-primary" : "text-muted"}
//           >
//             <ListItemText primary="All" />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => navigate("/auction-product")}
//             className={isActive("auctionp") ? "text-primary" : "text-muted"}
//           >
//             <ListItemText primary="Auction" />
//           </ListItem>
//         </List>
//       </Collapse>
//     </List>
//   );
// };

// export default Sidebar;
