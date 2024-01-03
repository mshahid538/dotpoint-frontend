import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { makeStyles } from "tss-react/mui";
import { Box, Grid, Link, useTheme, Paper } from "@mui/material";
import CommonTextField from "@components/common/commonTextField";
import MUIButton from "@components/common/commonButton";
import OutlinedCheckbox from "@components/common/commonCheckBox";
import SelectDropDown from "@components/common/selectDropDown";
import RadioButtonBox from "@components/common/RadioButtonBox";
import TextLabel from "@components/common/commonTextLabel";
import { buy_challenge } from "@redux/Redux/Actions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CommonModal from "@components/common/commonModel";
import { InvalidNumberKeys } from "@redux/utils/enum";
import Assets from "@components/common/image_container";
import ErrorHandler from "@components/common/errorHandler";
import usePageLoader from "@redux/hooks/usePageLoader";
import PaperContainer from "@components/common/PaperContainer";
import { BASE_URL_UPLOAD } from "@redux/Api/AuthApi";
import { Regex } from "@redux/utils/regex";
import { numberWithCommas } from "@lib/stringAvatar";
import { downloadFileNewTab } from "@lib/downloadFile";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DocPreview from "@components/common/docPreview";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const state = ["Surat", "Ahemdabad"];
const useStyles = makeStyles()((theme) => {
  return {
    pdfBox: {
      padding: "30px 0px",
      borderRadius: "3px",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      fontFamily: "poppins",
    },
    checkboxMsg: {
      marginTop: "-12px",
      marginBottom: "12px",
    },
    paymentMethodButton: {
      display: "flex",
      "&:hover": {
        border: `2px inset ${theme.palette.info.main}`,
      },
      border: `2px dashed ${theme.palette.info.main}`,
      borderRadius: 3,
      padding: "4px 6px",
      justifyContent: "center",
      cursor: "pointer",
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

const PersonNewChallenge = ({
  value,
  buyList = [],
  paymentCurrencyList,
  handlePaymentCurrency,
  selectedPaymentCurrency,
  selectedTradingPlatForm,
  challenge,
  data,
  setData,
  country,
  setIsPayment,
  formValidation,
  error,
  setIsPaymentMethodModel,
  handleBack,
  handleNext,
  activeStep,
  setChallengeId
}: any) => {

  //Hooks
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const setFullPageLoader = usePageLoader();
  const theme = useTheme()

  console.log(data, "data")
  const data1 = {
    createdAt: buyList?.map((item: any) => item?.tradingCurrency.map((e: any) => { if (e?._id === challenge?._id) { return item; } })).flat().filter((y: any) => y !== null && y !== undefined)?.[0]?.createdAt,
    tradingPeriodDays: buyList
      ?.map((item: any) =>
        item?.tradingCurrency.map((e: any) => {
          if (e?._id === challenge?._id) {
            return item;
          }
        })
      )
      .flat()
      .filter((y: any) => y !== null && y !== undefined)?.[0]
      ?.tradingPeriodDays,
  };

  const createdAtDate = new Date();
  const targetDate = new Date(
    createdAtDate.getTime() + data1.tradingPeriodDays * 24 * 60 * 60 * 1000
  );
  const formattedTargetDate = targetDate;

  const handleSubmit = async (values: any) => {
    if (formValidation()) {
      setFullPageLoader(true);
      let billInfo: any = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        countryCode: data?.countryCode,
        countryCode1: data?.countryCode1,
        country: data?.countryName,
        email: data?.email,
        city: data?.city,
        street: data?.street,
        postalCode: data?.postalCode,
        state: data?.state,
        note: data?.note,
        contactNumber: data?.contactNumber,
      };
      if (value == 1) {
        billInfo.companyName = data?.companyName;
        billInfo.bussinessNumber = data?.businessNumber;
        billInfo.VATnumber = data?.VATnumber;
      }
      const body = {
        currencyListId: challenge?.currencyListId,
        currencyCode: selectedPaymentCurrency?.currency,
        // accountBalance: challenge?.accountBalance,
        isReadRefundPolicy: data?.isCancellation,
        isReadTermsAndConditions: data?.isRememberMe,
        // amount: selectedPaymentCurrency?.amount,
        challengeType: value,
        challengeListId: buyList?.map((item: any) => item?.tradingCurrency.map((e: any) => { if (e?._id === challenge?._id) { return item } })).flat().filter((y: any) => y !== null && y !== undefined)?.[0]?._id,
        billingInfo: billInfo,
        // maximumLoss: challenge?.maximumLoss,
        platformOption: buyList?.map((item: any) => item?.tradingCurrency.map((e: any) => { if (e?._id === challenge?._id) { return item } })).flat().filter((y: any) => y !== null && y !== undefined)?.[0]?.platformOption?.[0] || 0,
        // profitTarget: challenge?.profitTarget,
        serverDetail: selectedTradingPlatForm?.toLowerCase(),
        endChallengeDate: formattedTargetDate
      };
      // ['createdAt', 'createdBy', 'credentials', 'equity', 'gain', 'isActive', 'isActive', 'isBlock', 'profit', 'updatedAt', 'updatedBy', '_id'].forEach((e: any) => delete body[e]);
      try {
        const response = await dispatch(buy_challenge(body));
        const error = ErrorHandler(response);

        if (error) {
          setChallengeId(response.payload.data._id);
          setIsPaymentMethodModel(true);
          setFullPageLoader(false);
          setIsPayment(true)
          handleNext()
        } else {
          setFullPageLoader(false);
        }
      } catch (error: any) {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFullPageLoader(false);
      }
    }
  };

  return (
    <>
      {data?._id &&
        <>
          <PaperContainer title={"Contact Info"}>
            <Grid container spacing={2} xs={12} sm={12} md={12} lg={12}>
              {value === 1 ? (
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <CommonTextField
                    text="VAT Number"
                    size="medium"
                    type="number"
                    name="VATnumber"
                    value={data?.VATnumber}
                    onChange={(e: any) => setData({ ...data, VATnumber: e.target.value })}
                    width="100%"
                  />
                  <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.VATnumber ? error?.VATnumber : " "} />
                </Grid>
              ) : null}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <CommonTextField
                  text="E-mail address"
                  size="medium"
                  type="text"
                  name="email"
                  value={data?.email}
                  onChange={(e: any) => setData({ ...data, email: e.target.value })}
                  width="100%"
                />
                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.email ? error?.email : " "} />
                <TextLabel variant="caption" fontSize="12px" color="error" title={data?.email && data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail} />

              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextLabel fontSize="14px" title={'Contact Number'} marginBottom={5} />
                <PhoneInput
                  country={"hk"}
                  value={data?.countryCode + data?.contactNumber}
                  onChange={(value: any, country: any, e: any, formattedValue: any) => {
                    const [code, number] = formattedValue.split(" ");
                    setData({
                      ...data,
                      countryCode: code,
                      contactNumber: data?.countryCode === code ? formattedValue?.replace(code, "") : undefined,
                      countryCode1: country?.countryCode,
                      countryName: country?.name
                    });
                  }}
                  inputProps={{ required: true, className: classes.phoneInput, }}
                  placeholder="Contact number"
                />
                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.contactNumber ? error?.contactNumber : " "} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <CommonTextField
                  text="Postal Code"
                  size="medium"
                  type="text"
                  name="postalCode"
                  value={data?.postalCode}
                  width="100%"
                  onChange={(e: any) => {
                    const isValidPostalCode = /^[0-9]+$/.test(e.target.value);
                    if (isValidPostalCode || e.target.value === "") {
                      setData({ ...data, postalCode: e.target.value });
                    }
                  }}
                  placeholder="Please enter postal code. if not than type 0000"
                  // onChange={(e: any) => setData({ ...data, postalCode: e.target.value })}
                  onKeyDown={(event: any) => {
                    if (InvalidNumberKeys.includes(event.code)) {
                      event.preventDefault();
                    }
                  }}
                />
                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.postalCode ? error?.postalCode : " "} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <CommonTextField
                  text="City"
                  size="medium"
                  type="city"
                  name="city"
                  value={data?.city}
                  onChange={(e: any) => setData({ ...data, city: e.target.value })}
                  width="100%"
                />
                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.city ? error?.city : " "} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <CommonTextField
                  text="Street"
                  size="medium"
                  type="text"
                  name="street"
                  onChange={(e: any) => setData({ ...data, street: e.target.value })}
                  value={data?.street}
                  width="100%"
                />
                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.street ? error?.street : " "} />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <CommonTextField
                  text="Country"
                  size="medium"
                  type="text"
                  name="country"
                  value={data?.countryName}
                  width="100%"
                  disabled={true}
                />
                {/* <SelectDropDown
                  text="Country"
                  values={country || []}
                  name="country"
                  value={data?.country}
                  onChange={(e: any) => { setData({ ...data, country: e.target.value }); }}
                  width={"100%"}
                  size="medium"
                  className="selecteeeborder"
                />
                <TextLabel variant="caption" fontSize="12px" color="error" title={!data?.country ? error?.country : " "} /> */}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <CommonTextField
                  text="Note"
                  size="medium"
                  type="text"
                  placeholder="Enter note here."
                  name="note"
                  value={data?.note}
                  onChange={(e: any) => { setData({ ...data, note: e.target.value }); }}
                  width="100%"
                />
              </Grid>
            </Grid>
          </PaperContainer>

          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} lg={12}>
              <PaperContainer title={"Payment Currency"}>
                <Grid container spacing={2}>
                  {paymentCurrencyList?.length > 0 &&
                    paymentCurrencyList?.map((e: any, i: any) => {
                      console.log(e, "eeeeeeeeeeeeeeee")
                      return (
                        <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={i}>
                          <RadioButtonBox
                            isIcon={true}
                            // disabled={data?.client ? false : true}
                            value={e?._id}
                            label={e?.currency}
                            handleChange={() => handlePaymentCurrency(e)}
                            count={selectedPaymentCurrency?.currency}
                            name={e?.currency}
                            num={e?.currency}
                            radioIcon={`${BASE_URL_UPLOAD}${e?.flag}`}
                            border={"1px solid #91D14F"}
                            backgroundColor={"#91D14F"}
                            borderRadius={"50px"}
                            padding={'0px'}
                          />
                        </Grid>
                      );
                    })}
                </Grid>
              </PaperContainer>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={12} lg={6}>
              <PaperContainer title={"Terms & Conditions"}>
                <DocPreview link={"/assets/doc/Dot_Point_T&C_v2.pdf"} iconName={"pdf"} octateFile={false} isSideView={false} />

                {/* <DocViewer documents={[
                    { uri: "assets/doc/Dot_Point_T&C_v2.pdf" },
                  ]} pluginRenderers={DocViewerRenderers} />; */}

                {/* <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[
                    { uri: "assets/doc/Dot_Point_T&C_v2.pdf" },
                  ]}
                  // documents={["assets/doc/Dot_Point_T&C_v2.pdf"]}
                  config={{
                    header: {
                      disableHeader: true,
                      // disableFileName: true,
                      retainURLParams: false
                    }
                  }}
                  
                  style={{ height: 500 }}
                /> */}
                <Box sx={{ marginBottm: "20px" }}>
                  <Box display={"flex"} alignItems={"center"} marginBottom={2} gap={1} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <OutlinedCheckbox
                      color={"#333333"}
                      label={"I declare that I have read and agree with "}
                      secondLabel={"Terms & Conditions"}
                      name={"isRememberMe"}
                      handleSelect={(e: any) => {
                        setData({ ...data, isRememberMe: e?.target?.checked })
                      }}
                      onClickSecondLabel={() => downloadFileNewTab("/assets/doc/Dot_Point_T&C_v2.pdf")}
                      value={data?.isRememberMe}
                      error={error?.isRememberMe}
                      selected={data?.isRememberMe}
                    />
                    {/* <Assets src={"/assets/icons/download_icon.svg"} absolutePath={true} /> */}
                  </Box>
                </Box>
              </PaperContainer>
            </Grid>
            <Grid item xs={12} lg={6}>
              <PaperContainer title={"Cancellation & Refund Policy"}>
                <DocPreview link={"/assets/doc/Cancellation%20And%20Refund%20Policy.pdf"} iconName={"pdf"} octateFile={false} isSideView={false} />
                <Box>
                  <Box display={"flex"} alignItems={"center"} marginBottom={2} gap={1} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <OutlinedCheckbox
                      color={"#333333"}
                      label={"I declare that I have read and agree with"}
                      secondLabel={"Cancellation & Refund Policy"}
                      name={"isCancellation"}
                      handleSelect={(e: any) => {
                        setData({ ...data, isCancellation: e?.target?.checked })
                      }}
                      onClickSecondLabel={() => downloadFileNewTab("/assets/doc/Cancellation And Refund Policy.pdf")}
                      value={data?.isCancellation}
                      error={error?.isCancellation}
                      selected={data?.isCancellation}
                    />
                    {/* <Assets src={"/assets/icons/download_icon.svg"} absolutePath={true} /> */}

                  </Box>
                </Box>
              </PaperContainer>
            </Grid>
            {activeStep == 1 &&
              <Grid item xs={12} lg={12}>
                <PaperContainer>
                  <Grid container spacing={0} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                      <TextLabel title={`${selectedPaymentCurrency?.currencySymbol + numberWithCommas(selectedPaymentCurrency?.amount)}`} textAlign="center" color="#0099CB" fontWeight="600" fontSize="28px" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                      <MUIButton
                        fullWidth={true}
                        height="42px"
                        text="Confirm and Proceed to Payment"
                        borderRadius="50px"
                        // width="300px"
                        onClick={handleSubmit}
                      />
                    </Grid>
                  </Grid>
                </PaperContainer>
              </Grid>}
          </Grid>

        </>
      }
    </>
  );
};

export default PersonNewChallenge;
