// export const BaseUrl = "https://dotpoint.api.webisheet.com/";
export const BaseUrl = "http://localhost:4000/";
// export const BaseUrl = "http://192.168.29.248:4000/";

// export const ApiUrlPersona = "persona/";
export const versionControl = "v1/";
export const api = {
  login: "user/login",
  register: "user",
  email_verification: "user/email_verification",
  resent_email_verification: "user/resent_email_verification",
  google: "user/google",
  buy_challenge_list: "user/buy_challenge/get",
  buy_challenge: "user/buy_challenge",
  leader_board: "user/leader_board/get",
  payment_withdrawal: "user/payment_withdrawal",
  user: "user",
  userUpdate: "user/update",
  googleLogin: "user/google",
  lineLogin: "user/line",
  facebookLogin: "user/facebook",
  wechatLogin: "user/wechat",
  challenge_list: "user/challenge_list/get",
  challenge_payment_link: "user/airwallex/challenge/payment_link",
  confirm_payment: "user/airwallex/challenge/confirm_payment",
  get_challenge_payment_link: "user/airwallex/payment/link",
  challenge_payment_link_coinbase: "user/coinbase/challenge/payment_link",
  countries: "/v1/countries",
  regenerate_account: 'user/meta_trader/regenerate_account',
  uploadImg: "upload/image/attachment",
  deleteImg: "upload/delete_file",
  profileWithdrawal: "/user/profit_withdrawal",
  userProfileWithdrawalGet: "/user/profit_withdrawal/get",
  Customer_support: "/user/customer_support",
  kyc_verification: "/user/kyc_verification/get",
  update_kyc_verification: "/user/kyc_verification",
  challenge_approval: "/user/challenge_approval",
  dot_point_challenge: "/user/buy_challenge",
  get_historical: "/user/meta_trader/get_historical/data",
  analytic: "/user/meta_trader/analytic/basic",
  dayWiseAnalyticIncremental: "/user/meta_trader/analytic/day_wise/incremental",
  resultByPositionSize: "/user/meta_trader/analytic/result_by_position_size",
  getResultByTradeDuration: "/user/meta_trader/analytic/get_result_by_trade_duration",
  tradingSymbolHistory: "/user/meta_trader/trading_symbol_history",
  get_history: "/user/meta_trader/get_historical/trade_deals",
  get_history_day_wise: "/user/meta_trader/get_history/day_wise",
  get_consistency_score: "/user/get_consistency_score",
  trading_accounts_details: "/user/trading_accounts_details",
  get_economic: "/user/customer_support",
  forgot_password_verification: "/user/forgot_password_verification",
  reset_password: "/user/reset_password",
  change_email_verification: "/user/change_email_verification",
  change_email: "/user/change_email",
  social_login_change_email_verification: "/user/social_login/change_email_verification",
  validateCoupon: "/user/coupon",
};
export const LOGIN_TOKEN = "access_token";
export const REFRESH_LOGIN_TOKEN = "refresh_token";
export const candidateId = "candidateId";
export const BASE_URL_UPLOAD = "https://dotpoint-storage.s3.ap-southeast-1.amazonaws.com/"

// export const baseUrlPerson = BaseUrl + ApiUrlPersona+version;
// export const baseUrlAuth = BaseUrl + ApiUrlAuth +version;
// User​/VerifyUserAccount
// ​v1​/Login​/CreatePassword
// ​v1​/Preference​/IndustryPreferenceList
// ​v1​/Partner​/GetPartnerDetail
// v1/HiringExpertise/HiringExpertiseList
// v1/Preference/RolePreferenceList?PageIndex=1&PageSize=10&SearchText=i
// ​v1​/Requisition​/UpdateScreeningQuestion
// v1​/RequisitionTransaction​/GetRequisitionTranType
// v1/Requisition/UpdateScreeningQuestion
// ​v1​/Requisition​/UpdateRequisitionMatrix
// v1​/PartnerRequisition​/PublishedRequisitionForPartner
// v1​/PartnerRequisition​/AcceptRejectRequisitionList
// ​v1​/Requisition​/GetRequisitionDetail
// v1​/PartnerRequisition​/AcceptRejectRequisition
