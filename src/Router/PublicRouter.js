import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "../Screen/LoginFlow/Login/Login";
import Register from "../Screen/LoginFlow/Register/Register";
import Dashboard from "../Screen/Dashboard/Dashboard";
import ForgotPassword from "../Screen/LoginFlow/ForgotPassword/ForgotPassword";
import Verification from "../Screen/LoginFlow/Verification/Verification";
import ResetPassword from "../Screen/LoginFlow/ResetPassword/ResetPassword";
import BabyChildCare from "../Screen/ShopbyCategory/BabyChildCare/BabyChildCare";
import LiverCare from "../Screen/ShopbyCategory/LiverCare/LiverCare";
import SkinCare from "../Screen/ShopbyCategory/SkinCare/SkinCare";
import Selling from "../Screen/Selling/Selling";
import ListItem from "../Screen/Selling/ListItem";
import FindProduct from "../Screen/Selling/product/FindProduct";
import SelectCondition from "../Screen/Selling/product/SelectCondition";
import PersonalInfo from "../Screen/AccountSetting/PersonalInfo";
import PrivacyPolicy from "../Screen/PrivacyPolicy/PrivacyPolicy";
import TermandServices from "../Screen/TermandService/TermandServices";
import EmailVerify from "../Screen/LoginFlow/EmailVerify/EmailVerify";
import EmailOtp from "../Screen/LoginFlow/EmailOtp/EmailOtp";
import Product from "../Screen/Product/Product";
import ContactInfo from "../Screen/LoginFlow/ContactInfo/ContactInfo";
import AddtoCart from "../Screen/AddtoCart/AddtoCart";
import PaymentGatway from "../Screen/LoginFlow/PaymentGatway/PaymentGatway";
import AddProduct from "../Screen/AddProduct/AddProduct";
import Category from "../Screen/ShopbyCategory/Category/Category";
import ProductList from "../Screen/Selling/ProductList/ProductList";
import WatchList from "../Screen/WatchList/WatchList";
import CheckOut from "../Screen/CheckOut/CheckOut";
import Sidebar from "../Screen/Myatozbay/Sidebar/Sidebar";
import Purchase from "../Screen/Myatozbay/Purchase/Purchase";
import Overview from "../Screen/Selling/Overview/Overview";
import Summary from "../Screen/Myatozbay/Summary/Summary";
import PaymentSuccess from "../Screen/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Screen/Payment/PaymentCancel/PaymentCancel";
import PaymentDeclined from "../Screen/Payment/PaymentDecliend/PaymentDeclined";
import BidandOffer from "../Screen/Myatozbay/Bid&Offer/BidandOffer";
import AllProduct from "../Screen/Myatozbay/BiddingHistory/AllProduct";
import AuctionProduct from "../Screen/Myatozbay/BiddingHistory/AuctionProduct";
import Review from "../Component/Review/Review";
import { getToken } from "../Helper/Storage";
import axios from "axios";
import ApiEndPoints from "../Network_Call/ApiEndPoint";
// import OrderList from "../Screen/Orders/OrderList/OrderList";
import OrderDetails from "../Screen/Orders/OrderDetails/OrderDetails";
import SellerOrderList from "../Screen/Orders/SellerOrderList/SellerOrderList";
import SellerOrderDetail from "../Screen/Orders/SellerOrderDetail/SellerOrderDetail";
import RecentlyView from "../Screen/Myatozbay/RecentlyView/RecentlyView";
import MessageScreen from "../Screen/Message/Message";
import Draft from "../Screen/Selling/Drafts/Draft";
import Active from "../Screen/Selling/Active/Active";
import ContactUs from "../Screen/ContactUs/ContactUs";
import Notification from "../Screen/Notification/Notification";
import DailyDeals from "../Screen/DailyDeals/DailyDeals";
import AddCoupon from "../Screen/Coupons/AddCoupon/AddCoupon";
import Subscription from "../Screen/Subscription/Subscription";
import ImgPaymentSuccess from "../Screen/Payment/ImagePayment/ImgPaymentSuccess";
import ImgPaymentCancel from "../Screen/Payment/ImagePayment/ImgPaymentCancel";
import ImgPaymentDecliend from "../Screen/Payment/ImagePayment/ImgPaymentDecliend";
import ActivePackage from "../Screen/Selling/ActivePackage/ActivePackage";
import CookieConsent from "../Component/Cookie/CookieConsent";
import Earning from "../Screen/Selling/Earning/Earning";
import Report from "../Screen/Report/Report";
import Feedback from "../Component/Feedback/Feedback";

const PublicRouter = () => {
  const PaymentSuccessListener = () => {
    const location = useLocation();

    useEffect(() => {
      console.log("location", location);
    }, []);

    useEffect(() => {
      if (location.pathname === "/payment-success") {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");
        const device_type = query.get("device_type");
        console.log(" Success  id>>>>>>>", id);
        console.log("device_type", device_type);

        if (id) {
          const token = getToken(); // Get the token from storage
          const postData = {
            transaction_id: id,
            payment_status: "success",
          };

          axios
            .post(ApiEndPoints.PaymentResponse, postData, {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
              },
            })
            .then((response) => {
              console.log("API Success Response:", response.data);
            })
            .catch((error) => {
              console.error("API Error:", error);
            });
        }
      } else if (location.pathname === "/payment-cancel") {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");
        console.log("cancel id", id);
        console.log("cancel query", query);

        if (id) {
          const token = getToken(); // Get the token from storage
          const postData = {
            transaction_id: id,
            payment_status: "cancel",
          };

          axios
            .post(ApiEndPoints.PaymentResponse, postData, {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
              },
            })
            .then((response) => {
              console.log("API Cancel Response:??????", response.data);
            })
            .catch((error) => {
              console.error("API Error:", error);
            });
        }
      } else if (location.pathname === "/payment-declined") {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");
        console.log("declinedid", id);
        console.log("declinedquery", query);

        if (id) {
          const token = getToken(); // Get the token from storage
          const postData = {
            transaction_id: id,
            payment_status: "declined",
          };

          axios
            .post(ApiEndPoints.PaymentResponse, postData, {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
              },
            })
            .then((response) => {
              console.log("API Declined Response:", response.data);
            })
            .catch((error) => {
              console.error("API Error:", error);
            });
        }
      } else if (location.pathname === "/package-payment-success") {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");
        if (id) {
          const token = getToken();
          const postData = {
            subscribe_id: id,
            payment_status: "success",
          };
          axios
            .post(ApiEndPoints.SubscriptionResponse, postData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("API Failed Response:", response.data);
            })
            .catch((error) => {
              console.error("API Error:", error);
            });
        }
      } else if (location.pathname === "/package-payment-cancel") {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");
        if (id) {
          const token = getToken();
          const postData = {
            subscribe_id: id,
            payment_status: "cancel",
          };
          axios
            .post(ApiEndPoints.SubscriptionResponse, postData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("API Failed Response:", response.data);
            })
            .catch((error) => {
              console.error("API Error:", error);
            });
        }
      } else if (location.pathname === "/package-payment-declined") {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");
        if (id) {
          const token = getToken();
          const postData = {
            subscribe_id: id,
            payment_status: "declined",
          };
          axios
            .post(ApiEndPoints.SubscriptionResponse, postData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("API Failed Response:", response.data);
            })
            .catch((error) => {
              console.error("API Error:", error);
            });
        }
      }
    }, [location]);

    return null; // This component doesn't render anything
  };
  return (
    <BrowserRouter basename="/web">
      <PaymentSuccessListener />
      <CookieConsent />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/email-otp" element={<EmailOtp />} />
        <Route path="/payment" element={<PaymentGatway />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/babychildcare" element={<BabyChildCare />} />
        <Route path="/livercare" element={<LiverCare />} />
        <Route path="/skincare" element={<SkinCare />} />
        <Route path="/selling" element={<Selling />} />
        <Route path="/selling/list-item" element={<ListItem />} />
        <Route path="/selling/find-product" element={<FindProduct />} />
        <Route path="/selling/select-condition" element={<SelectCondition />} />
        <Route path="/account-setting" element={<PersonalInfo />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermandServices />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/contact-info" element={<ContactInfo />} />
        <Route path="/add-to-cart" element={<AddtoCart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/watch-list" element={<WatchList />} />
        <Route path="/checkout/:id" element={<CheckOut />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/selling/overview" element={<Overview />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
        <Route path="/payment-declined" element={<PaymentDeclined />} />
        <Route
          path="/package-payment-success"
          element={<ImgPaymentSuccess />}
        />
        <Route path="/package-payment-cancel" element={<ImgPaymentCancel />} />
        <Route
          path="/package-payment-declined"
          element={<ImgPaymentDecliend />}
        />
        <Route path="/bids-offers/:id" element={<BidandOffer />} />
        <Route path="/bids-offers" element={<BidandOffer />} />
        <Route path="/all-product" element={<AllProduct />} />
        <Route path="/auction-product" element={<AuctionProduct />} />
        <Route path="/review/:id" element={<Review />} />
        {/* <Route path="/orders-list" element={<OrderList />} /> */}
        <Route path="/seller-orders-list" element={<SellerOrderList />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route
          path="/seller-order-details/:id"
          element={<SellerOrderDetail />}
        />
        <Route path="/recently-view" element={<RecentlyView />} />
        <Route path="/message" element={<MessageScreen />} />
        <Route path="/drafts" element={<Draft />} />
        <Route path="/active" element={<Active />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/dailydeals" element={<DailyDeals />} />
        <Route path="/add-coupon" element={<AddCoupon />} />
        <Route path="/packages" element={<Subscription />} />
        <Route path="/active-package" element={<ActivePackage />} />
        <Route path="/wallet-history" element={<Earning />} />
        <Route path="/report" element={<Report />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRouter;
