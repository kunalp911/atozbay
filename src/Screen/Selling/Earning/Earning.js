import React, { useEffect } from "react";
import Header from "../../../Component/Header/Header";
import { Card, Col, Row, Table } from "react-bootstrap";
import Sidebar from "../../Myatozbay/Sidebar/Sidebar";
import { CircularProgress } from "@mui/material";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";

const bookings = [
  {
    id: 1,
    client: "John Doe",
    service: "Haircut",
    date: "15th Sept 2024, 3:00 PM",
    status: "Confirmed",
  },
  {
    id: 2,
    client: "Jane Smith",
    service: "Shaving",
    date: "10th Sept 2024, 2:00 PM",
    status: "Cancelled",
  },
  {
    id: 3,
    client: "Mike Johnson",
    service: "Beard Trim",
    date: "12th Sept 2024, 1:30 PM",
    status: "Pending",
  },
];

const getStatusIcon = (status) => {
  if (status === "Confirmed") {
    return <FaCheckCircle color="green" />;
  } else if (status === "Cancelled") {
    return <FaTimesCircle color="red" />;
  } else if (status === "Pending") {
    return <FaClock color="orange" />;
  }
};

const Earning = () => {
  const [load, setload] = React.useState(false);
  const [walletList, setWalletList] = React.useState([]);

  console.log("walletList", walletList);

  useEffect(() => {
    getWalletList();
  }, []);

  const getWalletList = () => {
    try {
      setload(true);
      apiCallNew("post", {}, ApiEndPoints.WalletHistory).then((response) => {
        if (response.success) {
          setWalletList(response.result);
          setload(false);
        } else {
          setload(false);
        }
      });
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  return (
    <div>
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <Header />
      <div className="sideallspace mt-3">
        <h4 className="helo">My atozbay</h4>
        <Row className="">
          <Col md={2} xs={12} lg={2} className="mt-3">
            <Sidebar status="selling" bidchild="earning" />
          </Col>
          <Col md={10}>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <h2 className="helo">Wallet History</h2>
              </Col>
            </Row>
            <Row className="mt-3">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Service Charge</th>
                    <th>Amount</th>
                    <th>Shipping Charge</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {walletList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product_name || "N/A"}</td>
                      <td>{item.service_charge || "0"}</td>
                      <td>{item.product_price || "N/A"}</td>
                      <td>{item.shipping_charge || "N/A"}</td>
                      <td>{item.order_product_status || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </div>
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
export default Earning;
