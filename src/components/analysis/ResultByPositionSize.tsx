import React, { useState } from "react";
import ChartComponent from "@components/chart";
import PaperContainer from "@components/common/PaperContainer";
import Highcharts from "highcharts";
import TextLabel from "@components/common/commonTextLabel";
import CommonTable from "@components/common/commonTable";
import { Box, TableCell, TableRow, Grid, Typography } from "@mui/material";
import AnalysisPra from "./AnalysisPra";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import { lightTheme } from "@redux/theme";
import BarChartCommon from "@components/commonCharts/BarChart";

const ResultByPositionSize = ({
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
  const resultByData: any = [
    {
      poSize: "0.01 ",
      numTra: " 1",
      result: "0.14",
    },
    {
      poSize: "1.00 ",
      numTra: " 2",
      result: " 23.55",
    },
    {
      poSize: " 2.00",
      numTra: " 1",
      result: "46.88 ",
    },
    {
      poSize: "3.00 ",
      numTra: "1 ",
      result: " 0.16",
    },
    {
      poSize: "5.00 ",
      numTra: " 36",
      result: " -156.74",
    },
    {
      poSize: " 8.00",
      numTra: " 2",
      result: " 5.06",
    },
    {
      poSize: "10.00 ",
      numTra: "1 ",
      result: " -75.04",
    },
  ];
  React.useEffect(() => {
    Highcharts.setOptions(chartOptions);
  }, [chartOptions]);

  return (
    <>
      <TextLabel
        fontWeight="700"
        variant="h6"
        title={tabName}
        marginTop="20px"
      />
      <AnalysisPra />
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item lg={5} md={6} sm={12} xs={12}>
          <TextLabel
            fontWeight="600"
            variant="subtitle1"
            title="Results by Position Size"
          />
          <Box
            sx={{
              marginTop: "10px",
              maxHeight: "350px",
              overflow: "auto",
            }}
          >
            <CommonTable
              minWidth={"400px"}
              title={"Results by Position Size"}
              tableHeader={
                <TableRow>
                  <TableCell>Position size</TableCell>
                  <TableCell>No Of Trades</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              }
              tableBody={
                <>
                  {data?.map((row: any, index: any) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell>{row.volume || "-"}</TableCell>
                        <TableCell>{row.noOfTrade || "-"}</TableCell>
                        <TableCell
                          sx={{
                            color: row.valueColor
                              ? row.valueColor
                              : Number(row.result) < 0
                                ? lightTheme.palette.defultError.main
                                : lightTheme.palette.bgDefultGreen.main,
                          }}
                        >
                          {`${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)}${numberWithCommas(row.result || "-")}`}
                        </TableCell>
                      </TableRow>
                      {index < resultByData.length - 1 && (
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
        <Grid item lg={7} md={6} sm={12} xs={12}>
          <TextLabel
            fontWeight="600"
            variant="subtitle1"
            title="Results by Position Size"
            marginBottom="10px"
          />
          <BarChartCommon data={data?.map((item: any, i: any) => ({
            name: item?.volume,
            value: item?.result
          }))
          } />
        </Grid>
      </Grid>
    </>
  );
};

export default ResultByPositionSize;
