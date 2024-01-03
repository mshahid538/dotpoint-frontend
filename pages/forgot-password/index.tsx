import React from "react";
import {
  Box,
  Grid,
  Link,
  Typography,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import Assets from "@components/common/image_container";
import TextLabel from "@components/common/commonTextLabel";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CommonTextField from "@components/common/commonTextField";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MUIButton from "@components/common/commonButton";
import { makeStyles } from "tss-react/mui";
import { useRouter } from "next/router";
import usePageLoader from "@redux/hooks/usePageLoader";
import { forgot_password_verification } from "@redux/Redux/Actions";
import { useDispatch } from "react-redux";
const useStyles = makeStyles()(() => {
  return {
    errorMessage: {
      color: "red",
      fontSize: "12px",
      fontFamily: "poppins",
    },
  };
});
const validationSchema = Yup.object().shape({
  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const ForgotPswd = () => {
  const theme = useTheme();
  const { classes } = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    setSubmitting(true);
    setFullPageLoader(true);
    const body = {
      email: values.emailId,
    };
    try {
      const res = await dispatch(forgot_password_verification(body));
      if (res?.payload?.status === 200) {
        toast.success(res.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/login");
        setFullPageLoader(false);
      } else {
        toast.error(res.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFullPageLoader(false);
      }
    } catch (error) {
      console.error("Forgot error:", error);
      toast.error("An error occurred during login", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFullPageLoader(false);
    }
    setSubmitting(false);
    setFullPageLoader(false);
  };
  // const handleSubmit = async (
  //   values: any,
  //   { setSubmitting, setErrors }: any
  // ) => {
  //   // forgot_password_verification
  //   console.log(values, "values");
  // };
  return (
    <>
      <Grid container spacing={0} height={"100vh"}>
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
            <Assets src={"/assets/images/main-logo.png"} absolutePath={true} height={75} width={250}/>
            <TextLabel variant="h1" style={{marginLeft:"6px"}} color="#fff" title={"Dare."} />
            <TextLabel variant="h1" style={{marginLeft:"6px"}} color="#fff" title={"Optimise."} />
            <TextLabel
              variant="h1" style={{marginLeft:"6px"}}
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
          sx={{ height: "100vh", overflow: "auto", background: "#FFFFFF" }}
        >
          <Box
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
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
              <Grid item xs={12} marginTop={1}>
                <Box style={{ display: "flex", alignItems: "center" }}>
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
                        emailId: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ handleChange, handleBlur }) => (
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
                            <TextLabel
                              textAlign="right"
                              cursor="pointer"
                              textDecoration="underline"
                              variant="body1"
                              onClick={() => {
                                router.push("/login");
                              }}
                              title="Back to login"
                            />
                            {/* <TextLabel
                              textAlign="right"
                              cursor="pointer"
                              textDecoration="underline"
                              variant="body1"
                              onClick={() => {
                                router.push("/reset-password");
                              }}
                              title="Back to login"
                            /> */}
                          </Box>
                          <MUIButton
                            fullWidth={true}
                            height="50px"
                            // width="300px"
                            marginTop={3}
                            marginBottom={2}
                            text="Submit"
                            type="submit"
                          />
                        </Form>
                      )}
                    </Formik>
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

export default ForgotPswd;
