import React, { useState } from "react";
import ChartComponent from "@components/chart";
import PaperContainer from "@components/common/PaperContainer";
import { Box, Grid, TableCell, TableRow, Typography } from "@mui/material";
import Highcharts from "highcharts";
import TextLabel from "@components/common/commonTextLabel";
import CommonTable from "@components/common/commonTable";
import AnalysisPra from "./AnalysisPra";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import { lightTheme } from "@redux/theme";
import BarChartCommon from "@components/commonCharts/BarChart";
import { io } from "socket.io-client";
import { BaseUrl } from "@redux/Api/AuthApi";
const ResultByOpenHour = ({
  data,
  settings,
  tabName,
  balanceCurveDataSet,
  buyChallengeGet,
  analysisModal
}: any) => {
  const [resultByOpenHours, setResultByOpenHours] = useState<any>([]);

  const socket = io(BaseUrl);

  const dataDuration: any = [
    {
      poSize: "00:02-00:05 ",
      numTra: " 1",
      result: " 0.14",
    },
    {
      poSize: "00:05-00:15",
      numTra: " 2",
      result: " 23.55",
    },
    {
      poSize: " 00:30-02:00",
      numTra: " 1",
      result: "46.88 ",
    },
    {
      poSize: "02:00-06:00 ",
      numTra: "1 ",
      result: " 0.16",
    },
    {
      poSize: "00:30-02:00",
      numTra: " 36",
      result: " -156.74",
    },
    {
      poSize: "02:00-06:00",
      numTra: " 2",
      result: " 5.06",
    },
    {
      poSize: "00:30-02:00",
      numTra: "1 ",
      result: " -75.04",
    },
  ];

  React.useEffect(() => {
    if (analysisModal && tabName === 'Result by Open Hour') {
      const emitStatistics = () => {
        socket.emit('statistics', {
          type: 'result_by_open_hour',
          // allList: ["last_trade_list", "long_short_list"],
          accountId: buyChallengeGet?.accountId,
        });
      };
      emitStatistics();
      const intervalId = setInterval(() => {
        emitStatistics();
      }, 5000);

      socket.on('statistics_result_by_open_hour', (response) => {
        setResultByOpenHours(response?.data?.timeList)
      });
      return () => clearInterval(intervalId);
    }
  }, [analysisModal, buyChallengeGet?.accountId])
  const results = resultByOpenHours?.length > 0 ? resultByOpenHours : data

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
          {/* <PaperContainer title={"Results by Open Hour"}></PaperContainer> */}
          <TextLabel
            fontWeight="600"
            variant="subtitle1"
            title="Result by Open Hour"
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
              title={"Results by Trade Duration"}
              tableHeader={
                <TableRow>
                  <TableCell>Hour</TableCell>
                  <TableCell>No Of Trades</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              }
              tableBody={
                <>
                  {results?.map((row: any, index: any) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell>{row.timeRange || "-"}</TableCell>
                        <TableCell>{row.noOfTrade || "-"}</TableCell>
                        <TableCell
                          sx={{
                            color: row.valueColor
                              ? row.valueColor
                              : Number(row.result) < 0
                                ? lightTheme.palette.defultError.main
                                : lightTheme.palette.bgDefultGreen.main,
                          }}
                        >{`${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)}${numberWithCommas(row.result || "-")}`}</TableCell>
                      </TableRow>
                      {index < dataDuration.length - 1 && (
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
          {/* <PaperContainer title={"Results by Open Hour"}> */}
          <TextLabel
            fontWeight="600"
            variant="subtitle1"
            title="Result by Open Hour"
            marginBottom="10px"
          />
          <BarChartCommon data={results?.map((item: any, i: any) => ({
            name: item?.timeRange,
            value: item?.result
          }))
          } />
          {/* <ChartComponent chartOptions={balanceCurveOptions} /> */}
          {/* </PaperContainer> */}
        </Grid>
      </Grid>
    </>
  );
};

export default ResultByOpenHour;
