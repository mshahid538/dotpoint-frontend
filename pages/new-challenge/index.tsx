import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import * as Yup from "yup";
import { useRouter } from "next/router";
import { makeStyles } from "tss-react/mui";
import { lightTheme } from "@redux/theme";
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import PaperContainer from "@components/common/PaperContainer";
import { Box, Grid, Tab, Tabs, Typography, useTheme } from "@mui/material";
import PersonNewChallenge from "@components/newChallenge/PersonNewChallenge";
import TextLabel from "@components/common/commonTextLabel";
import {
  buy_challenge_list,
  challenge_list,
  challenge_payment_link_airwallex,
  challenge_payment_link_coinbase,
  confirm_payment,
  get_challenge_payment_link,
  user_profile,
} from "@redux/Redux/Actions";
import { Formik, Form, ErrorMessage, Field } from "formik";
import RadioButtonBox from "@components/common/RadioButtonBox";
import CustomRadioBox from "@components/common/customRadioBox";
import ErrorHandler from "@components/common/errorHandler";
import usePageLoader from "@redux/hooks/usePageLoader";
import { tostify } from "@components/common/tostify";
import CountryJson from "../../src/Assets/json/CountryJson.json";
import PaymentMethod from "./PaymentMethod";
import Assets from "@components/common/image_container";
import CommonTextField from "@components/common/commonTextField";
import SelectPaymentMethod from "@components/newChallenge/SelectPaymentMethod";
import { Regex } from "@redux/utils/regex";
import CommonModal from "@components/common/commonModel";
import MUIButton from "@components/common/commonButton";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";

// const country = ['India', 'Australia']
const country = CountryJson.countries.map((country: any) => country.name);

const useStyles = makeStyles()((theme) => {
  return {
    tabsLine: {
      borderBottom: "0px solid",
      "& .MuiTabs-indicator": {
        height: "0px",
      },
    },
    tabTitle: {
      color: lightTheme.palette.bgGray.main,
      fontWeight: "600",
      cursor: "pointer",
      transition: "color 0.3s",
      textTransform: "capitalize",
      // '&:hover': {
      //   color: '#000',
      // },
      "&.Mui-selected": {
        backgroundColor: lightTheme.palette.bgDefultGreen.main,
        borderRadius: "6px",
        color: "#fff",
      },
    },
  };
});

interface Breadcrumb {
  label: ReactNode;
  path: string;
}
interface ProfileProps {
  children: ReactNode;
  breadcrumb: Breadcrumb[];
  breadcrumbTitle: string;
  description?: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad', 'Create an ad', 'Create an ad', 'Create an ad'];
}

const NewChallenge: React.FC<ProfileProps> = () => {
  //Hooks
  const router = useRouter();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();
  const theme = useTheme()
  const breadcrumbsData: Breadcrumb[] = [
    {
      label: "Trader",
      path: "/",
    },
    {
      label: "New Challenge",
      path: "#",
    },
  ];

  const [model, setModel] = React.useState(false);
  const [isPaymentMethodModel, setIsPaymentMethodModel] = React.useState(false);
  const [paymentURL, setPaymentURL] = React.useState("");
  const [paymentData, setPaymentData] = React.useState<any>("");
  const [challengeId, setChallengeId] = React.useState<any>("");

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [value, setValue] = React.useState(0);
  const [chall_list, setChall_list] = React.useState<any>([]);
  const [tradingCurrencyList, setTradingCurrencyList] = React.useState<any>([]);
  const [selectedTradingAccountCurrency, setSelectedTradingAccountCurrency] = React.useState<any>({});
  const [tradingAccountCurrencyOptions, setTradingAccountCurrencyOptions] = React.useState<any>([]);
  const [accountBalance, setAccountBalance] = React.useState<any>([]);
  const [selectedAccountBalance, setSelectedAccountBalance] = React.useState<any>([]);
  const [paymentCurrencyList, setPaymentCurrencyList] = React.useState<any>([]);
  const [selectedTradingPlatForm, setSelectedTradingPlatForm] = useState("MT5");
  const [selectedPaymentCurrency, setSelectedPaymentCurrency] = React.useState<any>("");
  const [selectedAccountType, setSelectedAccountType] = useState("Dot Point");
  const [selectedTradingNormal, setSelectedTradingNormal] = useState("Normal");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(null);

  const [data, setData] = React.useState<any>({ country: country[0], isRememberMe: false, isCancellation: false });
  const [nextOpen, setNextOpen] = useState<boolean>(false);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [error, setError] = useState<any>({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const getUniqueTradingOptions = (array: any) => {
    const seenIds = new Set();
    return array.filter((item: any) => {
      if (seenIds.has(item._id)) {
        return false;
      }
      seenIds.add(item._id);
      return true;
    });
  };

  function getAccountBalancesById(jsonData: any, selectedId: any) {
    const accountBalances = [];
    for (const item of jsonData) {
      if (item.currencyListData._id === selectedId) {
        accountBalances.push(item.accountBalance);
      }
    }
    return accountBalances;
  }

  function getPaymentCurrencyById(jsonData: any, selectedId: any, amount: any) {
    const paymentCurrency = [];
    for (const item of jsonData) {
      if (
        item.currencyListData._id === selectedId &&
        item.accountBalance == amount
      ) {
        paymentCurrency.push(item.buyChallengeCurrency);
      }
    }
    return paymentCurrency;
  }

  function getChanllage(jsonData: any, selectedId: any, amount: any) {

    const paymentCurrency = [];
    for (const item of jsonData) {
      if (
        item.currencyListData._id === selectedId &&
        item.accountBalance == amount
      ) {
        paymentCurrency.push(item);
      }
    }
    return paymentCurrency;
  }

  const handleChallengePaymentLink = async (type: any) => {
    setFullPageLoader(true);
    try {
      let paymentRes: any;
      if (type === "coinbase") {
        paymentRes = await dispatch(challenge_payment_link_coinbase({ challengeUserId: challengeId }));
      } else if (type === "airwallex") {
        paymentRes = await dispatch(challenge_payment_link_airwallex({ challengeUserId: challengeId }));
      }
      const error = ErrorHandler(paymentRes);
      if (error) {
        type === "coinbase"
          ? setPaymentURL(paymentRes.payload.data.hosted_url)
          : setPaymentURL(paymentRes.payload.data.url);
        setPaymentData(paymentRes.payload.data);
        setIsPaymentMethodModel(false);
        type === "coinbase"
          ? window.open(paymentRes.payload.data.hosted_url, "_self")
          : setModel(true);
        setFullPageLoader(false);
      } else {
        setFullPageLoader(false);
      }
    } catch (error: any) {
      tostify(error?.message, "error")
      setFullPageLoader(false);
    }
  };

  const handlePaymentModal = async () => {
    setFullPageLoader(true);
    if (paymentData?.id) {
      const getPaymentLink = await dispatch(get_challenge_payment_link(paymentData?.id))
      if (getPaymentLink.payload?.data?.status == "PAID") {
        tostify("Payment paid successfully", "success")
        router.push('/client-area')
        setFullPageLoader(false);
      } else if (getPaymentLink.payload?.data?.status == "UNPAID") {
        // tostify("Payment failed", "error")
        setFullPageLoader(false);
        setModel(false);
      }
      setSelectedPaymentMethod(null)
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTradingAccountCurrency = (e: any) => {
    setSelectedTradingAccountCurrency(e);
  };

  const handleAccountBalance = (e: any) => {
    setSelectedAccountBalance(e);
  };

  const handleTradingPlatForm = (e: any) => {
    setSelectedTradingPlatForm(e);
  };

  const handlePaymentCurrency = (e: any) => {
    setSelectedPaymentCurrency(e);
  };
  const handleAccountType = (e: any) => {
    setSelectedAccountType(e);
  };

  const formValidation = () => {
    let validFormValue = true;
    let errors: any = {};
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

    if (!data?.city) {
      validFormValue = false;
      errors["city"] = "*Please enter city";
    }
    if (!data?.street) {
      validFormValue = false;
      errors["street"] = "*Please enter street address";
    }
    if (!data?.isRememberMe) {
      validFormValue = false;
      errors["isRememberMe"] = " ";
    }
    if (!data?.isCancellation) {
      validFormValue = false;
      errors["isCancellation"] = " ";
    }
    if (!data?.postalCode) {
      validFormValue = false;
      errors["postalCode"] = "*Please enter postal Code";
    }
    if (!data?.contactNumber) {
      validFormValue = false;
      errors["contactNumber"] = "*Please enter contact Number";
    }
    if (value === 1) {
      // if (!data?.companyName) {
      //   validFormValue = false;
      //   errors["companyName"] = "*Please enter companyName";
      // }
      // if (!data?.businessNumber) {
      //   validFormValue = false;
      //   errors["businessNumber"] = "*Please enter businessNumber";
      // }
      if (!data?.VATnumber) {
        validFormValue = false;
        errors["VATnumber"] = "*Please enter VAT Number";
      }
    }

    setError(errors);
    return validFormValue;
  };

  const handleChangeFormValue = (e: any) => {
    const { name, value } = e?.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    (async () => {
      const body = {
        page: 1,
        limit: 10,
      };
      try {
        const res = await dispatch(challenge_list(body));
        if (res?.payload?.status === 200) {
          setChall_list(res?.payload?.data?.challenge_list_data);

          const tradingCurrencyMap: { [key: string]: any[] } = {};

          // Iterate through the data and group tradingCurrency by currencyList _id
          res?.payload?.data?.challenge_list_data.forEach((item: any) => {
            item.tradingCurrency.forEach((currency: any) => {
              const { currencyListId } = currency;
              if (!tradingCurrencyMap[currencyListId]) {
                tradingCurrencyMap[currencyListId] = [];
              }
              tradingCurrencyMap[currencyListId].push(currency);
            });
          });

          const tradingCurrencyList: any[] = [];
          Object.values(tradingCurrencyMap).map((item: any) => item?.map((e: any) => tradingCurrencyList.push(e)));

          setTradingCurrencyList(tradingCurrencyList);

          const tradingOptions = tradingCurrencyList?.length > 0 ? tradingCurrencyList?.map((e: any) => e?.currencyListData) : [];

          setTradingAccountCurrencyOptions(tradingOptions);
          setSelectedTradingAccountCurrency(
            getUniqueTradingOptions(tradingOptions)[0]
          );
        }
      } catch (error) {
        console.error("buy challeng list:", error);
      }
    })();
  }, []);

  React.useEffect(() => {
    const accountBalanceConfig = getAccountBalancesById(
      tradingCurrencyList,
      selectedTradingAccountCurrency?._id
    );
    setAccountBalance(accountBalanceConfig);
    setSelectedAccountBalance(accountBalanceConfig[0]);
  }, [selectedTradingAccountCurrency]);

  React.useEffect(() => {
    const paymentCurrencyConfig = getPaymentCurrencyById(
      tradingCurrencyList,
      selectedTradingAccountCurrency?._id,
      selectedAccountBalance
    );
    setPaymentCurrencyList(paymentCurrencyConfig[0]);
    setSelectedPaymentCurrency(paymentCurrencyConfig?.[0]?.[0]);
  }, [selectedAccountBalance]);

  const challenge = getChanllage(
    tradingCurrencyList,
    selectedTradingAccountCurrency?._id,
    selectedAccountBalance
  )?.[0];

  const _getUserDetails = async () => {
    try {
      setFullPageLoader(true);
      const response = await dispatch(user_profile());
      const error = ErrorHandler(response);
      if (error) {
        setData({
          ...data,
          _id: response.payload.data?._id,
          VATnumber: response.payload.data?.VATnumber,
          firstName: response.payload.data?.firstName || "",
          lastName: response.payload.data?.lastName || "",
          companyName: response.payload.data?.companyName,
          businessNumber: response.payload.data?.businessNumber,
          country: response.payload.data?.country || "",
          email: response.payload.data?.email || "",
          contactNumber: response?.payload?.data?.phoneNumber ? response?.payload?.data?.phoneNumber?.trim(" ") : "",
          city: response.payload.data?.city || "",
          street: response.payload.data?.street || "",
          postalCode: response.payload.data?.postalCode || "",
          note: response.payload.data?.note || "",
          countryCode: response?.payload?.data?.countryCode || "",
          countryCode1: response?.payload?.data?.countryCode1 || "",
          countryName: response?.payload?.data?.country
        });
        setFullPageLoader(false);
      } else {
        setFullPageLoader(false);
      }
    } catch (error: any) {
      tostify(error.message, "error");
      setFullPageLoader(false);
    }
  };
console.log((getSymbol(selectedTradingAccountCurrency?.code) + numberWithCommas(selectedAccountBalance))?.toString()?.replaceAll(" ",""),"asdadasda")
  React.useEffect(() => {
    _getUserDetails();
  }, []);
  function getStepContent(step: any) {
    switch (step) {
      case 0:
        return <PaymentMethod
          setNextOpen={setNextOpen}
          accountBalance={accountBalance}
          selectedAccountBalance={selectedAccountBalance}
          handleAccountBalance={handleAccountBalance}
          selectedTradingAccountCurrency={selectedTradingAccountCurrency}
          handleTradingAccountCurrency={handleTradingAccountCurrency}
          getUniqueTradingOptions={getUniqueTradingOptions}
          tradingAccountCurrencyOptions={tradingAccountCurrencyOptions}
          handleTradingPlatForm={handleTradingPlatForm}
          selectedTradingPlatForm={selectedTradingPlatForm}
          handleAccountType={handleAccountType}
          selectedAccountType={selectedAccountType}
          setSelectedTradingNormal={setSelectedTradingNormal}
          selectedTradingNormal={selectedTradingNormal}
          activeStep={activeStep}
          handleNext={handleNext}
        />;
      case 1:
        return <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PaperContainer
                title={"New Dot Point Challenge"}
              // sx={{ minHeight: '83px' }}
              >
                <TextLabel
                  title={`${(getSymbol(selectedTradingAccountCurrency?.code) + numberWithCommas(selectedAccountBalance))?.toString()?.replaceAll(" ","")} challenge on the ${selectedTradingPlatForm} platform`}
                  fontSize='14px'
                />
              </PaperContainer>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <PaperContainer title={"Billing Info"} sx={{ minHeight: '83px' }}>
                <TextLabel title="Before you start trading for us, we need to know some basic information about you." />
              </PaperContainer>
            </Grid> */}
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box p={0} mb={2} mt={2}>
                <Tabs
                  className={classes.tabsLine}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    className={classes.tabTitle}
                    label="Person"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={classes.tabTitle}
                    label="Company"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <PaperContainer title={"Billing Information"}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CommonTextField
                      text="First Name"
                      size="medium"
                      type="text"
                      name="firstName"
                      value={data?.firstName || ""}
                      onChange={(e: any) => setData({ ...data, firstName: e.target.value })}
                      width="100%"
                    />
                    <TextLabel
                      variant="caption"
                      fontSize="12px"
                      color="error"
                      title={!data?.firstName ? error?.firstName : " "}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CommonTextField
                      text="Last Name"
                      size="medium"
                      type="text"
                      name="lastName"
                      value={data?.lastName || ""}
                      onChange={(e: any) => setData({ ...data, lastName: e.target.value })}
                      width="100%"
                    />
                    <TextLabel
                      variant="caption"
                      fontSize="12px"
                      color="error"
                      title={!data?.lastName ? error?.lastName : " "}
                    />
                  </Grid>
                  {value === 1 && (
                    <>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <CommonTextField
                          text="Company Name"
                          size="medium"
                          type="text"
                          name="companyName"
                          value={data?.companyName || ""}
                          onChange={(e: any) => handleChangeFormValue(e)}
                          width="100%"
                        />
                        {/* <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.companyName ? error?.companyName : " "} /> */}
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <CommonTextField
                          text="Business Number"
                          size="medium"
                          type="text"
                          name="businessNumber"
                          value={data?.businessNumber || ""}
                          onChange={(e: any) => handleChangeFormValue(e)}
                          width="100%"
                        />
                        {/* <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.businessNumber ? error?.businessNumber : ""} /> */}
                      </Grid>
                    </>
                  )}
                </Grid>
              </PaperContainer>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ padding: 0, width: "100%" }}>
                <CustomTabPanel value={value} index={0}>
                  <PersonNewChallenge
                    country={country}
                    data={data}
                    setData={setData}
                    value={value}
                    buyList={chall_list}
                    paymentCurrencyList={paymentCurrencyList}
                    handlePaymentCurrency={handlePaymentCurrency}
                    selectedPaymentCurrency={selectedPaymentCurrency}
                    setSelectedPaymentCurrency={setSelectedPaymentCurrency}
                    challenge={challenge}
                    selectedTradingPlatForm={selectedTradingPlatForm}
                    setIsPayment={setIsPayment}
                    setChallengeId={setChallengeId}
                    error={error}
                    formValidation={formValidation}
                    setIsPaymentMethodModel={setIsPaymentMethodModel}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    activeStep={activeStep}
                  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <PersonNewChallenge
                    country={country}
                    data={data}
                    setData={setData}
                    value={value}
                    buyList={chall_list}
                    paymentCurrencyList={paymentCurrencyList}
                    handlePaymentCurrency={handlePaymentCurrency}
                    selectedPaymentCurrency={selectedPaymentCurrency}
                    challenge={challenge}
                    selectedTradingPlatForm={selectedTradingPlatForm}
                    setIsPayment={setIsPayment}
                    setChallengeId={setChallengeId}
                    formValidation={formValidation}
                    error={error}
                    setIsPaymentMethodModel={setIsPaymentMethodModel}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    activeStep={activeStep}

                  />
                </CustomTabPanel>
              </Box>
            </Grid>
          </Grid>
        </>;
      case 2:
        return <SelectPaymentMethod selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} handleBack={handleBack} selectedTradingNormal={selectedTradingNormal} selectedPaymentCurrency={selectedPaymentCurrency} selectedAccountType={selectedAccountType} selectedTradingAccountCurrency={selectedTradingAccountCurrency} selectedAccountBalance={selectedAccountBalance} selectedTradingPlatForm={selectedTradingPlatForm} data={data} handleChallengePaymentLink={handleChallengePaymentLink} handlePaymentModal={handlePaymentModal} paymentURL={paymentURL} setChallengeId={setChallengeId} model={model} setModel={setModel} />;
      default:
        return 'default'
    }
  }

  return (
    <>
      <BreadcrumbLayout
        breadcrumb={breadcrumbsData}
        breadcrumbTitle="New Dot Point Challenge"
      >
        {getStepContent(activeStep)}
      </BreadcrumbLayout >
    </>
  );
};

export default NewChallenge;
