const APPConfig = {
  API_URL: "https://atozbay.com/adminatoz/public/api",
};

const ApiEndPoints = {
  CustomerRegister: `${APPConfig.API_URL}/customer-register`,
  SellerRegister: `${APPConfig.API_URL}/seller-register`,
  SocialLogin: `${APPConfig.API_URL}/social-login`,
  Login: `${APPConfig.API_URL}/login`,
  ForgotPassword: `${APPConfig.API_URL}/forgot-password`,
  VerifyEmail: `${APPConfig.API_URL}/forgot-password-verify-otp`,
  ResetPassword: `${APPConfig.API_URL}/reset-password`,
  ChangePassword: `${APPConfig.API_URL}/change-password`,
  SendOTPEmail: `${APPConfig.API_URL}/send-otp-email`,
  VerifyEmailOTP: `${APPConfig.API_URL}/verify-email-otp`,
  VerifyMobile: `${APPConfig.API_URL}/send-otp-mobile`,
  VerifyMobileOTP: `${APPConfig.API_URL}/verify-mobile-otp`,
  CategoriesList: `${APPConfig.API_URL}/categories-list`,
  SubCategoriesList: `${APPConfig.API_URL}/subcategories-list/`,
  CountryList: `${APPConfig.API_URL}/countries-list`,
  StateList: `${APPConfig.API_URL}/states-list/`,
  CustomerProfile: `${APPConfig.API_URL}/customer-profile`,
  UpdateProfileImage: `${APPConfig.API_URL}/update-profile-image`,
  ContactInfo: `${APPConfig.API_URL}/update-contact-info`,
  GetContactInfo: `${APPConfig.API_URL}/get-contact-info`,
  UpdateCustomerProfile: `${APPConfig.API_URL}/update-customer-profile`,
  UpdateBusinessContactInfo: `${APPConfig.API_URL}/update-business-contact-info`,
  GetBusinessInfo: `${APPConfig.API_URL}/get-business-contact-info`,
  UpdatePaymentGateway: `${APPConfig.API_URL}/update-payment-gateway`,
  SellerProfile: `${APPConfig.API_URL}/seller-profile`,
  ColorList: `${APPConfig.API_URL}/colors-list`,
  AddAddress: `${APPConfig.API_URL}/address-add`,
  UpdateAddress: `${APPConfig.API_URL}/address-update/`,
  GetAddressById: `${APPConfig.API_URL}/address/`,
  ShipAddressList: `${APPConfig.API_URL}/addresses-list`,
  AddressPrimary: `${APPConfig.API_URL}/address-primary/`,
  ProductAdd: `${APPConfig.API_URL}/product-add`,
  ProductUpdate: `${APPConfig.API_URL}/product-update/`,
  BrandList: `${APPConfig.API_URL}/brands-list`,
  AttributesList: `${APPConfig.API_URL}/attributes-list`,
  AttributesValueList: `${APPConfig.API_URL}/attributevalues-by-attribute/`,
  AttributesByCategory: `${APPConfig.API_URL}/attributes-by-category/`,
  ProductList: `${APPConfig.API_URL}/products-list`,
  ShopProductList: `${APPConfig.API_URL}/shop-products-list`,
  ProductSellerDetail: `${APPConfig.API_URL}/product/`,
  ProductSellDelete: `${APPConfig.API_URL}/product/`,
  ProductShopDetail: `${APPConfig.API_URL}/shop-product/`,
  ProductShopDetailSlug: `${APPConfig.API_URL}/shop-product-slug/`,
  AddToCart: `${APPConfig.API_URL}/add-to-cart`,
  CartProductsList: `${APPConfig.API_URL}/cart-products`,
  CartUpdate: `${APPConfig.API_URL}/update-cart`,
  CartProductCount: `${APPConfig.API_URL}/cart-product-count`,
  DeleteCartProduct: `${APPConfig.API_URL}/delete-cart-product`,
  AddToWishList: `${APPConfig.API_URL}/add-to-wishlist`,
  WishList: `${APPConfig.API_URL}/wishlist-products`,
  DeleteWishListProduct: `${APPConfig.API_URL}/delete-wishlist/`,
  WishListProductCount: `${APPConfig.API_URL}/wishlist-product-count`,
  DeleteAddress: `${APPConfig.API_URL}/address-delete/`,
  ProductImage: `${APPConfig.API_URL}/product-image/`,
  ProductBids: `${APPConfig.API_URL}/product-bids-list/1`,
  Bidgive: `${APPConfig.API_URL}/bid-give`,
  GiveReview: `${APPConfig.API_URL}/give-review`,
  UserBidList: `${APPConfig.API_URL}/user-bids-list`,
  MakePayment: `${APPConfig.API_URL}/order-create`,
  PaymentResponse: `${APPConfig.API_URL}/telr-payment-response`,
  OrderList: `${APPConfig.API_URL}/orders-list`,
  SellerOrderList: `${APPConfig.API_URL}/seller-orders-list`,
  OrderDetail: `${APPConfig.API_URL}/order/`,
  SellerOrderDetail: `${APPConfig.API_URL}/seller-order/`,
  WinningBid: `${APPConfig.API_URL}/winning-bid/`,
  UpdateOrderProductStatus: `${APPConfig.API_URL}/update-order-product-status/`,
  StockAdd: `${APPConfig.API_URL}/stock-add`,
  StockList: `${APPConfig.API_URL}/stocks-list/`,
  MessageUserList: `${APPConfig.API_URL}/message-user-list`,
  SendMessage: `${APPConfig.API_URL}/send-message`,
  MessageHistory: `${APPConfig.API_URL}/message-history/`,
  SaveLaterList: `${APPConfig.API_URL}/save-later-products`,
  AddToSaveLater: `${APPConfig.API_URL}/add-to-save-later`,
  DeleteSaveLater: `${APPConfig.API_URL}/delete-save-later/`,
  SaveLaterCount: `${APPConfig.API_URL}/save-later-product-count`,
  Terms: `${APPConfig.API_URL}/page/terms_condition`,
};

export default ApiEndPoints;
