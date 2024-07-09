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
    UpdatePaymentGateway: `${APPConfig.API_URL}/update-payment-gateway`,
  }

  export default ApiEndPoints