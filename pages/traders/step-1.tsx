import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import PaperContainer from "@components/common/PaperContainer";
import TextLabel from "@components/common/commonTextLabel";
import React, { ReactNode, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CommonTextField from "@components/common/commonTextField";
import MUIButton from "@components/common/commonButton";
import SelectDropDown from "@components/common/selectDropDown";
import { useDispatch } from "react-redux";
import { payment_withdrawal, profileWithdrawal, user_profile } from "@redux/Redux/Actions";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { InvalidNumberKeys, Regex } from "@redux/utils/regex";
import usePageLoader from "@redux/hooks/usePageLoader";
import ErrorHandler from "@components/common/errorHandler";
import { tostify } from "@components/common/tostify";

interface Breadcrumb {
  label: ReactNode;
  path: string;
}
const SpecialRequirment = ["Yes", "No"];
// const SpecialRequirment = [{ text: "yes", value: "true" }, { text: "no", value: "false" }];
const paymentChannelOptions = ["Bank", "Airwallex", 'Coinbase'];
const breadcrumbsData: Breadcrumb[] = [
  { label: "Trader", path: "/" },
  { label: "Dot Point Traders", path: "#" },
];
const Step = () => {
  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const setFullPageLoader = usePageLoader();
  const { id, whenEntered, } = router.query;

  //States
  const [tradingAccount, setTradingAccount] = React.useState<any>();
  const [data, setData] = React.useState<any>({
    Withdrawal: 0,
    refund: 0,
    rollOver: 0,
    payoutChannel: ' ',
    requirement: '',
  });
  const [errors, setError] = React.useState<any>({});
  const [withdrawaldata, setWithdrawaldata] = React.useState<any>()
  const FilterchallengeBuyingPrice = tradingAccount?.tradingAccounts?.filter((item: any) => item?.login === id)?.[0]?.challengeBuyingPrice
  const validateStep1 = () => {
    let errors: any = {};
    let formIsValid = true;

    if (!data?.Withdrawal) {
      formIsValid = false;
      errors["Withdrawal"] = "*Please enter withdrawal number";
    }
    if (!data?.bankName) {
      formIsValid = false;
      errors["bankName"] = "*Please enter bank name";
    }
    if (!data?.ifscCode) {
      formIsValid = false;
      errors["ifscCode"] = "*Please enter IFSC code";
    }
    if (!data?.accountNumber) {
      formIsValid = false;
      errors["accountNumber"] = "*Please enter account number";
    }

    setError(errors);

    return formIsValid;
  }
  const handleStartProcessing = async () => {
    try {
      if (validateStep1()) {

        let body = {
          "challengeUserId": tradingAccount?.tradingAccounts?.filter((item: any) => item?.login === id)?.[0]?.challengeUserId,
          "withdrawalAmount": Number(tradingAccount?.tradingAccounts?.filter((item: any) => item?.login === id)?.[0]?.challengeBuyingPrice),
          "refund": data?.refund,
          "rollover": data?.rollOver,
          "payoutChannel": data?.payoutChannel,
          "specialRequirement": data?.requirement === "Yes" ? true : false,
          "bankName": data?.bankName,
          "accountNumber": data?.accountNumber,
          "ifscCode": data?.ifscCode,
          // "countryCode": data?.countryCode,
          // "countryCode1": data?.countryCode1,
        };
        try {
          const res = await dispatch(profileWithdrawal(body));
          const error = ErrorHandler(res);
          if (error) {
            setWithdrawaldata(res?.payload?.data);
            tostify(res?.payload?.message, "success")
            router.push('/traders');
          }
          setFullPageLoader(false);
        } catch (error: any) {
          setFullPageLoader(false);
          tostify(error?.message, "error")
        }
      }

    } catch (error) {
      console.error('Login error:', error);
    }

  }
   const _getTradingAc = async () => {
    try {
      setFullPageLoader(true);
      const response = await dispatch(user_profile());
      const error = ErrorHandler(response);
      if (error) {
        setTradingAccount(response?.payload?.data)
        setData({ ...data, Withdrawal: Number(response?.payload?.data?.tradingAccounts?.filter((item: any) => item?.login === id)?.[0]?.challengeBuyingPrice) })
      }
      setFullPageLoader(false);
    } catch (error: any) {
      toast.success(error.message, { position: toast.POSITION.TOP_RIGHT, });
      setFullPageLoader(false);
    }
  }
  useEffect(() => {
    _getTradingAc()
  }, [])

  return (
    <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Profile">
      <PaperContainer
        title={
          `Step 1 - Configure you Profit Split of the Dot Point Account ${id}`
        }
        bodyPadding="0px"
      >
        <Box style={{ padding: "12px 16px" }}>
          <TextLabel
            fontSize="14px"
            fontWeight="400"
            color="#333333b3"
            title="Congratulations on making an profit! Well done indeed."
          />
          <Box
            sx={{
              display: "flex",
              columnGap: "5px",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            <TextLabel
              noWrap={false}
              fontSize="14px"
              title="The total profit on your trading account"
              color="#333333b3"
            />
            <TextLabel
              noWrap={false}
              fontSize="14px"
              title={id}
              color="#333333b3"
              style={{ textDecoration: "underline" }}
            />
            <TextLabel
              noWrap={false}
              fontSize="14px"
              title={`is $${FilterchallengeBuyingPrice}. Your profit Split is`}
              color="#333333b3"
            />
            <TextLabel
              fontSize="14px"
              fontWeight="600"
              title={`$${FilterchallengeBuyingPrice}`}
              color="#0099CB"
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CommonTextField
                text={`Withdrawal (max $${FilterchallengeBuyingPrice})`}
                size="medium"
                type="number"
                // placeholder="0"
                name="Withdrawal"
                width="100%"
                // value={data.Withdrawal}
                value={FilterchallengeBuyingPrice}
                onChange={(e: any) => setData({ ...data, Withdrawal: parseInt(e.target.value) })}
                disable
              />
              <TextLabel fontSize={"0.75rem"} color={"#ff0000"} fontWeight={"400"} title={!data?.Withdrawal ? errors?.Withdrawal : ""} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextLabel
                fontSize="14px"
                fontWeight="400"
                title="Enter the amount you wish to withdraw."
                color="#333333b3"
                value={data.withdraw}
                onChange={(e: any) => setData({ ...data, withdrawal: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonTextField
                text="Refund"
                size="medium"
                type="number"
                placeholder="0"
                name="refund"
                width="100%"
                value={data.refund}
                onChange={(e: any) => setData({ ...data, refund: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextLabel
                fontSize="14px"
                noWrap={false}
                fontWeight="400"
                title="The amount displayed above is the fee paid for Dot Point Challenge. You can either get your initial fee refunded to the same account that you used to pay for the Dot Point challenge, or you can order a brand
new Dot Point challenge of the same account size instead of receiving the refund. "
                color="#333333b3"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonTextField
                text="Rollover"
                size="medium"
                type="number"
                placeholder="0"
                name="rollOver"
                width="100%"
                value={data.rollOver}
                onChange={(e: any) => setData({ ...data, rollOver: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextLabel
                fontSize="14px"
                noWrap={false}
                fontWeight="400"
                title="Any amount that you decide not to withdraw this time will be deposited to the subsequent Dot Point  account balance. Note that we take our share only on the new profits made during any particular trading cycle, so the rollover trading will be 100% yours during your next profit split. "
                color="#333333b3"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MUIButton
                fullWidth={true}
                height="44px"
                width="100%"
                text={"Get new Dot Point challenge from your profits"}
                fontSize="14px"
                fontWeight="600"
                backgroundColor={"transparent"}
                variant="outlined"
                color="#0099CB"
                border="1px solid #0099CB"
                textHoverColor='#FFFFFF'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MUIButton
                fullWidth={true}
                height="44px"
                width="100%"
                text={"Get new Dot Point challenge instead of fee refund"}
                fontSize="14px"
                fontWeight="600"
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <SelectDropDown
                fullWidth
                width={"100%"}
                values={paymentChannelOptions}
                text="Payout Channel"
                name="Payout Channel"
                value={data?.payoutChannel}
                onChange={(e: any) => {
                  setData({ ...data, payoutChannel: e.target.value })
                }}
              />
            </Grid> */}
            {/* <Grid item sm={12}></Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <SelectDropDown
                fullWidth
                width={"100%"}
                values={SpecialRequirment || []}
                text="Any Special Requirements?"
                name="Any Special Requirements?"
                value={data?.requirement}
                onChange={(e: any) => {
                  setData({ ...data, requirement: e.target.value })
                }}
              />

            </Grid> */}
            <Grid item xs={12} sm={12}>
              <TextLabel
                fontSize="14px"
                noWrap={false}
                fontWeight="600"
                title="Scrolling Plan Eligibility"
                color="#333333"
              />
              <Box sx={{}}>
                <TextLabel
                  fontSize="14px"
                  noWrap={false}
                  display="inline-block"
                  fontWeight="400"
                  title="You haven’t met all the requirements to have your account scaled up yet. Please review the key requirements below for more information. "
                  color="#333333b3"
                  secondText={"See more details"}
                  secondTextColor="#0099CB"
                />
                <TextLabel
                  fontSize="14px"
                  display="inline-block"
                  fontWeight="400"
                  title=""
                  color="#0099CB"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextLabel
                fontSize="14px"
                noWrap={false}
                fontWeight="600"
                title="Fill Up Bank Details"
                color="#333333"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CommonTextField
                text="Bank Name"
                size="medium"
                type="text"
                placeholder="Enter bank name"
                name="bankName"
                width="100%"
                value={data?.bankName}
                onChange={(e: any) => setData({ ...data, bankName: e.target.value })}
                onBlur={async (e: any) => {
                  if (data?.bankName && !data?.bankName?.match(Regex.isLetters)) {
                    setError({
                      ...errors,
                      bankName: "*Bank should not have number & special charachter!",
                    });
                  }
                }}
              />
              <TextLabel fontSize={"0.75rem"} color={"#ff0000"} fontWeight={"400"} title={!data?.bankName ? errors?.bankName : ""} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CommonTextField
                text="Account Number"
                size="medium"
                type="text"
                placeholder="Enter account number"
                name="accountNumber"
                width="100%"
                value={data?.accountNumber}
                onChange={(e: any) => setData({ ...data, accountNumber: e.target.value })}
                // onBlur={async (e: any) => {
                //   if (data?.accountNumber && data?.accountNumber?.match(Regex.isLetters)) {
                //     setError({
                //       ...errors,
                //       invalidAccountNumber: "*Account number must be in number",
                //     });
                //   }
                // }}
                onKeyDown={(event: any) => {
                  if (InvalidNumberKeys.includes(event.code)) {
                    event.preventDefault();
                  }
                }}
              />
              <TextLabel fontSize={"0.75rem"} color={"#ff0000"} fontWeight={"400"} title={!data?.accountNumber ? errors?.accountNumber : ""} />
              {/* <TextLabel fontSize={"0.75rem"} color={"#ff0000"} fontWeight={"400"} title={!data?.invalidAccountNumber ? errors?.invalidAccountNumber : ""} /> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <CommonTextField
                text="IFSC Code"
                size="medium"
                type="text"
                placeholder="Enter IFSC code"
                name="ifscCode"
                width="100%"
                value={data?.ifscCode}
                onChange={(e: any) => setData({ ...data, ifscCode: e.target.value })}
              />
              <TextLabel fontSize={"0.75rem"} color={"#ff0000"} fontWeight={"400"} title={!data?.ifscCode ? errors?.ifscCode : ""} />
              {/* <TextLabel fontSize={"0.75rem"} color={"#ff0000"} fontWeight={"400"} title={!data?.validIfsc ? errors?.validIfsc : ""} /> */}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ textAlign: "center", marginTop: "30px" }}>
                <MUIButton
                  fullWidth={true}
                  height="44px"
                  width="207px"
                  text={"Proceed"}
                  fontSize="14px"
                  fontWeight="600"
                  onClick={() => handleStartProcessing()}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </PaperContainer>
    </BreadcrumbLayout>
  );
};

export default Step;
