import React, { useState, useEffect } from "react";
import { Box, Grid, Tab, Tabs, Typography, useTheme } from "@mui/material";
import TextLabel from "@components/common/commonTextLabel";
import PaperContainer from "@components/common/PaperContainer";
import RadioButtonBox from "@components/common/RadioButtonBox";
import CustomRadioBox from "@components/common/customRadioBox";
import Da from "../../public/assets/icons/24-support.svg";
import MUIButton from "@components/common/commonButton";
import { BASE_URL_UPLOAD } from "@redux/Api/AuthApi";
import { numberWithCommas } from "@lib/stringAvatar";
import Assets from "@components/common/image_container";
const PaymentMethod = ({
  accountBalance,
  selectedAccountBalance,
  handleAccountBalance,
  selectedTradingAccountCurrency,
  handleTradingAccountCurrency,
  getUniqueTradingOptions,
  tradingAccountCurrencyOptions,
  selectedAccountType,
  handleAccountType,
  selectedTradingPlatForm,
  handleTradingPlatForm,
  setSelectedTradingNormal,
  selectedTradingNormal,
  handleNext,
  activeStep
}: any) => {
  const theme = useTheme()

  const handleTradingNormal = (e: any) => {
    setSelectedTradingNormal(e);
  };
  return (
    <>
      <Box>
        <TextLabel variant="h6" marginBottom="18px" fontWeight="600" title="Start Dot Point Challenge" />
        <Grid container rowSpacing={5} columnSpacing={2}>
          <Grid item md={12} xs={12}>
            <PaperContainer mainTitle={"Trading Account Currency"} mainTitleWeight={500} fontSize={"16px"} height='100%' padding='10px 15px'>
              <Grid container spacing={2}>
                {getUniqueTradingOptions(
                  tradingAccountCurrencyOptions
                )?.map((item: any, i: any) => {
                  return (
                    <Grid item xs={6} sm={6} md={4} lg={2} xl={2} key={i}>
                      <RadioButtonBox
                        isIcon={true}
                        value={item?._id}
                        label={item?.code}
                        handleChange={() => handleTradingAccountCurrency(item)}
                        count={selectedTradingAccountCurrency?.code}
                        name={item?.code}
                        num={item?.code}
                        radioIcon={`${BASE_URL_UPLOAD}${item?.image}`}
                        border={"1px solid #91D14F"}
                        backgroundColor={"#91D14F"}
                        borderRadius={"50px"}
                        // width={'210px'}
                        textColor={"white"}
                        padding={'0px'}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </PaperContainer>
          </Grid>
          <Grid item md={6} xs={12}>
            <PaperContainer mainTitle={"Select Risk Method"} mainTitleWeight={500} fontSize={"16px"} height='100%' padding='10px 15px'>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={5} lg={4} xl={4}>
                  <RadioButtonBox
                    value={"Normal"}
                    label={"Normal"}
                    handleChange={() => handleTradingNormal("Normal")}
                    count={selectedTradingNormal}
                    name={"Normal"}
                    num={"Normal"}
                    border={"1px solid #91D14F"}
                    backgroundColor={"#91D14F"}
                    textColor={"white"}
                    padding={'10px 8px'}
                    borderRadius={50}
                  // width={'200px'}
                  />
                </Grid>
              </Grid>
            </PaperContainer>
          </Grid>
          <Grid item md={6} xs={12}>
            <PaperContainer mainTitle={"Account Balance"} mainTitleWeight={500} fontSize={"16px"} height='100%' padding='10px 15px'>
              <Grid container spacing={2}>
                {accountBalance?.map((val: any, i: number) => {
                  return (
                    <Grid item xs={6} sm={6} md={6} lg={4} xl={4} key={i}>
                      <RadioButtonBox
                        value={val}
                        label={numberWithCommas(val)}
                        handleChange={() => handleAccountBalance(val)}
                        count={selectedAccountBalance}
                        name={val}
                        num={val}
                        border={"1px solid #91D14F"}
                        backgroundColor={"#91D14F"}
                        textColor={"white"}
                        borderRadius={50}
                        // width={'200px'}
                        padding={'10px 8px'}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </PaperContainer>
          </Grid>
          <Grid item md={6} xs={12}>
            <PaperContainer mainTitle={"Account Type"} mainTitleWeight={500} fontSize={"16px"} height='100%' padding='10px 15px'>
              <Grid container spacing={2}>
                <Grid item  xs={8} sm={6} md={8} lg={4} xl={4}>
                  <RadioButtonBox
                    value={selectedAccountType}
                    label={"Dot Point Standard"}
                    handleChange={() => handleAccountType("Dot Point")}
                    count={selectedAccountType}
                    name={"Dot Point"}
                    num={"Dot Point"}
                    border={"1px solid #91D14F"}
                    backgroundColor={"#91D14F"}
                    textColor={"white"}
                    isIcon={true}
                    borderRadius={50}
                    radioIcon={"/assets/images/small-logo-white.png"}
                    // width={'210px'}
                    padding={'0px'}
                    fontSize={{ xl: '12px', lg: '12px', md: '12px', sm: '12px', xs: '12px' }}
                  />

                  {/* <RadioButtonBox
                      value={selectedAccountType}
                      label={"Dot Point Swing"}
                      handleChange={() => handleAccountType("dot-point-swing")}
                      count={selectedAccountType}
                      name={"dot-point-swing"}
                      num={"dot-point-swing"}
                      border={"2px solid #91D14F"}
                      backgroundColor={"#91D14F"}
                      textColor={"white"}
                      isIcon={true}
                      borderRadius={50}
                      radioIcon={"/assets/icons/icon-logo.png"}
                      width={'200px'}
                    /> */}
                </Grid>
              </Grid>
            </PaperContainer>
          </Grid>
          <Grid item md={6} xs={12}>
            <PaperContainer mainTitle={"Platform"} mainTitleWeight={500} fontSize={"16px"} height='100%' padding='10px 15px'>
              <Grid container spacing={2}>
                <Grid item xs={8} sm={6} md={8} lg={4} xl={4}>
                  <RadioButtonBox
                    value={selectedTradingPlatForm}
                    label={"MetaTrader 5"}
                    handleChange={() => handleTradingPlatForm("MT5")}
                    count={selectedTradingPlatForm}
                    name={"MT5"}
                    num={"MT5"}
                    border={"1px solid #91D14F"}
                    backgroundColor={"#91D14F"}
                    textColor={"white"}
                    isIcon={true}
                    borderRadius={50}
                    radioIcon={"/assets/icons/icon-mt5.png"}
                    // width={'210px'}
                    fontSize={{ xl: '12px', lg: '12px', md: '12px', sm: '12px', xs: '12px' }}
                  />
                </Grid>
                <Grid item xs={8} sm={6} md={8} lg={4} xl={4}>
                  <div style={{ position: 'relative' }}>
                    <RadioButtonBox
                      value={'ctrader'}
                      label={"cTrader"}
                      // handleChange={() => handleTradingPlatForm("ctrader")}
                      count={'ctrader'}
                      name={"ctrader"}
                      num={"ctrader"}
                      border={`1px solid ${theme.palette.bgDefultLight.main}`}
                      backgroundColor={theme.palette.bgWhite.main}
                      textColor={"gray"}
                      isIcon={true}
                      borderRadius={50}
                      radioIcon={"/assets/icons/icon-ctrader.png"}
                      // width={'200px'}
                      disabled={true}
                      padding={'0px 8px'}
                      fontSize={{ xl: '14px', lg: '14px', md: '14px', sm: '12px', xs: '12px' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 20,
                        padding: '1px 2px 1px',
                        borderRadius: '0 0px 5px 5px',
                        background: theme.palette.bgSuccess.main,
                        color: 'white',
                      }}
                    >
                      <Typography fontSize={'8px'} color="inherit">
                        Coming Soon
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </PaperContainer>
          </Grid>
          <Grid item md={12} xs={12}>
            <PaperContainer mainTitle={"Broker"} mainTitleWeight={500} fontSize={"16px"} height='100%' padding='10px 15px'>
              <Box display={'flex'} gap={3} flexWrap={'wrap'}>
                <Assets
                  src={"/assets/images/purple-trading-logo.png"}
                  absolutePath={true}
                  height='45px'
                  width='170px'
                  style={{ padding: '5px', borderRadius: 5, opacity: 1 }}
                />
                {/* <div style={{ position: 'relative' }}>
                  <Assets
                    src={"/assets/images/cTrader-logo.png"}
                    absolutePath={true}
                    height='40px'
                    width='190px'
                    style={{
                      border: `1px solid ${theme.palette.bgSuccess.main}`,
                      padding: '5px',
                      borderRadius: 5,
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      padding: '1px 5px 1px',
                      borderRadius: '0 0 0 5px',
                      background: theme.palette.bgSuccess.main,
                      color: 'white',
                    }}
                  >
                    <Typography fontSize={'10px'} color="inherit">
                      Coming Soon
                    </Typography>
                  </div>
                </div> */}
              </Box>
            </PaperContainer>
          </Grid>
          <Grid item md={12} xs={12}>
            <PaperContainer fontSize={"16px"}>
              {activeStep == 0 &&
                <Grid container spacing={0} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Box display={'flex'} justifyContent={'end'}>
                      <MUIButton
                        fullWidth={true}
                        height="42px"
                        text="Next"
                        borderRadius="50px"
                        onClick={() => handleNext()}
                      />
                    </Box>
                  </Grid>
                </Grid>
              }
            </PaperContainer>
          </Grid>
        </Grid>


      </Box>
    </>
  );
};
export default PaymentMethod;
