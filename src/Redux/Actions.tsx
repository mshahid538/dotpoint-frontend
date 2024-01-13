import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "@api/Api/ClientHelper";
import {
  ApiGetNoAuth,
  ApiPostNoAuth,
  ApiPostNoAuthFormData,
  ApiPutNoAuth,
  CommonRequest,
  CreateRoute,
} from "@api/Api/CommonApi";
import localStorage from "@api/Api/localstore.util";
import { api } from "@redux/Api/AuthApi";

export const login: any = createAsyncThunk("login", async (body: any) => {
  return ApiPostNoAuth(api.login, body)
    .then((res: any) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const socialGoogleLogin: any = createAsyncThunk(
  "socialGoogleLogin",
  async (body: any) => {
    return ApiPostNoAuth(api.googleLogin, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const forgot_password_verification: any = createAsyncThunk(
  "forgot_password_verification",
  async (body: any) => {
    return ApiPostNoAuth(api.forgot_password_verification, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const reset_password: any = createAsyncThunk(
  "reset_password",
  async (body: any) => {
    return ApiPostNoAuth(api.reset_password, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const socialLineLogin: any = createAsyncThunk(
  "socialGoogleLogin",
  async (body: any) => {
    return ApiPostNoAuth(api.lineLogin, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const socialFacebookLogin: any = createAsyncThunk(
  "socialFacebookLogin",
  async (body: any) => {
    return ApiPostNoAuth(api.facebookLogin, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const socialWechatLogin: any = createAsyncThunk(
  "socialWechatLogin",
  async (body: any) => {
    return ApiPostNoAuth(api.wechatLogin, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

// Coupon code
export const validateCoupon: any = createAsyncThunk(
  "validateCoupon",
  async (body: any) => {
    return ApiPostNoAuth(api.validateCoupon, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

//User Profile
export const user_profile: any = createAsyncThunk(
  "user_profile",
  async (body: any) => {
    return ApiGetNoAuth(api.user, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const userUpdate: any = createAsyncThunk(
  "userUpdate",
  async (body: any) => {
    return ApiPutNoAuth(api.userUpdate, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const register: any = createAsyncThunk("register", async (body: any) => {
  return ApiPostNoAuth(api.register, body)
    .then((res: any) => {
      return res?.data;
    })
    .catch((err) => err);
});


export const change_email_verification: any = createAsyncThunk("change_email", async (body: any) => {
  return ApiPostNoAuth(api.change_email_verification, body)
    .then((res: any) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const email_verification: any = createAsyncThunk(
  "email_verification",
  async (body: any) => {
    return ApiPostNoAuth(api.email_verification, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const resent_email_verification: any = createAsyncThunk(
  "resent_email_verification",
  async (body: any) => {
    return ApiPostNoAuth(api.resent_email_verification, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const change_email: any = createAsyncThunk(
  "change_email",
  async (body: any) => {
    return ApiPostNoAuth(api.change_email, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const social_login_change_email_verification: any = createAsyncThunk(
  "change_email",
  async (body: any) => {
    return ApiPostNoAuth(api.social_login_change_email_verification, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const google: any = createAsyncThunk("google", async (body: any) => {
  return ApiPostNoAuth(api.google, body)
    .then((res: any) => {
      return res?.data;
    })
    .catch((err) => err);
});
export const buy_challenge_list: any = createAsyncThunk(
  "buy_challenge",
  async (body: any) => {
    return ApiPostNoAuth(api.buy_challenge_list, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const buy_challenge: any = createAsyncThunk(
  "buy_challenge",
  async (body: any) => {
    return ApiPostNoAuth(api.buy_challenge, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const leader_board: any = createAsyncThunk(
  "leader_board",
  async (body: any) => {
    return ApiPostNoAuth(api.leader_board, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const challenge_list: any = createAsyncThunk(
  "challenge_list",
  async (body: any) => {
    return ApiPostNoAuth(api.challenge_list, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const uploadImg: any = createAsyncThunk(
  "uploadImg",
  async (body: any) => {
    return ApiPostNoAuthFormData(api.uploadImg, body)
      .then((res: any) => res?.data)
      .catch((err) => err);
  }
);

export const deleteImg: any = createAsyncThunk(
  "deleteImg",
  async (body: any) => {
    return ApiPostNoAuth(api.deleteImg, body)
      .then((res: any) => res?.data)
      .catch((err) => err);
  }
);
//Dot Point API
export const payment_withdrawal: any = createAsyncThunk(
  "payment_withdrawal",
  async (body: any) => {
    return ApiPostNoAuth(api.payment_withdrawal, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

// Payment Related API
export const challenge_payment_link_airwallex: any = createAsyncThunk(
  "challenge_payment_link",
  async (body: any) => {
    return ApiPostNoAuth(api.challenge_payment_link, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const challenge_payment_link_coinbase: any = createAsyncThunk(
  "challenge_payment_link_coinbase",
  async (body: any) => {
    return ApiPostNoAuth(api.challenge_payment_link_coinbase, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const confirm_payment: any = createAsyncThunk(
  "confirm_payment",
  async (body: any) => {
    return ApiPostNoAuth(api.confirm_payment, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const regenerate_account: any = createAsyncThunk(
  "regenerate_account",
  async (body: any) => {
    return ApiPostNoAuth(api.regenerate_account, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const get_challenge_payment_link: any = createAsyncThunk(
  "get_challenge_payment_link",
  async (id: any) => {
    return ApiGetNoAuth(`${api.get_challenge_payment_link}?paymentLinkId=${id}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const trading_accounts_details: any = createAsyncThunk(
  "trading_accounts_details",
  async (id: any) => {
    return ApiGetNoAuth(`${api.trading_accounts_details}`)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const dot_point_challenge: any = createAsyncThunk(
  "dot_point_challenge",
  async (body: any) => {
    return ApiGetNoAuth(api.dot_point_challenge + body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const get_historical: any = createAsyncThunk(
  "get_historical",
  async (body: any) => {
    return ApiPostNoAuth(api.get_historical, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const basicAnalytic: any = createAsyncThunk(
  "analytibasicA",
  async (body: any) => {
    return ApiPostNoAuth(api.analytic, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const dayWiseAnalyticIncremental: any = createAsyncThunk(
  "dayWiseAnalyticIncremental",
  async (body: any) => {
    return ApiPostNoAuth(api.dayWiseAnalyticIncremental, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const tradingSymbolHistory: any = createAsyncThunk(
  "tradingSymbolHistory",
  async (body: any) => {
    return ApiPostNoAuth(api.tradingSymbolHistory, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const resultByPositionSize: any = createAsyncThunk("resultByPositionSize",
  async (body: any) => {
    return ApiPostNoAuth(api.resultByPositionSize, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getResultByTradeDuration: any = createAsyncThunk("getResultByTradeDuration",
  async (body: any) => {
    return ApiPostNoAuth(api.getResultByTradeDuration, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const get_history: any = createAsyncThunk(
  "get_history",
  async (body: any) => {
    return ApiPostNoAuth(api.get_history, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const get_history_day_wise: any = createAsyncThunk(
  "get_history_day_wise",
  async (body: any) => {
    return ApiPostNoAuth(api.get_history_day_wise, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const get_consistency_score: any = createAsyncThunk(
  "get_consistency_score",
  async (body: any) => {
    return ApiPostNoAuth(api.get_consistency_score, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
// profile withdrawal
export const profileWithdrawal: any = createAsyncThunk(
  "profileWithdrawal",
  async (body: any) => {
    return ApiPostNoAuth(api.profileWithdrawal, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const userProfileWithdrawalGet: any = createAsyncThunk(
  "userProfileWithdrawalGet",
  async (body: any) => {
    return ApiPostNoAuth(api.userProfileWithdrawalGet, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const customer_support: any = createAsyncThunk(
  "customer_support",
  async (body: any) => {
    return ApiPostNoAuth(api.Customer_support, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

// KYC Verification

export const get_kyc_verificationById: any = createAsyncThunk(
  "get_kyc_verificationById",
  async (body: any) => {
    return ApiGetNoAuth(api.kyc_verification, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const get_economic: any = createAsyncThunk(
  "get_economic",
  async (body: any) => {
    return ApiGetNoAuth(
      "https://www.forexfactory.com/calendar/apply-settings/1?navigation=0",
      body
    )
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const update_kyc_verification: any = createAsyncThunk(
  "update_kyc_verification",
  async (body: any) => {
    return ApiPostNoAuth(api.update_kyc_verification, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const challenge_approval: any = createAsyncThunk(
  "challenge_approval",
  async (body: any) => {
    return ApiPostNoAuth(api.challenge_approval, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
