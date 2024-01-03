import React, { useState } from "react";
import ChartComponent from "@components/chart";
import PaperContainer from "@components/common/PaperContainer";
import { Box, Grid, TableCell, TableRow, Typography } from "@mui/material";
import Highcharts from "highcharts";
import TextLabel from "@components/common/commonTextLabel";
import CommonTable from "@components/common/commonTable";
import { lightTheme } from "@redux/theme";
import AnalysisPra from "./AnalysisPra";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import BarChartCommon from "@components/commonCharts/BarChart";

const TradingDaysAnalysis = ({
  data,
  settings,
  tabName,
  balanceCurveDataSet,
  buyChallengeGet,
}: any) => {
  const chartOptions: any = {
    series: [
      {
        data: data
          ?.filter((y: any) => y?.type !== "DEAL_TYPE_BALANCE")
          ?.map((item: any) => item?.profit),
      },
    ],
    credits: {
      enabled: false,
    },
    chart: {
      scrollablePlotArea: {
        minWidth: 400,
      },
      type: "spline",
      width: 1500,
    },
    legend: {
      enabled: false,
    },
    yAxis: [
      {
        title: {
          text: "Profit", // Add your y-axis label here
          align: "middle",
        },
        labels: {
          align: "left",
          x: 3,
          format: "{value:.,0f}",
        },
        showFirstLabel: false,
        gridLineWidth: 0, // Remove the grid lines
        // plotLines: [
        //   {
        //     value: 50, // The y-value where you want the line
        //     color: "red", // Color of the line
        //     width: 1, // Width of the line
        //     zIndex: 4, // To display the line above the chart
        //     dashStyle: "dot", // Style of the line (dotted)
        //   },
        // ],
      },
      {
        linkedTo: 0,
        gridLineWidth: 1, // Remove the grid lines
        opposite: true,
        title: {
          text: null,
        },
        labels: {
          enabled: false,
        },
        showFirstLabel: false,
      },
    ],
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      tickWidth: 0,
      gridLineWidth: 0,
      title: {
        text: "Trade",
        align: "middle",
      },
      tickPositions: data?.map((item: any, i: any) => i + 1),
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        className: "popup-on-click",
        marker: {
          enabled: false,
        },
      },
    },
  };
  const tradingDayAnal: any = [
    {
      label: "Number of Days",
      value: data?.[0]?.noOfTrades,
      valueColor: "#000",
    },
    {
      label: "Avg.no.of trades",
      value: data?.[0]?.noOfTrades / data?.[0]?.noOfTradingDays ,
      valueColor: "#000",
    },
    {
      label: "Positive Days",
      value: data?.[0]?.positiveDays,
      valueColor: "#000",
    },
    {
      label: "Avg.Positive ",
      value: data?.[0]?.positiveProfit / data?.[0]?.positiveDays,
      symbol:getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)
    },
    {
      label: "Negative Days",
      value: data?.[0]?.negativeDays,
      valueColor: "#000",
    },
    {
      label: "Avg. Negative Day ",
      value: data?.[0]?.negativeProfit /data?.[0]?.negativeDays,
      symbol:getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)
    },
  ];
  const balanceCurveOptions: any = {
    chart: {
      type: "column",
    },
    series: [
      {
        type: "column",
        data: [1, -2, 3],
      },
    ],
    xAxis: {
      categories: ["Foo", "Bar", "Baz"],
      labels: {
        useHTML: true,
        formatter: () => "",
      },
    },
  };

  React.useEffect(() => {
    Highcharts.setOptions(chartOptions);
  }, [chartOptions]);

  return (
    <>
      <TextLabel fontWeight="700" variant="h6" title={tabName} />
      <AnalysisPra />
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <TextLabel
            fontWeight="600"
            variant="subtitle1"
            title="Trading Days Analysis"
          />
          <Box sx={{ overflowX: "auto" }}>
            <CommonTable
              //   minWidth={"400px"}
              tableBody={
                <>
                  {tradingDayAnal?.length > 0 &&
                    tradingDayAnal.map((row: any, index: any) => (
                      <React.Fragment key={row.id}>
                        <TableRow>
                          <TableCell>{row.label || "-"}</TableCell>
                          <TableCell
                            sx={{
                              color: row.valueColor
                                ? row.valueColor
                                : Number(row.value) < 0
                                  ? lightTheme.palette.defultError.main
                                  : lightTheme.palette.bgDefultGreen.main,
                            }}
                          >
                            {(row.symbol ? row.symbol : "") + numberWithCommas(row.value || "-")}
                          </TableCell>
                        </TableRow>
                        {index < tradingDayAnal.length - 1 && (
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
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <TextLabel
            fontWeight="600"
            marginBottom="10px"
            variant="subtitle1"
            title="Average day"
          />
          <BarChartCommon data={data?.map((item: any, i: any) => ({
            name: i + 1,
            value: item?.closingAmount
          }))
          } />
        </Grid>
      </Grid>
    </>
  );
};

export default TradingDaysAnalysis;
