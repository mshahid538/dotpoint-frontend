import Axios from "axios";
import { apiInstance, apiInstanceFormData } from "./apiInstance";
import { BaseUrl, REFRESH_LOGIN_TOKEN, versionControl } from "./AuthApi";
import localStore from "./localstore.util";
import { LOGIN_TOKEN } from "./AuthApi";
import { parseJwt } from "@redux/utils/PrivateRoute";

export function setToken(token: any) {
  Object.assign(apiInstance.defaults.headers, {
    Authorization: `${token}`,
  });
  Object.assign(apiInstanceFormData.defaults.headers, {
    Authorization: `${token}`,
  });
}

export async function handleRequest(request: any) {
  let login_token = await localStore.get_data(LOGIN_TOKEN);
  let refresh_token = await localStore.get_data(REFRESH_LOGIN_TOKEN);

  if (login_token) {
    let decodedJwt: any = parseJwt(login_token);
    // console.log("decodedJwt", decodedJwt, Math.floor(new Date().getTime()), decodedJwt?.exp, decodedJwt?.exp - 5 * 60, Math.floor(new Date().getTime()) >= decodedJwt?.exp - 5 * 60);

    if (Math.floor(new Date().getTime()) >= decodedJwt?.exp - 5 * 60) {
      await fetch(
        BaseUrl + "user/generate/refresh_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "old_token": login_token,
            "refresh_token": refresh_token
          }),
        }
      )
        .then((r) => r.json())
        .then(async (response) => {
          if (response?.data?.token) {
            await setToken(response?.data?.token);
            await localStore.store_data(LOGIN_TOKEN, response?.data?.token);
            await localStore.store_data(REFRESH_LOGIN_TOKEN, response?.data?.refresh_token);
            request.headers.Authorization = `${response?.data?.token}`;
          }

        })
        .catch((e) => { });
      return request;
    }
  }
  return request;
}

export function handleResponse(value: any) {
  return value;
}
export async function handleApiError(error: any) {
  if (Axios.isCancel(error)) {
    throw error;
  }
  if (!error.response) {
    throw error;
  }
  if (error.response.status === 401 || error.response.status === 402) {
    return error;
  } else if (error.response.status === 500) {
    throw error;
  } else {
    // showToast(error.toString());
  }
  throw error;
}
