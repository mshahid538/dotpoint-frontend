import React, { useState } from "react";
import Highcharts from "highcharts";
//mui
import { makeStyles } from "tss-react/mui";
import { Grid, Box, TableRow, TableCell } from "@mui/material";
//component
import ChartComponent from "@components/chart";
import TextLabel from "@components/common/commonTextLabel";
import CommonTable from "@components/common/commonTable";
import { lightTheme } from "@redux/theme";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import AnalysisPra from "./AnalysisPra";
import BarChartCommon from "@components/commonCharts/BarChart";
import { BaseUrl } from "@redux/Api/AuthApi";
import { io } from "socket.io-client";

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

const ResultByDay = ({ data, tabName, analysisModal, buyChallengeGet, dataInstruments }: any) => {
  const [resultByDays, setresultByDays] = useState<any>({});

  const convertData = () => {
    const convertedData = dataInstruments && Object.entries(dataInstruments)
      .filter(([key, value]) => typeof value === 'number') // Filter out non-numeric values
      .map(([name, value]) => ({ name, value }));

    return convertedData;
  };

  const socket = io(BaseUrl);


  React.useEffect(() => {
    if (analysisModal && tabName === 'Result by Days') {
      const emitStatistics = () => {
        socket.emit('statistics', {
          type: 'result_by_days',
          allList: ["last_trade_list", "long_short_list"],
          accountId: buyChallengeGet?.accountId,
        });
      };
      emitStatistics();
      const intervalId = setInterval(() => {
        emitStatistics();
      }, 5000);

      socket.on('statistics_result_by_days', (response) => {
        setresultByDays(response?.data);
        // setStatisticsList(response?.data)
      });
      return () => clearInterval(intervalId);
    }
  }, [analysisModal, buyChallengeGet?.accountId])

  const results = resultByDays?.dayList?.length > 0 ? resultByDays?.dayList : data
  return (
    <>
      <TextLabel
        fontWeight="700"
        variant="h6"
        title={tabName}
        marginTop="20px"
      />
      <Grid
        container
        spacing={2}
        style={{ marginBottom: "20px" }}
        lg={12}
        md={12}
        sm={12}
        xs={12}
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <AnalysisPra />
          <Grid
            container
            spacing={2}
            style={{ marginBottom: "20px" }}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <>
                <Box
                  sx={{
                    marginTop: { sm: "40px", xs: "12px" },
                    overflowX: "auto",
                  }}
                >
                  <CommonTable
                    minWidth={"400px"}
                    tableHeader={
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Close</TableCell>
                        <TableCell>Open</TableCell>
                      </TableRow>
                    }
                    tableBody={
                      <>
                        {results?.length > 0 &&
                          results?.map((row: any, index: any) => (
                            <React.Fragment key={row.id}>
                              <TableRow>
                                <TableCell>{row.date}</TableCell>
                                <TableCell
                                  sx={{
                                    color:
                                      row.closingBalance >= 0
                                        ? lightTheme.palette.bgDefultGreen.main
                                        : lightTheme.palette.defultError.main,
                                  }}
                                >
                                  {`${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)}${numberWithCommas(row.closingBalance)}`}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color:
                                      row.openingBalance >= 0
                                        ? lightTheme.palette.bgDefultGreen.main
                                        : lightTheme.palette.defultError.main,
                                  }}
                                >
                                  {`${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)}${numberWithCommas(row.openingBalance)}`}
                                </TableCell>
                              </TableRow>
                              {index < results?.length - 1 && (
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
              </>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextLabel
                fontWeight="600"
                marginBottom="12px"
                variant="subtitle1"
                title="Result By Close"
              />
              {/* <PaperContainer padding="16px" backgroundColor="#eff8fb"> */}
              <BarChartCommon data={results?.map((item: any, i: any) => ({
                name: i + 1,
                value: item?.closingBalance
              }))
              } />
              {/* <ChartComponent chartOptions={balanceCurveOptions} /> */}
              {/* </PaperContainer> */}
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              {/* <Typography
                variant="h5"
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  margin: "10px 0px",
                }}
              >
                Result By OPen
              </Typography> */}
              <TextLabel
                fontWeight="600"
                marginBottom="12px"
                variant="subtitle1"
                title="Result By Open"
              />
              {/* <PaperContainer padding="16px" backgroundColor="#eff8fb"> */}
              <BarChartCommon data={resultByDays?.dayList?.map((item: any, i: any) => ({
                name: i + 1,
                value: item?.openingBalance
              }))
              } />
              {/* <ChartComponent chartOptions={balanceCurveOptions} /> */}
              {/* </PaperContainer> */}
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {/* <Typography
                variant="h5"
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  margin: "10px 0px",
                }}
              >
                Result By OPen
              </Typography> */}
              <TextLabel
                fontWeight="600"
                marginBottom="12px"
                variant="subtitle1"
                title="Result by instruments"
              />
              {/* <PaperContainer padding="16px" backgroundColor="#eff8fb"> */}
              {/* <ChartComponent chartOptions={balanceCurveOptions2} /> */}
              <BarChartCommon data={dataInstruments && convertData()} />
              {/* </PaperContainer> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ResultByDay;
