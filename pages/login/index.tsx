import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSession, signIn, getSession } from "next-auth/react";
import { makeStyles } from "tss-react/mui";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
// mui
import {
  Box,
  Grid,
  Link,
  Typography,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
//component
import usePageLoader from "@redux/hooks/usePageLoader";
import {
  login,
  socialFacebookLogin,
  socialGoogleLogin,
  socialWechatLogin,
} from "@redux/Redux/Actions";
import { setToken } from "@redux/Api/ClientHelper";
import { LOGIN_TOKEN, REFRESH_LOGIN_TOKEN } from "@redux/Api/AuthApi";
import Assets from "@components/common/image_container";
import SelectDropDown from "@components/common/selectDropDown";
import CommonTextField from "@components/common/commonTextField";
import OutlinedCheckbox from "@components/common/commonCheckBox";
import MUIButton from "@components/common/commonButton";
import TextLabel from "@components/common/commonTextLabel";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import ErrorHandler from "@components/common/errorHandler";
import { tostify } from "@components/common/tostify";
import FacebookLogin from "react-facebook-login";
// import OAuth2 from 'react-oauth2';
// import axios from 'axios';

const useStyles = makeStyles()(() => {
  return {
    errorMessage: {
      color: "red",
      fontSize: "12px",
      fontFamily: "poppins",
    },
    facebookIcon: {
      padding: "0px !important",
      background: "transparent !important",
      border: "none !important",
      marginTop: "8px !important",
    },
  };
});

const languages = ["English", "Chinese", "Japanese", "Korean"];
const validationSchema = Yup.object().shape({
  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  //Hooks
  const router = useRouter();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const setFullPageLoader = usePageLoader();
  const theme = useTheme();
  console.log(router.query, "query")
  const { data: session } = useSession();
  //States
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [data, setData] = React.useState<any>({
    language: languages[0],
    isRememberMe: localStorage.getItem("isRememberMe") === 'true' ? true : false || false,
  });
  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);
    setFullPageLoader(true);
    const body = {
      email: values.emailId,
      password: values.password,
    };
    try {
      const res = await dispatch(login(body));
      const error = ErrorHandler(res);
      if (error) {
        localStorage.setItem("userData", JSON.stringify(res?.payload?.data));
        localStorage.setItem(LOGIN_TOKEN, res?.payload?.data?.token);
        localStorage.setItem(
          REFRESH_LOGIN_TOKEN,
          res?.payload?.data?.refresh_token
        );
        if (data?.isRememberMe) {
          localStorage.setItem("myapp-email", values.emailId);
          localStorage.setItem("myapp-password", values.password)
          localStorage.setItem("isRememberMe", `${data?.isRememberMe}`)
        }
        else {
          localStorage.setItem("myapp-email", "");
          localStorage.setItem("myapp-password", "")
          localStorage.setItem("isRememberMe", `false`)
        }

        if (!res?.payload?.data?.email) {
          setFullPageLoader(false);
          router.push('/profile')
        } else {
          setFullPageLoader(false);
          router.push("/client-area");
        }
        setToken(res?.payload?.data?.token);
        tostify(res?.payload?.message, "success");
        setFullPageLoader(false);
      } else {
        setFullPageLoader(false);
      }
    } catch (error) {
      tostify("An error occurred during login", "error");
      setFullPageLoader(false);
    }
    setSubmitting(false);
  };

  const socialLogin = async (type: any, data: any) => {
    try {
      let response: any;
      if (type === "google") {
        response = await dispatch(
          socialGoogleLogin({
            accessToken: data?.credential,
            clientId: data?.clientId,
          })
        );
      } else if (type === "facebook") {
        response = await dispatch(
          socialFacebookLogin({ accessToken: data?.accessToken })
        );
      } else if (type === "wechat") {
        response = await dispatch(socialWechatLogin({ idToken: data?.code }));
      } else {
        return;
      }
      const error = ErrorHandler(response);
      if (error) {
        router.push("/client-area");
        tostify(response?.payload?.message, "success");
        localStorage.setItem(
          "userData",
          JSON.stringify(response?.payload?.data)
        );
        localStorage.setItem(LOGIN_TOKEN, response?.payload?.data?.token);
        localStorage.setItem(
          REFRESH_LOGIN_TOKEN,
          response?.payload?.data?.refresh_token
        );
        setToken(response?.payload?.data?.token);
      }
    } catch (error) {
      tostify(`An error occurred during login`, "error");
    }
  };
  const APPID = "wx87f7d962ef6d1c88";
  const loginWechatRes = (res: any) => {
    // Handle successful login
  };

  const handleWeChatLogin = async () => {
    // Replace these with your actual WeChat OAuth2 credentials
    const clientId = APPID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/login/wechat`;
    const responseType = "code";
    const scope = "snsapi_login";
    const native = false; // TODO: test if app is launched in native WeChat Browser, if so launch OAuth2 via native pathway

    const params = {
      appid: clientId,
      redirect_uri: redirectUri,
      response_type: responseType,
      scope: native ? "snsapi_login" : scope,
      ...(native ? { self_redirect: "true" } : {}),
    };

    const authorizationUrl =
      (native
        ? "https://open.weixin.qq.com/connect/oauth2/authorize?"
        : "https://open.weixin.qq.com/connect/qrconnect?") +
      new URLSearchParams(params);

    // sample return url: https://dotpoint.api.webisheet.com/login?code=0417GMkl2063pc4kxOnl2FyLV317GMke&state=

    window.location.href = authorizationUrl;
  };

  return (
    <>
      <Grid container spacing={0} height={"100vh"} overflow={"auto"} >
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={7}
          sx={{
            backgroundColor: "#002734",
            alignItems: "center",
            position: "relative",
          }}
          display={{ xs: "none", sm: "none", md: "none", lg: "flex" }}
        >
          <Box
            sx={{
              backgroundColor: "#002734",
              zIndex: "1",
              padding: "6px",
              position: "relative",
              left: "10%",
            }}
            display={"flex"}
            gap={1}
            flexDirection={"column"}
          >
            <Assets src={"/assets/images/main-logo.png"} absolutePath={true} height={75} width={250} />
            <TextLabel variant="h1" style={{ marginLeft: "6px" }} color="#fff" title={"Dare."} />
            <TextLabel variant="h1" style={{ marginLeft: "6px" }} color="#fff" title={"Optimise."} />
            <TextLabel
              variant="h1" style={{ marginLeft: "6px" }}
              color={theme.palette.bgDefultGreen.main}
              title={"Thrive."}
            />
          </Box>
          <Assets
            src={"/assets/images/login_vactor.png"}
            absolutePath={true}
            style={{ position: "absolute", bottom: "0px", left: "0px" }}
          />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={5}
          sx={{ background: "#FFFFFF", }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop={15}
          >
            <Box sx={{ width: { lg: "70%", md: "60%", sm: "70%", xs: "90%" } }}>
              {/* <Box display={'flex'} justifyContent={'flex-end'}>
                                <SelectDropDown
                                    values={languages || []}
                                    name="language"
                                    value={data?.language}
                                    onChange={(e: any) => {
                                        setData({ ...data, language: e.target.value })
                                    }}
                                    valid
                                />
                            </Box> */}

              <Grid item xs={12} marginTop={{sx:1,md:10}} >
                <Box
                  sx={{
                    display: { lg: "none", md: "block", sm: "block" },
                    width: "100px",
                    marginTop: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <Assets
                    src={"/assets/images/main-logo.png"}
                    absolutePath={true}
                    height={75} width={250}
                  />
                </Box>
                <Box style={{ display: "flex", alignItems: "center" }} >
                  <Box
                    display={"flex"}
                    margin={"auto"}
                    flexDirection={"column"}
                    gap={"3vh"}
                    width={"100%"}
                  >
                    <Box>
                      <TextLabel
                        fontWeight="600"
                        variant="h4"
                        title={"Hello Again!"}
                      />
                      <TextLabel variant="subtitle1" title={"Welcome Back"} />
                    </Box>
                    <Formik
                      initialValues={{
                        emailId: localStorage.getItem("myapp-email") || "",
                        password: localStorage.getItem("myapp-password") || "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ handleChange, handleBlur, values }) => (
                        <Form>
                          <Box
                            display={"flex"}
                            margin={"auto"}
                            flexDirection={"column"}
                            gap={2}
                          >
                            <Box>
                              <CommonTextField
                                width={"100%"}
                                icon={
                                  <EmailOutlinedIcon
                                    sx={{ color: "#cdcdcd" }}
                                  />
                                }
                                type="email"
                                placeholder="Email"
                                name="emailId"
                                size="medium"
                                valid
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.emailId}
                                startAdornment={
                                  <Assets
                                    src={"/assets/images/email_icon.svg"}
                                    absolutePath={true}
                                    width={"50px"}
                                    height={"25px"}
                                  />
                                }
                              />
                              <ErrorMessage
                                name="emailId"
                                component="div"
                                className={classes.errorMessage}
                              />
                            </Box>
                            <Box>
                              <CommonTextField
                                icon={
                                  <HttpsOutlinedIcon
                                    sx={{ color: "#cdcdcd" }}
                                  />
                                }
                                width={"100%"}
                                type="password"
                                size="medium"
                                placeholder="Password"
                                name="password"
                                value={values?.password}
                                valid
                                showPasswordToggle
                                onChange={handleChange}
                                onBlur={handleBlur}
                                backgroundColor="transparent"
                                border="1px solid #EEEEEE"
                                startAdornment={
                                  <Assets
                                    src={"/assets/images/lock_icon.svg"}
                                    absolutePath={true}
                                    width={"50px"}
                                    height={"25px"}
                                  />
                                }
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className={classes.errorMessage}
                              />
                            </Box>
                          </Box>
                          <MUIButton
                            fullWidth={true}
                            height="50px"
                            // width="300px"
                            marginTop={3}
                            marginBottom={2}
                            text="Login"
                            type="submit"
                          />
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <OutlinedCheckbox
                              color={"#333333"}
                              label={"Remember Me"}
                              name={"isRememberMe"}
                              handleSelect={(e: any) =>
                                setData({
                                  ...data,
                                  isRememberMe: !data?.isRememberMe,
                                })}

                              value={data?.isRememberMe}
                              selected={data?.isRememberMe}
                            />
                            <TextLabel
                              cursor="pointer"
                              textDecoration="underline"
                              variant="body1"
                              onClick={() => {
                                router.push("/forgot-password");
                              }}
                              title="Forgot Password?"
                            />
                          </Box>
                          <Divider
                            sx={{
                              margin: "30px 0",
                              backgroundColor: "#EEEEEE",
                              opacity: "0.3",
                            }}
                          />
                        </Form>
                      )}
                    </Formik>
                    <TextLabel
                      textAlign="center"
                      color={"rgba(51, 51, 51, 0.7)"}
                      variant="body1"
                      title={"or sign in with"}
                    />
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={3}
                      marginTop={2}
                      className="custom-google-login"
                    >
                      {/* <SocialIcon src={"/assets/icons/google.png"} onClick={async () => { await signIn('google') }} /> */}
                      <GoogleOAuthProvider
                        clientId={
                          "158699357289-neuij6rcqrnm9397qjmuhvg9tpuc3385.apps.googleusercontent.com"
                        }
                      >
                        <GoogleLogin
                          onSuccess={(credentialResponse: any) => {
                            const details: any = jwt_decode(
                              credentialResponse.credential
                            );
                            if (credentialResponse) {
                              if (details?.email) {
                                socialLogin("google", credentialResponse);
                              }
                            }
                          }}
                          onError={() => {
                            // console.log("Login Failed");
                          }}
                          auto_select={false}
                          type="icon"
                          shape="circle"
                          size="large"
                        />
                      </GoogleOAuthProvider>
                      <FacebookLogin
                        // appId="821490466422589"
                        // appId="5484805098292710" // atul account
                        // appId="871933787934655"
                        appId="283667307907864" // dot point account
                        autoLoad={false}
                        fields="name,email,picture"
                        // scope="public_profile,user_friends,user_actions.books"
                        callback={(facebookResponse: any) => {
                          if (facebookResponse) {
                            if (facebookResponse?.email) {
                              socialLogin("facebook", facebookResponse);
                            }
                          }
                        }}
                        // tag={'a'}
                        textButton=""
                        size="small"
                        icon={<SocialIcon src={"/assets/icons/facebook.png"} />}
                        cssClass={classes.facebookIcon}
                      // cssClass={"kep-login-facebook kep-login-facebook-[button-size]"}
                      />
                      {/* <SocialIcon src={"/assets/icons/facebook.png"} onClick={async () => await signIn("facebook")} /> */}
                      {/* <WechatLogin
                                                appid={APPID}
                                                redirectUri="https://dotpoint.admin.nodejsapi.tk"
                                                onSuccess={loginWechatRes}
                                            /> */}

                      <SocialIcon
                        src={"/assets/icons/wechat.png"}
                        onClick={() => {
                          handleWeChatLogin();
                        }}
                      />
                      {/* <WechatLogin appid="wx87f7d962ef6d1c88" redirectUri="http://localhost:3000/login" onSuccess={loginWechatRes} /> */}
                      <Link href="/api/auth/login">
                        <SocialIcon
                          src={"/assets/icons/line.png"}
                          onClick={() => { }}
                        />
                      </Link>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      marginTop={1}
                      gap={1}
                    >
                      <TextLabel
                        textAlign="center"
                        color={"rgba(51, 51, 51, 0.7)"}
                        variant="body1"
                        title={"Don’t have an Account?"}
                      />
                      <TextLabel
                        cursor="pointer"
                        fontWeight="600"
                        variant="body1"
                        fontColor={"#0099cb"}
                        title={"Sign Up"}
                        onClick={() => {
                          router.push("/register");
                        }}
                      />
                      {/* <Link component="button" variant="body1" fontSize={"14px"} fontWeight={'600'} sx={{ color: '#0099CB', textDecoration: "none", marginLeft: '3px' }} underline='always' color={'inherit'} >
                                                Sign Up
                                            </Link> */}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const SocialIcon = ({
  src,
  bgColor,
  height,
  width,
  padding,
  onClick,
}: {
  src: string;
  bgColor?: string;
  height?: string;
  width?: string;
  padding?: number;
  onClick?: () => void;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: bgColor || "white",
        borderRadius: "50%",
        cursor: "pointer",
      }}
      height={{ xs: "40px", sm: "40px" }}
      width={{ xs: "40px", sm: "40px" }}
      onClick={onClick}
    >
      <Assets
        src={src}
        absolutePath={true}
        height={"100%"}
        width={"100%"}
        style={{ padding: padding }}
      />
    </Box>
  );
};

export default Login;
