import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
//mui
import { Box, Grid, useTheme } from "@mui/material";
import Person2Outlined from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
//component
import Assets from "@components/common/image_container";
import SelectDropDown from "@components/common/selectDropDown";
import CommonTextField from "@components/common/commonTextField";
import MUIButton from "@components/common/commonButton";
import OutlinedCheckbox from "@components/common/commonCheckBox";
import TextLabel from "@components/common/commonTextLabel";
import { register } from "@redux/Redux/Actions";
import ErrorHandler from "@components/common/errorHandler";
import { tostify } from "@components/common/tostify";
import usePageLoader from "@redux/hooks/usePageLoader";
import CountryJson from "../../src/Assets/json/CountryJson.json";
import PhoneInput from "react-phone-input-2";
import { Regex } from "@redux/utils/regex";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "react-phone-input-2/lib/style.css";

const useStyles = makeStyles()((theme) => {
  return {
    errorMessage: {
      color: 'red',
      fontSize: '12px',
      fontFamily: 'poppins'
    },
    checkboxErrorMsg: {
      marginTop: "-6px",
      marginBottom: "10px"
    },
    phoneInput: {
      padding: "13px",
      height: "46px",
      width: '91.5%',
      borderRadius: "10px",
      border: "1px solid #EEEEEE",
      outline: 'none',
      marginLeft: 48,
      fontFamily: "Poppins",
      [theme.breakpoints.down("sm")]: {
        width: "84%"
      }
    },
  };
});


const label = { inputProps: { "aria-label": "Checkbox demo" } };
const languages = ["English", "Chinese", "Japanese", "Korean"];
const title = ["Mr.", "Ms.", "Mrs.", "Mx."];

const Register = () => {
  //Hooks
  const router = useRouter();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();
  const theme = useTheme();

  //States
  const [countries, setCountries] = React.useState<any>([]); //add this line api call in country
  const [data, setData] = React.useState<any>({
    language: languages[0],
    title: title[0],
    country: "",
    phoneNumber: "",
  });
  const [error, setError] = useState<any>({});
  const dobDate = new Date(data.dob);
  const today = new Date();

  // Calculate age
  const age = today.getFullYear() - dobDate.getFullYear();
  console.log(data, error, "data")

  const formValidation = () => {
    let validFormValue = true;
    let errors: any = {};
    if (!data?.title) {
      validFormValue = false;
      errors["title"] = "*Please enter title";
    }
    if (!data?.firstName) {
      validFormValue = false;
      errors["firstName"] = "*Please enter first name";
    }
    if (!data?.lastName) {
      validFormValue = false;
      errors["lastName"] = "*Please enter last name";
    }
    if (!data?.email) {
      validFormValue = false;
      errors["email"] = "*Please enter email address";
    } else if (!data?.email?.match(Regex.emailRegex)) {
      validFormValue = false;
      errors["invalidEmail"] = "*Invalid email address";
    }

    if (!data?.dob) {
      validFormValue = false;
      errors["dob"] = "*Please enter date of birth";
    }

    if (data?.dob && age < 18) {
      validFormValue = false;
      errors["dob"] = "*You must be 18 years or older";
    }

    if (!data?.password) {
      validFormValue = false;
      errors["password"] = "*Please enter password";
    }

    if (!data?.phoneNumber) {
      validFormValue = false;
      errors["phoneNumber"] = "*Please enter phone number.";
    }

    if (!data?.cpassword) {
      validFormValue = false;
      errors["cpassword"] = "*Please enter confirm password.";
    } else if (data?.cpassword && data?.cpassword !== data?.password) {
      validFormValue = false;
      errors["invalidPassword"] = "*Passwords is not matching!";
    }

    if (!data?.firstcheckbox) {
      validFormValue = false;
      errors["firstcheckbox"] = " ";
    }
    if (!data?.thirdcheckbox) {
      validFormValue = false;
      errors["thirdcheckbox"] = " ";
    }
    setError(errors);
    return validFormValue;
  };
  const _getCountries = async () => {
    const countryNames = CountryJson.countries.map((country) => country.name);
    const countryCode = CountryJson.countries.map(
      (country) => country.phonecode
    );
    setCountries(countryNames);
  };
  const handleSubmit = async (values: any) => {
    if (formValidation()) {
      setFullPageLoader(true);
      const body = {
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        password: data?.password,
        phoneNumber: data?.phoneNumber.trim(" "),
        country: data?.countryName,
        countryCode: data?.countryCode,
        title: data?.title,
        countryCode1: data?.countryCode1,
        dob: data?.dob
      };
      try {
        const res = await dispatch(register(body));
        const error = ErrorHandler(res);
        if (error) {
          router.push({
            pathname: "/emailVerification",
            query: { email: data?.email },
          });
        }
      } catch (error) {
        tostify(`An error occurred register`, "error");
      }
      setFullPageLoader(false);
    }
  };

  useEffect(() => {
    _getCountries();
  }, []);

  return (
    <>
      <Grid container spacing={0} height={"100vh"} overflow={"auto"}>
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
            <TextLabel
              variant="h1"
              style={{ marginLeft: "6px" }}
              color="#fff"
              title={"Dare."}
            />
            <TextLabel
              variant="h1"
              style={{ marginLeft: "6px" }}
              color="#fff"
              title={"Optimise."}
            />
            <TextLabel
              variant="h1"
              style={{ marginLeft: "6px" }}
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              width: { lg: "70%", md: "60%", sm: "70%", xs: "90%" },
              marginTop: "10%",
            }}
          >
            <Box
              sx={{
                display: { lg: "none", md: "block", sm: "block" },
                width: "100px",
                marginTop: "12px",
                marginBottom: "0px",
              }}
            >
              <Assets
                src={"/assets/images/main-logo.png"}
                absolutePath={true}
                height={75} width={250}
              />
            </Box>
            <Grid item container>
              <Grid item xs={12} marginTop={1}>
                <Box
                  display={"flex"}
                  margin={"auto"}
                  flexDirection={"column"}
                  width={"auto"}
                  sx={{ gap: { md: 2, xs: 1 } }}
                >
                  <Box>
                    <TextLabel fontWeight="600" variant="h4" title={"Hello!"} />
                    <TextLabel
                      variant="subtitle1"
                      title={"Sign Up to Get Started"}
                    />
                  </Box>
                  <Grid container spacing={{ xs: 1, md: 2 }}>
                    <Grid item xs={4} md={3}>
                      <Box>
                        <SelectDropDown
                          values={title || []}
                          name="title"
                          value={data?.title}
                          onChange={(e: any) => {
                            setData({ ...data, title: e.target.value });
                          }}
                          width={"100%"}
                          size="medium"
                        />
                        <TextLabel
                          variant="caption"
                          fontSize="12px"
                          color="error"
                          title={!data?.title ? error?.title : " "}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Box>
                        <CommonTextField
                          width={"100%"}
                          icon={<Person2Outlined sx={{ color: "#cdcdcd" }} />}
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          size="medium"
                          valid
                          onChange={(e: any) => {
                            setData({ ...data, firstName: e.target.value });
                          }}
                          tabIndex={1}
                        />
                        <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.firstName ? error?.firstName : " "} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box>
                    <CommonTextField
                      width={"100%"}
                      icon={<Person2Outlined sx={{ color: "#cdcdcd" }} />}
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      valid
                      size="medium"
                      onChange={(e: any) => { setData({ ...data, lastName: e.target.value }); }}
                      backgroundColor="transparent"
                      border="1px solid #EEEEEE"
                      tabIndex={2}
                    />
                    <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.lastName ? error?.lastName : " "} />
                  </Box>

                  <Box>
                    <CommonTextField
                      width={"100%"}
                      icon={<EmailOutlinedIcon sx={{ color: "#cdcdcd" }} />}
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      valid
                      size="medium"
                      onChange={(e: any) => { setData({ ...data, email: e.target.value }); }}
                      backgroundColor="transparent"
                      border="1px solid #EEEEEE"
                    />
                    <TextLabel
                      variant="caption"
                      fontSize="12px"
                      color="error"
                      title={!data?.email ? error?.email : " "}
                    />
                    <TextLabel variant="caption" fontSize="12px" color="error" title={data?.email && data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
                  </Box>
                  <Box>
                    <CommonTextField
                      width={"100%"}
                      icon={<CalendarMonthIcon sx={{ color: "#cdcdcd" }} />}
                      type="date"
                      placeholder="Date Of Birth"
                      name="dob"
                      valid
                      size="medium"
                      onChange={(e: any) => { setData({ ...data, dob: e.target.value }); }}
                      InputProps={{ inputProps: { max: "9999-12-31" } }}
                      backgroundColor="transparent"
                      border="1px solid #EEEEEE"
                    />
                    <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.dob ? error?.dob : " "} />
                    <TextLabel variant="caption" fontSize="12px" color="error" title={data?.dob && age < 18 ? error?.dob : " "} />
                  </Box>
                  <Grid container spacing={{ xs: 1, md: 2 }}>
                    <Grid item xs={12} md={12}>
                      <Box>
                        <PhoneInput
                          country={"hk"}
                          value={data?.countryCode + data?.phoneNumber}
                          onChange={(value: any, country: any, e: any, formattedValue: any) => {
                            const [code, number] = formattedValue.split(" ");
                            setData({
                              ...data,
                              countryCode: code,
                              phoneNumber: formattedValue?.replace(code, ""),
                              countryCode1: country?.countryCode,
                              countryName: country?.name
                            });
                          }}
                          inputProps={{ required: true, className: classes.phoneInput, }}
                          placeholder="Phone number"
                        />
                        <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.phoneNumber ? error?.phoneNumber : ""} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box>
                    <CommonTextField
                      icon={<HttpsOutlinedIcon sx={{ color: "#cdcdcd" }} />}
                      width={"100%"}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={data?.password}
                      valid
                      size="medium"
                      showPasswordToggle
                      onChange={(e: any) => { setData({ ...data, password: e.target.value }); }}
                      backgroundColor="transparent"
                      border="1px solid #EEEEEE"
                    />
                    <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.password ? error?.password : " "} />
                  </Box>
                  <Box>
                    <CommonTextField
                      icon={<HttpsOutlinedIcon sx={{ color: "#cdcdcd" }} />}
                      width={"100%"}
                      type="password"
                      placeholder="Confirm Password"
                      name="cpassword"
                      value={data?.cpassword}
                      valid
                      size="medium"
                      showPasswordToggle
                      onChange={(e: any) => {
                        setData({ ...data, cpassword: e.target.value });
                      }}
                      backgroundColor="transparent"
                      border="1px solid #EEEEEE"
                    />
                    <TextLabel
                      variant="caption"
                      fontSize="12px"
                      color="error"
                      title={!data?.cpassword ? error?.cpassword : " "}
                    />
                    <TextLabel
                      variant="caption"
                      fontSize="12px"
                      color="error"
                      title={
                        data?.cpassword && data?.cpassword !== data?.password
                          ? error.invalidPassword
                          : ""
                      }
                    />
                  </Box>
                  {/* <Box>
                    <SelectDropDown
                      values={countries}
                      name="country"
                      value={data?.country}
                      onChange={(e: any) => {
                        setData({ ...data, country: e.target.value });
                      }}
                      width={"100%"}
                      size="medium"
                    />
                    <TextLabel
                      variant="caption"
                      fontSize="12px"
                      color="error"
                      title={!data?.country ? error?.country : " "}
                    />
                  </Box> */}
                  <Box>
                    <OutlinedCheckbox
                      // onChange={handleSelect}
                      fontSize={"14px"}
                      color={"rgba(51, 51, 51, 0.7)"}
                      label={
                        "I agree to the processing of personal data according to "
                      }
                      name={"firstcheckbox"}
                      secondLabel="PRIVACY POLICY."
                      onClickSecondLabel={() => {
                        window.open(
                          "https://www.dotpointcapital.com/privacy-policy"
                        );
                      }}
                      handleSelect={(e: any) => {
                        setData({ ...data, firstcheckbox: e.target.checked });
                      }}
                      value={data?.firstcheckbox}
                      error={error.firstcheckbox}
                    />

                    <OutlinedCheckbox
                      fontSize={"14px"}
                      color={"rgba(51, 51, 51, 0.7)"}
                      label={
                        "Do you want to receive news about our project? Sign up to our NEWSLETTER."
                      }
                      name={"secondcheckbox"}
                      handleSelect={(e: any) => {
                        setData({ ...data, secondcheckbox: e.target.checked });
                      }}
                      value={data?.secondcheckbox}
                    />
                    <OutlinedCheckbox
                      fontSize={"14px"}
                      color={"rgba(51, 51, 51, 0.7)"}
                      label={
                        "I acknowledge my name is correct and corresponds to the government issued identification."
                      }
                      name={"thirdcheckbox"}
                      handleSelect={(e: any) => {
                        setData({ ...data, thirdcheckbox: e.target.checked });
                      }}
                      value={data?.thirdcheckbox}
                      error={error.thirdcheckbox}
                    />
                  </Box>
                  <MUIButton
                    fullWidth={true}
                    height="42px"
                    text="Sign Up"
                    onClick={handleSubmit}
                  />
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                    marginTop={1}
                    marginBottom={1.5}
                  >
                    <TextLabel
                      variant="body1"
                      color={"rgba(51, 51, 51, 0.7)"}
                      title={"Already have an Account?"}
                    />
                    <TextLabel
                      cursor="pointer"
                      fontWeight="600"
                      variant="body1"
                      fontColor={"#0099cb"}
                      title={"Sign In"}
                      onClick={() => {
                        router.push("/login");
                      }}
                    />
                    {/* <Box onClick={() => { router.push('/login') }} sx={{ color: "#0099CB", cursor: 'pointer', marginLeft: '3px', fontSize: "14px" }}>Sign In </Box> */}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
