import React, { useState } from "react";
import PaperContainer from "@components/common/PaperContainer";
import TextLabel from "@components/common/commonTextLabel";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Input,
  InputLabel,
} from "@mui/material";
import CommonTextField from "@components/common/commonTextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MUIButton from "@components/common/commonButton";
import { makeStyles } from "tss-react/mui";
import { lightTheme } from "@redux/theme";
import RadioButtonBox from "@components/common/RadioButtonBox";
import CommonModal from "@components/common/commonModel";
import Assets from "@components/common/image_container";
import CheckIcon from "@mui/icons-material/Check";
import TextWithLabelInfo from "@components/common/textFieldInfoWithLabel";
import { numberWithCommas } from "@lib/stringAvatar";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { validateCoupon } from "@redux/Redux/Actions";
import ErrorHandler from "@components/common/errorHandler";
import { tostify } from "@components/common/tostify";
import { InvalidNumberKeys } from "@redux/utils/enum";

const useStyles = makeStyles()((theme) => {
  return {
    tabsLine: {
      borderBottom: "0px solid",
      "& .MuiTabs-indicator": {
        borderColor: lightTheme.palette.bgDefultGreen.main,
        height: "3px",
        width: "22px",
        borderRadius: "4px",
        backgroundColor: "#98cf4a",
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
        // backgroundColor: lightTheme.palette.bgDefultGreen.main,
        // borderRadius: "6px",
        color: "#000",
      },
    },
    paymentMethodButton: {
      fontSize: "1rem",
      width: "190px",
      height: "38px",
      borderRadius: "31px",
      display: "flex", // Make the container a flex container
      alignItems: "center", // Align items vertically at the center
      justifyContent: "center", // Align items horizontally to the start (left)
      color: "black",
      fontWeight: "400",
      border: `0.5px solid ${theme.palette.bgDefultLightSky.main}`,
    },
  };
});

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
        // <Box sx={{ p: 0 }}>
        <Typography>{children}</Typography>
        // </Box>
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

const SelectPaymentMethod = ({
  data,
  handleBack,
  handleChallengePaymentLink,
  handlePaymentModal,
  paymentURL,
  model,
  selectedTradingNormal,
  selectedAccountType,
  selectedTradingAccountCurrency,
  selectedAccountBalance,
  selectedTradingPlatForm,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  selectedPaymentCurrency,
}: any) => {
  //Hooks
  const { classes } = useStyles();
  const theme = useTheme();
  //State
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const airwallexPaymentMethods = [
    { img: "/assets/icons/visa-icon.webp", name: "Visa" },
    // { img: "/assets/images/airwallexLogo.png", name: 'Visa' },
    { img: "/assets/icons/mastercard-icon.webp", name: "Mastercard" },
    { img: "/assets/icons/alipay-icon.webp", name: "Alipay" },
    { img: "/assets/icons/wechatpay-icon.png", name: "WeChat Pay" },
    { img: "/assets/icons/fps-icon.png", name: "FPS" },
    { img: "/assets/icons/gpay-icon.webp", name: "Google Pay" },
  ];
  const coinbasePaymentMethods = [
    { img: "/assets/icons/bitcoin-icon.png", name: "Bitcoin" },
    { img: "/assets/icons/Ethereum-icon.png", name: "Ethereum" },
    // { img: "/assets/images/airwallexLogo.png", name: 'Visa' },
    { img: "/assets/icons/USDCoin-icon.png", name: "USD Coin" },
    { img: "/assets/icons/Dogecoin-icon.png", name: "Dogecoin" },
    { img: "/assets/icons/Litecoin-icon.png", name: "Litecoin" },
    { img: "/assets/icons/Dai-icon.png", name: "Dai" },
    { img: "/assets/icons/ApeCoin-icon.png", name: "ApeCoin" },
    { img: "/assets/icons/SHIBAINU-icon.png", name: "SHIBA INU" },
    { img: "/assets/icons/Tether-icon.png", name: "Tether" },
    { img: "/assets/icons/BitcoinCash-icon.png", name: "Bitcoin Cash" },
  ];

  const dispatch = useDispatch();

  return (
    <>
      <TextLabel variant="h5" marginBottom="18px" fontWeight="600" title="Select Payment Method" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <PaperContainer title={"Account Payment Details:"}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <TextWithLabelInfo label={"Name"} value={data?.firstName + " " + data?.lastName} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <TextWithLabelInfo label={"Email"} value={data?.email} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <TextWithLabelInfo label={"Trading Account Currency"} value={selectedTradingAccountCurrency?.code} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <TextWithLabelInfo label={"Risk Method"} value={selectedTradingNormal} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <TextWithLabelInfo label={"Account Balance"} value={numberWithCommas(selectedAccountBalance)} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <TextWithLabelInfo label={"Account Type"} value={selectedAccountType} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <TextWithLabelInfo label={"PlatForm"} value={selectedTradingPlatForm} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <TextWithLabelInfo
                  label={"Payment Currency"}
                  value={
                    selectedPaymentCurrency?.currencySymbol +
                    numberWithCommas(selectedPaymentCurrency?.discountedPrice || selectedPaymentCurrency?.amount)
                  }
                  color="#0099CB"
                  fontWeight="600"
                />
              </Grid>
            </Grid>
            <hr
              style={{
                flex: "1",
                display: "block",
                margin: "15px 0px",
                border: "none",
                borderTop: "1px dashed rgba(0, 0, 0, 0.3)",
              }}
            />
          </PaperContainer>
        </Grid>

        <Grid item xs={12} md={12} lg={6} sm={12}>
          <PaperContainer title={"Payment Method's"} padding={"20px 30px"}>
            <Box p={0} mb={1}>
              <Tabs
                className={classes.tabsLine}
                value={value}
                onChange={handleChange}
                aria-label="scrollable auto tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab className={classes.tabTitle} label="Online Payment" {...a11yProps(0)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  gap: 3,
                  overflow: "visible",
                }}
                onClick={() => {
                  handleChallengePaymentLink("airwallex");
                }}
              >
                <Box textAlign={"center"} height={"55px"} marginTop={"-26px"} marginBottom={"-8px"}>
                  <Assets src={"/assets/images/airwallexLogo.png"} absolutePath={true} width="180px" cursor="pointer" />
                </Box>
                <Box
                  sx={{ width: "100%", marginBottom: "-12px" }}
                  bgcolor={theme.palette.bgDefultLightSky.main}
                  component={Divider}
                />
                <Grid
                  container
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  spacing={2}
                  p={1}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  {airwallexPaymentMethods?.map((e: any, i: any) => {
                    return (
                      <Grid item key={i}>
                        <Chip
                          avatar={<Avatar alt={e?.name} src={e?.img} />}
                          label={e?.name}
                          variant={"outlined"}
                          className={classes.paymentMethodButton}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Button>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  gap: 3,
                  overflow: "visible",
                }}
                onClick={() => {
                  handleChallengePaymentLink("coinbase");
                }}
              >
                <Box textAlign={"center"} height={"55px"} marginTop={"5px"} marginBottom={"-35px"}>
                  <Assets
                    src={"/assets/images/coinbase.png"}
                    absolutePath={true}
                    height="30px"
                    width="150px"
                    cursor="pointer"
                  />
                </Box>
                <Box
                  sx={{ width: "100%", marginBottom: "-12px" }}
                  bgcolor={theme.palette.bgDefultLightSky.main}
                  component={Divider}
                />
                <Grid
                  container
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  spacing={2}
                  p={1}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  {coinbasePaymentMethods?.map((e: any, i: any) => {
                    return (
                      <Grid item key={i}>
                        <Chip
                          avatar={<Avatar alt={e?.name} src={e?.img} />}
                          label={e?.name}
                          variant={"outlined"}
                          className={classes.paymentMethodButton}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Button>
              {/* <Card elevation={10} sx={{ padding: 2, borderRadius: '20px' }} variant='outlined'>
                <Box textAlign={"center"} height={"39px"} onClick={() => { handleChallengePaymentLink("coinbase") }}>
                  <Assets
                    src={"/assets/images/coinbase.png"}
                    absolutePath={true}
                    height='33px'
                    width="160px"
                    cursor="pointer"
                  />
                </Box>
                <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
                <Grid container xs={12} sm={12} md={12} lg={12} spacing={1.5}>
                  {coinbasePaymentMethods?.map((e: any, i: any) => {
                    return (
                      <Grid item key={i}>
                        <Chip
                          avatar={<Avatar alt={e?.name} src={e?.img} />}
                          label={e?.name}
                          variant={e.name === selectedPaymentMethod ? 'filled' : 'outlined'}
                          onClick={() => {
                            setSelectedPaymentMethod(e.name);
                            handleChallengePaymentLink("coinbase")
                          }}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              </Card> */}
            </CustomTabPanel>
          </PaperContainer>
        </Grid>

        <Grid item xs={12} md={12} lg={12} sm={12}>
          <PaperContainer>
            <Grid container spacing={0} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                <MUIButton
                  backgroundColor={theme.palette.error.main}
                  hoverBgColor={theme.palette.error.main}
                  fullWidth={true}
                  height="42px"
                  text="Previous"
                  // width="300px"
                  borderRadius="50px"
                  onClick={handleBack}
                />
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}></Grid>
              </Grid>
            </Grid>
          </PaperContainer>
        </Grid>
      </Grid>

      {model && (
        <CommonModal open={model} onClose={() => handlePaymentModal()} title={"Challenge Payment"} maxWidth={"750px"}>
          <iframe
            src={paymentURL}
            id="payment_iframe"
            height="550px"
            // width="550px"
            frameBorder="0"
            scrolling="auto"
          />
        </CommonModal>
      )}
    </>
  );
};

export default SelectPaymentMethod;
