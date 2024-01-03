import ChartComponent from "@components/chart";
import PaperContainer from "@components/common/PaperContainer";
import React, { useState } from "react";
import { Grid, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import TextLabel from "@components/common/commonTextLabel";
import Highcharts from "highcharts";
import NoDataFound from "@components/common/noDataFound";
import SimpleLineChartExample from "@components/commonCharts/LineChart";

const CurrentResults = ({ historyData }: any) => {
  const basicInfoOptions: any = {
    series: [
      {
        data: historyData?.currentResultData
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
      backgroundColor: "#eff8fb",
      borderRadius: "15px",
      padding: "8px",
    },
    legend: {
      enabled: false,
    },
    yAxis: [
      {
        title: {
          text: "Balance", // Add your y-axis label here
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
        text: "Number of trade",
        align: "middle",
      },
      tickPositions: historyData?.currentResultData
        ?.filter((y: any) => y?.type !== "DEAL_TYPE_BALANCE")
        ?.map((item: any, i: any) => i),
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

  React.useEffect(() => {
    Highcharts.setOptions(basicInfoOptions);
  }, [basicInfoOptions]);

  return (
    <>
      <TextLabel fontWeight="600" variant="h6" title="Current Results" />
      <Grid container>
        <Grid item md={12} xs={12} sx={{ marginTop: "24px" }}>
          <SimpleLineChartExample legendName="No. of trades" data={historyData?.currentResultData
            ?.filter((y: any) => y?.type !== "DEAL_TYPE_BALANCE")
            ?.map((item: any, i: any) => ({
              name: i + 1,
              value: item?.profit
            }))
          } />
        </Grid>
        {/* {historyData?.currentResultData && <Grid item md={12} xs={12} sx={{ marginTop: "24px" }}>
          {historyData?.currentResultData?.length > 0 ? <ChartComponent
            chartOptions={basicInfoOptions}
          /> : <NoDataFound title={'The chart and other MetriX values will be updated with the first closed trade.'} />}
        </Grid>} */}
      </Grid >
    </>
  );
};

export default CurrentResults
