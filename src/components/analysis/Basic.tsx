import ChartComponent from "@components/chart";
import {
  Grid,
  Typography,
  Box,
  Divider,
  InputAdornment,
  Button,
  TableRow,
  TableCell,
} from "@mui/material";
import PaperContainer from "@components/common/PaperContainer";
import React, { useState } from "react";
import Highcharts from "highcharts";
import Slider from "react-slick";
import Assets from "@components/common/image_container";
import TextLabel from "@components/common/commonTextLabel";
import moment from "moment";
import { makeStyles } from "tss-react/mui";
import CommonTable from "@components/common/commonTable";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import { lightTheme } from "@redux/theme";
import SimpleLineChart from "@components/commonCharts/LineChart";
import BarChartCommon from "@components/commonCharts/BarChart";
import { io } from "socket.io-client";
import { BaseUrl } from "@redux/Api/AuthApi";

const useStyles = makeStyles()((theme) => {
  return {
    commanSpacing: {
      display: "flex",
      gap: "6px",
      alignItems: "center",
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
    },
    cardTitle: {
      fontSize: "30px",
      fontWeight: "bold",
      textAlign: "center",
    },
    cardSubTitle: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: "18px",
      margin: "20px 0px",
    },
    cardtext: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: "14px",
      margin: "20px 0px",
    },
    cardUlMain: {
      width: "80%",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "10px auto",
    },
    cardli: {
      fontSize: "14px",
      fontWeight: "500",
    },
    cardButtonMain: {
      textAlign: "center",
      margin: "50px 0px 0px 0px",
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

const Basic = ({
  tabName,
  data,
  analysisModal,
  balanceCurveDataSet,
  buyChallengeGet,
  tab,
  balanceData
}: any) => {
  const { classes } = useStyles();

  const basizInfo = [{ name: 'Win', ...balanceData, closingAmount: balanceData?.positiveProfit }, { name: 'Lose', ...balanceData, closingAmount: balanceData?.negativeProfit }]
  const [statisticsList, setStatisticsList] = useState<any>({});

  console.log('statisticsList',statisticsList)
  const informationData: any = [
    {
      label: "Result",
      value: statisticsList?.overallLiveProfit,
      Symbol: getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)
    },
    {
      label: "Win rate",
      value: statisticsList?.winRate,
      Symbol: '%'
    },
    {
      label: "Average profit",
      value: statisticsList?.averageProfit,
      Symbol: getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)
    },
    {
      label: "End",
      value: (balanceData?.challengeAmount + balanceData?.positiveProfit) + balanceData?.negativeProfit,
      valueColor: "#000",
      Symbol: getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)
    },
  ];

  const socket = io(BaseUrl);

  React.useEffect(() => {
    if (analysisModal && tabName === 'Basic') {
      const emitStatistics = () => {
        socket.emit('statistics', {
          type: 'last_trade_list',
          allList: ["long_short_list"],
          accountId: buyChallengeGet?.accountId,
        });
      };
      emitStatistics();
      const intervalId = setInterval(() => {
        console.log("Received response:");
        emitStatistics();
      }, 5000);
      
      socket.on('statistics_last_trade_list', (response) => {
        setStatisticsList(response?.data)
      });
      return () => clearInterval(intervalId);
    }
  }, [analysisModal,buyChallengeGet?.accountId])

  return (
    <>
      <TextLabel fontWeight="700" variant="h6" title={tabName} />
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "0px", marginBottom: "20px" }}
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {/* <Slider {...settings}> */}
          <PaperContainer
            sx={{ width: "fit-content", marginBottom: 2 }}
            padding={"8px 16px"}
            borderRadius={"15px"}
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
                  width={18}
                  height={18}
                />
                <TextLabel
                  variant="subtitle2"
                  title={buyChallengeGet?.login || "-"}
                />
              </Box>
              <Divider
                orientation="vertical"
                flexItem={true}
                color="#333"
                sx={{ alignSelf: "center", height: { sm: "16px", xs: "14px" } }}
              />
              <Box className={classes.commanSpacing}>
                <Assets
                  src={"/assets/icons/walletSimple.svg"}
                  absolutePath={true}
                  width={18}
                  height={18}
                />
                <TextLabel
                  variant="subtitle2"
                  title={`${getSymbol(
                    buyChallengeGet?.tradingAccounts?.currencyCode
                  )} ${numberWithCommas(buyChallengeGet?.accountBalance)}`}
                />
              </Box>
              <Divider
                orientation="vertical"
                flexItem={true}
                color="#333"
                sx={{ alignSelf: "center", height: { sm: "16px", xs: "14px" } }}
              />
              <Box className={classes.commanSpacing}>
                <Assets
                  src={"/assets/icons/rightArrow.svg"}
                  absolutePath={true}
                  width={18}
                  height={18}
                />
                <TextLabel
                  variant="subtitle2"
                  title={moment(buyChallengeGet?.startChallengeDate).format(
                    "DD MMM YYYY"
                  )}
                />
              </Box>
              <Divider
                orientation="vertical"
                flexItem={true}
                color="#333"
                sx={{ alignSelf: "center", height: { sm: "16px", xs: "14px" } }}
              />
              <Box className={classes.commanSpacing}>
                <Assets
                  src={"/assets/icons/close.svg"}
                  absolutePath={true}
                  width={18}
                  height={18}
                  style={{
                    filter:
                      "invert(68%) sepia(51%) saturate(1680%) hue-rotate(312deg) brightness(95%) contrast(95%)",
                  }}
                />

                <TextLabel
                  variant="subtitle2"
                  title={moment(buyChallengeGet?.endChallengeDate).format(
                    "DD MMM YYYY"
                  )}
                />
              </Box>
            </Box>
          </PaperContainer>
          <SimpleLineChart
            legendName={'No of traders'}
            data={data?.filter((y: any) => y?.type !== "DEAL_TYPE_BALANCE")?.map((item: any, i: any) => ({ name: i + 1, value: item?.openPrice }))}
          />
          {/* <ChartComponent chartOptions={basicInfoOptions} /> */}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {/* <PaperContainer title={"Information"}> */}
              <TextLabel fontWeight="600" variant="subtitle1" title="Information" />
              <Box sx={{ overflowX: "auto", }}>
                <CommonTable
                  title={"Basic"}
                  tableBody={
                    <>
                      {informationData.map((row: any, index: any) => (
                        <React.Fragment key={row.id}>
                          <TableRow>
                            <TableCell>{row.label || "-"}</TableCell>
                            <TableCell>
                              <TextLabel
                                color={
                                  row.valueColor
                                    ? row.valueColor
                                    : Number(row.value) < 0
                                      ? lightTheme.palette.defultError.main
                                      : lightTheme.palette.bgDefultGreen.main
                                }
                                variant="body1"
                                title={`${row?.Symbol !== '%' ? row?.Symbol : ''}${numberWithCommas(row.value || "-")}${row?.Symbol == '%' ? row?.Symbol : ''}`}
                              />
                            </TableCell>
                          </TableRow>
                          {index < informationData.length - 1 && (
                            <TableRow>
                              <TableCell
                                sx={{
                                  borderBottom: "none",
                                  backgroundColor: "#FFFFFF !important",
                                }}
                                colSpan={2}
                              ></TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  }
                />
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextLabel
                fontWeight="600"
                marginBottom="12px"
                variant="subtitle1"
                title="Balance Curve"
              />
              <BarChartCommon data={basizInfo?.map((item: any, i: any) => ({
                name: item?.name,
                value: item?.closingAmount
              }))
              } />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Basic;
