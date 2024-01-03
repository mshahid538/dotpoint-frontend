import React, { useEffect } from "react";
//mui
import { Box } from "@mui/material";
//component
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import usePageLoader from "@redux/hooks/usePageLoader";
import { socialWechatLogin } from "@redux/Redux/Actions";
import ErrorHandler from "@components/common/errorHandler";
import router from "next/router";
import { tostify } from "@components/common/tostify";
import { LOGIN_TOKEN, REFRESH_LOGIN_TOKEN } from "@redux/Api/AuthApi";
import { setToken } from "@redux/Api/ClientHelper";

const WechatLoginHandler = () => {
  
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const setFullPageLoader = usePageLoader();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
        setFullPageLoader(true);
        // send code to backend for signing in via wechat
        const socialLogin = async () => {
            try {
                const response = await dispatch(socialWechatLogin({ "idToken": code }));
                const error = ErrorHandler(response)
                if (error) {
                    router.push('/');
                    tostify(response?.payload?.message, "success")
                    localStorage.setItem('userData', JSON.stringify(response?.payload?.data))
                    localStorage.setItem(LOGIN_TOKEN, response?.payload?.data?.token)
                    localStorage.setItem(REFRESH_LOGIN_TOKEN, response?.payload?.data?.refresh_token)
                    setToken(response?.payload?.data?.token)
                }
            } catch (error) {
                tostify(`An error occurred during login`, "error")
            }
            setFullPageLoader(false);
        }
        socialLogin();
    }
  });


  return (
    <>
    <Box mt={2}>
        
    </Box>
    </>
  );
};

export default WechatLoginHandler;
