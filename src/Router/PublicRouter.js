import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const PublicRouter = () => {
  return (
    <BrowserRouter basename="/web">
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
        <Route path="/terms-services" element={<TermandServices />} />
        <Route path="/product/:id" element={<Product />} />
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
        <Route path="/bids-offers" element={<BidandOffer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRouter;
