import React, { useState } from "react";
import ChartComponent from "@components/chart";
import PaperContainer from "@components/common/PaperContainer";
import { Box, Grid, TableCell, TableRow, Typography } from "@mui/material";
import Highcharts from "highcharts";
import Slider from "react-slick";
import TextLabel from "@components/common/commonTextLabel";
import AnalysisPra from "./AnalysisPra";
import CommonTable from "@components/common/commonTable";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import { lightTheme } from "@redux/theme";
import SimpleLineChart from "@components/commonCharts/LineChart";
import BarChartCommon from "@components/commonCharts/BarChart";
import { io } from "socket.io-client";
import { BaseUrl } from "@redux/Api/AuthApi";

const LongShort = ({
  data,
  analysisModal,
  tabName,
  historicalData,
  buyChallengeGet,
}: any) => {
  const [long_short_list, setLong_short_List] = useState<any>({});
  const rows = [
    {
      title: "Num. of trade",
      long: long_short_list?.longSummary?.numberOfTrades || 0,
      short: long_short_list?.shortSummary?.numberOfTrades || 0,
      isColor: false
    },
    {
      title: "Result",
      long: long_short_list?.longSummary?.totalProfit || 0,
      short: long_short_list?.shortSummary?.totalProfit || 0,
      isColor: true,
    },
    {
      title: "Win Rate",
      long: long_short_list?.longSummary?.winRate || 0,
      short: long_short_list?.shortSummary?.winRate || 0,
      isColor: false,
    },
    {
      title: "Average Profit",
      long: long_short_list?.longSummary?.averageProfit || 0,
      short: long_short_list?.shortSummary?.averageProfit || 0,
      isColor: true,
    },
    {
      title: "RRR",
      long: long_short_list?.longSummary?.riskRewardRatio || 0,
      short: long_short_list?.shortSummary?.riskRewardRatio || 0,
      isColor: false
    },
  ];

  const socket = io(BaseUrl);
  React.useEffect(() => {
    if (analysisModal && tabName === 'Long/Short comparison') {
      const emitStatistics = () => {
        socket.emit('statistics', {
          type: 'long_short_list',
          allList: ["long_short_list"],
          accountId: buyChallengeGet?.accountId,
        });
      };
      emitStatistics();
      const intervalId = setInterval(() => {
        emitStatistics();
      }, 5000);

      socket.on('statistics_long_short_list', (response) => {
        setLong_short_List(response?.data);
      });
      // Clear interval on component unmount or when analysisModal becomes false
      return () => clearInterval(intervalId);
    }
  }, [analysisModal]);


  return (
    <>
      <TextLabel fontWeight="700" variant="h6" title={tabName} marginBottom="20px" />
      <AnalysisPra />
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: "20px" }}
      >

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PaperContainer title={"Long Balance"}>
            <SimpleLineChart legendName={'No of traders'} data={long_short_list?.long?.filter((el: any) => el?.type === "DEAL_TYPE_BUY")?.map((item: any, i: any) => ({
              name: i + 1,
              value: item?.profit
            }))
            } />
          </PaperContainer>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PaperContainer title={"Short Balance"}>
            <SimpleLineChart
              legendName={'No of traders'}
              data={long_short_list?.short?.filter((el: any) => el?.type === "DEAL_TYPE_SELL")?.map((item: any, i: any) => ({
                name: i + 1,
                value: item?.profit
              }))
              }
            />
          </PaperContainer>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PaperContainer title={"Short comparison"}>
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
                      <TableCell></TableCell>
                      <TableCell>Long</TableCell>
                      <TableCell>Short</TableCell>
                    </TableRow>
                  }
                  tableBody={
                    <>
                      {rows?.length > 0 &&
                        rows.map((row: any, index: any) => (
                          <React.Fragment key={row.id}>
                            <TableRow>
                              <TableCell>{row.title}</TableCell>
                              <TableCell
                                sx={{
                                  color:
                                    row.isColor && (row.long >= 0
                                      ? lightTheme.palette.bgDefultGreen.main
                                      : "red"),
                                }}
                              >
                                {`${row?.title === "Result" || row?.title === "Average Profit" ? getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode) : ""}${numberWithCommas(row.long)}${row?.title === "Win Rate" ? "%" : ""}`}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color:
                                    row.isColor && (row.short >= 0
                                      ? lightTheme.palette.bgDefultGreen.main
                                      : "red"),
                                }}
                              >
                                {`${row?.title === "Result" || row?.title === "Average Profit" ? getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode) : ""}${numberWithCommas(row.short)}${row?.title === "Win Rate" ? "%" : ""}`}
                              </TableCell>
                            </TableRow>
                            {index < rows.length - 1 && (
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
          </PaperContainer>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PaperContainer title={"Long/Short"}>
            <BarChartCommon data={[
              {
                name: "Long",
                // value: data?.buyPositiveProfit + data?.buyNegativeProfit,
                value: long_short_list?.longSummary?.totalProfit,
              },
              {
                name: "Short",
                // value: data?.sellPositiveProfit + data?.sellNegativeProfit,
                value: long_short_list?.shortSummary?.totalProfit,
              },
            ]} />
          </PaperContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default LongShort;
