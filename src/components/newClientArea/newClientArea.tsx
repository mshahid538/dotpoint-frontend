import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Grid, Box, Divider, InputAdornment, Button, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import CommonModal from "@components/common/commonModel";
import Assets from "@components/common/image_container";
import TextLabel from "@components/common/commonTextLabel";
import { tostify } from "@components/common/tostify";
import {
  challenge_approval,
  dot_point_challenge,
  get_consistency_score,
  get_historical,
  get_history,
  get_history_day_wise,
  trading_accounts_details,
} from "@redux/Redux/Actions";
import usePageLoader from "@redux/hooks/usePageLoader";
import ErrorHandler from "@components/common/errorHandler";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import NewPaperContainer from "@components/common/Layout/NewPaperContainer";
import ClientDetailsLable from "@components/clientArea/ClientDetailsLable";
import { makeStyles } from "tss-react/mui";
import Analysis from "@components/analysis";
import StatisticsArea from "@components/statistics";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { io } from "socket.io-client";
import { BaseUrl } from "@redux/Api/AuthApi";

const useStyles = makeStyles()((theme) => {
  return {
    commanSpacing: {
      display: "flex",
      gap: "6px",
      alignItems: "center",
      border: `1px solid ${theme.palette.bgDefultLightSky.main}`,
      borderRadius: "50px",
      // padding: '0px 6px 0px 8px',
      padding: "3px 12px",
    },
    commanItemSpacing: {
      padding: "12px 24px",
      marginBottom: "12px",
      borderRadius: "15px",
      [theme.breakpoints.down("sm")]: {
        padding: "8px 12px",
      },
    },
    iconBorder: {
      borderRadius: "50%",
      padding: "8px",
      backgroundColor: "#fff",
      display: "inline-flex",
      boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
      alignItems: "center",
      justifyContent: "center",
      width: "20px",
      height: "20px",
    },
    cardMain: {
      backgroundColor: theme.palette.common.white,
      boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
      padding: "30px",
      borderRadius: "5px",
      // maxWidth: "300px",
      [theme.breakpoints.down("sm")]: {
        padding: "20px 18px",
      },
    },

    cardButtonMain: {
      textAlign: "center",
      margin: "50px 0px 0px 0px",
      [theme.breakpoints.down("md")]: {
        margin: "40px 0px 0px 0px",
      },
    },
    iconsDetails: {
      display: "flex",
      gap: "24px",
      flexWrap: "wrap",
      marginTop: "12px",
      [theme.breakpoints.down("md")]: {
        gap: "12px",
        marginTop: "10px",
      },
    },
    iconHighlight: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        gap: "10px",
      },
    },
  };
});
function NewClientArea() {
  const socket = io(BaseUrl);

  //Hooks
  const router = useRouter();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();
  // const { challengeUserId, accountId } = router.query
  const theme = useTheme()
  //States
  const [model, setModel] = useState<any>(false);
  const [historyId, setHistoryId] = useState<any>("");
  const [accountId, setAccountId] = useState<any>("");
  const [challengeUserId, setChallengeUserId] = useState<any>("");
  const [buyChallengeGet, setBuyChallengeGet] = useState<any>();
  const [statisticsModal, setStatisticsModal] = useState<any>(false);
  const [analysisModal, setAnalysisModal] = useState<any>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [historyData, setHistoryData] = useState<any>({});
  const [clientData, setClientData] = useState<any>();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const _getUserDetails = async () => {
    try {
      setFullPageLoader(true);
      const response = await dispatch(trading_accounts_details({}));
      const error = ErrorHandler(response);
      if (error) {
        setClientData(response?.payload?.data);
        setFullPageLoader(false);
      } else {
        setFullPageLoader(false);
      }
    } catch (error: any) {
      toast.success(error.message, { position: toast.POSITION.TOP_RIGHT });
      setFullPageLoader(false);
    }
  };



  useEffect(() => {
    if (challengeUserId) {
      (async () => {
        try {
          const res = await dispatch(
            dot_point_challenge(`/${challengeUserId}`)
          );
          if (res?.payload?.status === 200) {
            setFullPageLoader(true);
            setBuyChallengeGet(res?.payload?.data);
            setFullPageLoader(false);
          } else {
            setFullPageLoader(false);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      })();
    }
  }, [challengeUserId]);

  useEffect(() => {
    if (buyChallengeGet?.endChallengeDate) {
      (async () => {
        const body = {
          accountId: historyId,
          startDate: moment(buyChallengeGet?.createdAt).format('YYYY-MM-DD'),
          endDate: moment(buyChallengeGet?.endChallengeDate).format(
            "YYYY-MM-DD"
          ),
          challengeUserId: challengeUserId,
        };
        try {
          const res = await dispatch(get_historical(body));
          const res2 = await dispatch(get_history(body));
          const res3 = await dispatch(get_history_day_wise(body));
          if (res?.payload?.status === 200) {
            setFullPageLoader(true);
            setHistoryData({
              ...historyData,
              currentResultData: res?.payload?.data,
              tradingJournalData: res2?.payload?.data,
              dayWiseData: res3?.payload?.data,
            });
            setFullPageLoader(false);
          } else {
            setFullPageLoader(false);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      })();
    }
  }, [buyChallengeGet?.endChallengeDate]);

  const _approveRequest = async (item: any) => {

    setFullPageLoader(true);
    const body = {
      challengeUserId: item?.challengeUserId,
      login: item?.login,
      accountId: item?.accountId,
      isStep1: item?.step1Completed,
      isStep2: item?.step2Completed,
    };
    const response = await dispatch(challenge_approval(body));
    const error = ErrorHandler(response);

    if (error) {
      toast.success(response?.payload?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      _getUserDetails();
      setFullPageLoader(false);
    }
    setFullPageLoader(false);
  };

  const planCardData = [
    {
      title: "Dot Point Challenge",
      subTitle: "Showcase your trading skills and trade up to US$200,000 with our Dot Point Account after completing the challenge",
      text: "Practice your trading without risking anything",
      ul: [
        {
          li: "Trade Dot Point Account up to US$200,000",
        },
        {
          li: "Profit split up to 80% with our Dot Point Account",
        },
        {
          li: "Trading analysis provided to improve your performance",
        },
        {
          li: "Full fee refund once successfully proved your skills by completing the challenge",
        },
      ],
      buttontext: "Start Dot Point Challenge",
    },
  ];

  const isAuthenticated = localStorage.getItem("access_token");

  useEffect(() => {
    if (isAuthenticated) {
      setFullPageLoader(true);
      const wait = async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        if (router.isReady) {
          await _getUserDetails();
        }
      };
      wait();
    }
  }, [router.isReady, isAuthenticated]);

  React.useEffect(() => {
    if (clientData?.length > 0 && !statisticsModal && !analysisModal) {
      const onGoingChallenges = clientData?.filter((e: any) => e?.challengeUserData?.status === 0 || e?.challengeUserData?.status === 1 || e?.challengeUserData?.status === 2)
      onGoingChallenges?.map((item: any) => {
        console.log("socket ready for response", `trader_account_${item?.accountId}`);

        // socket.emit(`trader_account_${item?.accountId}`, {});
        socket.on(`trader_account_${item?.accountId}`, (response: any) => {
          console.log("socket response successfully", response);
          const data = clientData?.map((ele: any) => ele?.challengeUserId === response?.challengeUserId ? { ...ele, newSokectBalance: response?.currentAccountBalance } : { ...ele })
          setClientData(data)
        });
      })
    }
    return () => {
      console.log("Socket Disconnected");
      socket.disconnect();
    };
  }, [clientData?.length, statisticsModal, analysisModal])

  return (
    <>
      {clientData &&
        (clientData?.length > 0 ? (
          <NewPaperContainer title="Active Challenges">
            {clientData?.length > 0 &&
              clientData?.map((item: any, i: any) => {
                return (
                  <>
                    <Box
                      className={classes.commanItemSpacing}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        filter:
                          item?.challengeUserData?.status === 3 ? "opacity(0.6)" : "opacity(1)",
                        backgroundColor: item?.challengeUserData?.status === 0 || item?.challengeUserData?.status === 1 || item?.challengeUserData?.status === 2 ? "#f5fafe" : item?.challengeUserData?.status === 3 ? "#f4f4f4" : item?.challengeUserData?.status === 4 ? "#fff1f2" : undefined,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "12px",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <Box className={classes.commanSpacing}>
                          <Assets
                            src={"/assets/icons/user.svg"}
                            absolutePath={true}
                            width={16}
                            height={16}
                          />
                          <TextLabel
                            variant="body1"
                            title={`${item?.login || "-"}`}
                            marginTop={1}
                          />
                        </Box>

                        <Box className={classes.commanSpacing}>
                          <Assets
                            src={"/assets/icons/walletSimple.svg"}
                            absolutePath={true}
                            width={16}
                            height={16}
                          />
                          <TextLabel
                            variant="body1"
                            title={`${getSymbol(item?.currencyCode)} ${numberWithCommas(item?.newSokectBalance || item?.challengeUserData?.currentBalance || "0")} `}
                          />
                        </Box>

                        <Box className={classes.commanSpacing}>
                          <Assets
                            src={"/assets/icons/rightArrow.svg"}
                            absolutePath={true}
                            width={16}
                            height={16}
                          />
                          <TextLabel
                            variant="body1"
                            title={moment(item?.endChallengeDate || "-").format(
                              "DD MMM YYYY"
                            )}
                          />
                        </Box>

                        <Box className={classes.commanSpacing}>
                          {item?.challengeUserData?.status === 0 ||
                            item?.challengeUserData?.status === 1 ||
                            item?.challengeUserData?.status === 2 ||
                            item?.challengeUserData?.status === 3 ? (
                            <Assets
                              src={"/assets/icons/check.svg"}
                              absolutePath={true}
                              width={16}
                              height={16}
                              style={{
                                filter:
                                  item?.challengeUserData?.status === 3
                                    ? " "
                                    : "invert(100%) sepia(18%) saturate(6566%) hue-rotate(29deg) brightness(92%) contrast(77%)",
                              }}
                            />
                          ) : item?.challengeUserData?.status === 4 ? (
                            <Assets
                              src={"/assets/icons/close.svg"}
                              absolutePath={true}
                              width={16}
                              height={16}
                              style={{
                                filter: "invert(68%) sepia(51%) saturate(1680%) hue-rotate(312deg) brightness(95%) contrast(95%)",
                              }}
                            />
                          ) : (
                            "-"
                          )}

                          <TextLabel
                            color={
                              item?.challengeUserData?.status === 0 ||
                                item?.challengeUserData?.status === 1 ||
                                item?.challengeUserData?.status === 2
                                ? "orange"
                                : ""
                            }
                            variant="body1"
                            title={
                              item?.challengeUserData?.status === 0 ||
                                item?.challengeUserData?.status === 1 ||
                                item?.challengeUserData?.status === 2
                                ? "Ongoing"
                                : item?.challengeUserData?.status === 3
                                  ? "Closed"
                                  : item?.challengeUserData?.status === 4
                                    ? "Failed"
                                    : "-"
                            }
                          />

                        </Box>

                      </Box>
                      {/* {item?.step2Completed ? (
                        item?.step2Status === 0 ? (
                          <TextLabel
                            title={`Your step 2 Request is in progress`}
                            style={{ color: "rgb(255, 199, 0)" }}
                          />
                        ) : item?.step2Status === 1 ? (
                          <TextLabel
                            title={`Your step 2 Request is approved`}
                            style={{ color: "green" }}
                          />
                        ) : item?.step2Status === 2 ? (
                          <TextLabel
                            title={`Your step 2 Request is rejected`}
                            style={{ color: "red" }}
                          />
                        ) : (
                          <TextLabel
                            title={`Request for complete step 2`}
                            style={{
                              borderBottom: "1px solid blue",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            onClick={() => _approveRequest(item)}
                          />
                        )
                      ) : item?.step1Completed ? (
                        item?.step1Status === 0 ? (
                          <TextLabel
                            title={`Your step 1 Request is in progress`}
                            style={{ color: "rgb(255, 199, 0)" }}
                          />
                        ) : item?.step1Status === 1 ? (
                          <TextLabel
                            title={`Your step 1 Request is approved`}
                            style={{ color: "green" }}
                          />
                        ) : item?.step1Status === 2 ? (
                          <TextLabel
                            title={`Your step 1 Request is rejected`}
                            style={{ color: "red" }}
                          />
                        ) : (
                          <TextLabel
                            title={`Request for complete step 1`}
                            style={{
                              borderBottom: "1px solid blue",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            onClick={() => _approveRequest(item)}
                          />
                        )
                      ) : (
                        ""
                      )} */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: "6px", sm: "40px" },
                          flexWrap: "wrap"
                          // flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <ClientDetailsLable
                          itemStatus={item?.challengeUserData?.status}
                          img={"/assets/icons/key.svg"}
                          onClick={
                            item?.challengeUserData?.status === 3
                              ? () => { }
                              : () => setModel(item)
                          }
                          text="Credentials"
                        />
                        <ClientDetailsLable
                          itemStatus={item?.challengeUserData?.status}
                          img={"/assets/icons/statistics.svg"}
                          text="Statistics"
                          onClick={
                            item?.challengeUserData?.status === 3
                              ? () => { }
                              : () => {
                                setStatisticsModal(item);
                                setHistoryId(item?.accountId);
                                setChallengeUserId(item?.challengeUserId);
                              }
                          }
                        // onClick={item?.challengeUserData?.status === 3 ? () => { } : () => {
                        //     router.push({
                        //         pathname: "/statistics",
                        //         query: {
                        //             accountId: item?.accountId,
                        //             challengeUserId: item?.challengeUserId
                        //         }
                        //     }); setChallengeUserId(item?.challengeUserId)
                        // }}
                        //  onClick={() => router.push({
                        //     pathname: "/statistics",
                        //     query: {
                        //         accountId: item?.accountId,
                        //         challengeUserId: item?.challengeUserId
                        //     }
                        // })}
                        />
                        <ClientDetailsLable
                          itemStatus={item?.challengeUserData?.status}
                          img={"/assets/icons/analysis.svg"}
                          text="Analysis"
                          onClick={
                            item?.challengeUserData?.status === 3
                              ? () => { }
                              : () => {
                                setAnalysisModal(true);
                                setHistoryId(item?.accountId);
                                setChallengeUserId(item?.challengeUserId);
                              }
                          }
                        />
                      </Box>
                    </Box>
                  </>
                );
              })}
            <CommonModal
              open={model}
              onClose={() => setModel(false)}
              title={"Login Credentials"}
            >
              <>
                <Box>
                  <Box
                    sx={{ backgroundColor: "#f5fafe" }}
                    className={classes.commanItemSpacing}
                  >
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item sm={4} xs={12}>
                        <TextLabel variant="subtitle2" title={"Login"} />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextLabel
                          variant="subtitle2"
                          title={model?.login || "-"}
                        />
                      </Grid>
                      <Grid item sm={4} xs={12} sx={{ textAlign: "right" }}>
                        <Box
                          className={classes.iconBorder}
                          sx={{ cursor: "pointer" }}
                        >
                          <Assets
                            src={"/assets/icons/copyNew.svg"}
                            absolutePath={true}
                            width={20}
                            height={20}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                model?.login || "-"
                              );
                              tostify(`copied to clipboard!`, "success");
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    sx={{ backgroundColor: "#f5fafe" }}
                    className={classes.commanItemSpacing}
                  >
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item sm={4} xs={12}>
                        <TextLabel
                          variant="subtitle2"
                          title={"Master password"}
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <Box display={"flex"} sx={{ alignItems: "center" }}>
                          <TextLabel
                            variant="subtitle2"
                            title={
                              showPassword
                                ? model?.password || "-"
                                : "•".repeat(model?.password?.length || "-")
                            }
                          />
                          {model?.password?.length > 0 ? (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon
                                    style={{ fontSize: "21px" }}
                                  />
                                ) : (
                                  <VisibilityOffIcon
                                    style={{ fontSize: "21px" }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ) : undefined}
                        </Box>
                      </Grid>
                      <Grid item sm={4} xs={12} sx={{ textAlign: "right" }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "end",
                          }}
                        >
                          <Box className={classes.iconBorder}>
                            <Assets
                              src={"/assets/icons/change.svg"}
                              absolutePath={true}
                              width={20}
                              height={20}
                            />
                          </Box>
                          <Box
                            className={classes.iconBorder}
                            sx={{ cursor: "pointer" }}
                          >
                            <Assets
                              src={"/assets/icons/copyNew.svg"}
                              absolutePath={true}
                              width={20}
                              height={20}
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  model?.password || "-"
                                );
                                tostify(`copied to clipboard!`, "success");
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    sx={{ backgroundColor: "#f5fafe" }}
                    className={classes.commanItemSpacing}
                  >
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item sm={4} xs={12}>
                        <TextLabel
                          variant="subtitle2"
                          title={"Read-only password"}
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextLabel variant="subtitle2" title={"CV6ZK79"} />
                      </Grid>
                      <Grid item sm={4} xs={12} sx={{ textAlign: "right" }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "end",
                          }}
                        >
                          <Box className={classes.iconBorder}>
                            <Assets
                              src={"/assets/icons/change.svg"}
                              absolutePath={true}
                              width={20}
                              height={20}
                            />
                          </Box>
                          <Box
                            className={classes.iconBorder}
                            sx={{ cursor: "pointer" }}
                          >
                            <Assets
                              src={"/assets/icons/copyNew.svg"}
                              absolutePath={true}
                              width={20}
                              height={20}
                              onClick={() => {
                                navigator.clipboard.writeText("CV6ZK79");
                                tostify(`copied to clipboard!`, "success");
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    sx={{ backgroundColor: "#f5fafe" }}
                    className={classes.commanItemSpacing}
                  >
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item sm={4} xs={12}>
                        <TextLabel variant="subtitle2" title={"Server"} />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextLabel
                          variant="subtitle2"
                          title={model?.serverURL || "-"}
                        />
                      </Grid>
                      <Grid item sm={4} xs={12} sx={{ textAlign: "right" }}>
                        <Box
                          className={classes.iconBorder}
                          sx={{ cursor: "pointer" }}
                        >
                          <Assets
                            src={"/assets/icons/copyNew.svg"}
                            absolutePath={true}
                            width={20}
                            height={20}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                model?.serverURL || "-"
                              );
                              tostify(`copied to clipboard!`, "success");
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box>
                  <Box
                    className={classes.commanSpacing}
                    sx={{ marginTop: "24px", marginBottom: "6px" }}
                  >
                    <TextLabel
                      fontWeight="600"
                      variant="subtitle1"
                      title={`Platform:`}
                    />
                    <TextLabel
                      fontWeight="600"
                      textTransform="uppercase"
                      variant="subtitle1"
                      title={`${model?.serverDetail || "-"}`}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { lg: "54px", md: "40px", sm: "26px", xs: "24px" },
                      flexWrap: "wrap",
                    }}
                  >
                    <Box>
                      <TextLabel
                        fontWeight="600"
                        variant="subtitle2"
                        title={"Mobile"}
                      />
                      <Box className={classes.iconsDetails}>
                        <Box className={classes.iconHighlight}>
                          <Box className={classes.iconBorder}>
                            <Assets
                              style={{
                                filter:
                                  "invert(54%) sepia(86%) saturate(4360%) hue-rotate(166deg) brightness(93%) contrast(103%)",
                              }}
                              src={"/assets/icons/Android.svg"}
                              absolutePath={true}
                              width={"24px"}
                              height={"24px"}
                            />
                          </Box>
                          <Box>
                            <TextLabel variant="body1" title={"Android"} />
                            <a
                              href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en&referrer=ref_id%3d4946019784992326989%26utm_source%3dwww.metatrader5.com%26utm_campaign%3dinstall.metaquotes"
                              target="_blank"
                            >
                              <TextLabel
                                variant="body1"
                                title="Download"
                                color={'blue'}
                              />
                            </a>
                          </Box>
                        </Box>
                        <Box className={classes.iconHighlight}>
                          <Box className={classes.iconBorder}>
                            <Assets
                              style={{
                                filter:
                                  "invert(54%) sepia(86%) saturate(4360%) hue-rotate(166deg) brightness(93%) contrast(103%)",
                              }}
                              src={"/assets/icons/Apple.svg"}
                              absolutePath={true}
                              width={"24px"}
                              height={"24px"}
                            />
                          </Box>
                          <Box>
                            <TextLabel variant="body1" title={"IOS"} />
                            <a
                              href="https://apps.apple.com/us/app/metatrader-5/id413251709?utm_campaign=install.metaquotes&utm_source=www.metatrader5.com"
                              target="_blank"
                            >
                              <TextLabel
                                variant="body1"
                                title="Download"
                                color={'blue'}
                              />
                            </a>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <TextLabel
                        fontWeight="600"
                        variant="subtitle2"
                        title={"Desktop"}
                      />
                      <Box className={classes.iconsDetails}>
                        <Box className={classes.iconHighlight}>
                          <Box className={classes.iconBorder}>
                            <Assets
                              style={{
                                filter:
                                  "invert(54%) sepia(86%) saturate(4360%) hue-rotate(166deg) brightness(93%) contrast(103%)",
                              }}
                              src={"/assets/icons/Windows.svg"}
                              absolutePath={true}
                              width={"24px"}
                              height={"24px"}
                            />
                          </Box>
                          <Box>
                            <TextLabel variant="body1" title={"Windows"} />
                            <a
                              href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader5.com&utm_campaign=download"
                              target="_blank"
                            >
                              <TextLabel
                                variant="body1"
                                title="Download"
                                color={'blue'}
                              />
                            </a>
                          </Box>
                        </Box>
                        <Box className={classes.iconHighlight}>
                          <Box className={classes.iconBorder}>
                            <Assets
                              style={{
                                filter:
                                  "invert(54%) sepia(86%) saturate(4360%) hue-rotate(166deg) brightness(93%) contrast(103%)",
                              }}
                              src={"/assets/icons/Apple.svg"}
                              absolutePath={true}
                              width={"24px"}
                              height={"24px"}
                            />
                          </Box>
                          <Box>
                            <TextLabel variant="body1" title={"MacOS"} />
                            <a
                              href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.pkg.zip?utm_source=www.metatrader5.com&utm_campaign=download.mt5.macos"
                              target="_blank"
                            >
                              <TextLabel
                                variant="body1"
                                title="Download"
                                color={'blue'}
                              />
                            </a>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* <Box>
                      <TextLabel
                        fontWeight="600"
                        variant="subtitle2"
                        title={"Web version"}
                      />
                      <Box className={classes.iconsDetails}>
                        <Box className={classes.iconHighlight}>
                          <Box className={classes.iconBorder}>
                            <Assets
                              style={{
                                filter:
                                  "invert(54%) sepia(86%) saturate(4360%) hue-rotate(166deg) brightness(93%) contrast(103%)",
                                padding: "4px",
                              }}
                              src={"/assets/icons/desktop.svg"}
                              absolutePath={true}
                              width={"17px"}
                              height={"17px"}
                            />
                          </Box>
                          <Box>
                            <TextLabel variant="body1" title={"Web version"} />

                            <a href="#">
                              <TextLabel
                                variant="body1"
                                title="Web Platform"
                                color={'blue'}
                              />
                            </a>

                          </Box>
                        </Box>
                      </Box>
                    </Box> */}
                  </Box>
                </Box>
                <Box
                  bgcolor={"#91d14f"}
                  borderRadius={"15px"}
                  padding={2}
                  alignItems={"center"}
                  sx={{ marginTop: { md: "32px", sm: "24px", xs: "24px" } }}
                >
                  <TextLabel
                    textAlign="center"
                    fontWeight="500"
                    variant="body1"
                    title={
                      "*We recommend using the desktop platform as the webtrader does not store history."
                    }
                    color={"#fff"}
                  />
                </Box>
              </>
            </CommonModal>
            <CommonModal
              open={statisticsModal}
              onClose={() => setStatisticsModal(false)}
              title={"Statistics"}
              height={'750px'}
            >
              <>
                <StatisticsArea
                  buyChallengeGet={buyChallengeGet}
                  statisticsModal={statisticsModal}
                  historyData={historyData}
                  challengeUserId={challengeUserId}
                />
              </>
            </CommonModal>
            <CommonModal
              open={analysisModal}
              onClose={() => setAnalysisModal(false)}
              title={"Analysis"}
              height={'750px'}
            >
              <>
                <Analysis
                  analysisModal={analysisModal}
                  challengeUserId={challengeUserId}
                  accountId={historyId}
                />
              </>
            </CommonModal>
          </NewPaperContainer>
        ) : (
          <>
            {planCardData.map((item, i) => (
              <Box
                className={classes.cardMain}
                sx={{ border: `${"1px solid #0099cb"}` }}
                key={i}
              >
                <Box textAlign="center">
                  <Assets
                    src={"/assets/images/small-logo.png"}
                    absolutePath={true}
                    width={70}
                    height={70}
                  />
                </Box>
                <TextLabel
                  marginBottom="24px"
                  textAlign="center"
                  fontWeight="600"
                  variant="h3"
                  title={item.title || "-"}
                />
                <TextLabel
                  marginBottom="20px"
                  textAlign="center"
                  fontWeight="600"
                  lineHeight="normal"
                  variant="subtitle1"
                  color="#0099cb"
                  title={item.subTitle || "-"}
                />
                <TextLabel
                  marginBottom="30px"
                  textAlign="center"
                  fontWeight="500"
                  variant="body1"
                  title={item.text || "-"}
                />
                <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                  {item.ul.map((item, index) => (
                    <Box sx={{ display: "flex", gap: "12px", justifyContent: "center", width: "100%", marginBottom: "8px" }} key={index}>
                      <Box sx={{ display: "flex", gap: "12px", width: "300px" }}>
                        <CheckCircleOutlineIcon sx={{ color: "#0099cb" }} />
                        <TextLabel variant="body1" title={item.li || "-"} />
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box className={classes.cardButtonMain}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: `${"#0099cb"}` }}
                    onClick={() => router.push("/new-challenge")}
                  >
                    {item.buttontext || "-"}
                  </Button>
                </Box>
              </Box>
            ))}
          </>
        ))}
    </>
  );
}
export default NewClientArea;
