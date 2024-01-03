import React from "react";
//mui
import { Box, TableCell, TableRow } from "@mui/material";
//component
import CommonTable from "@components/common/commonTable";
import TextLabel from "@components/common/commonTextLabel";
import { lightTheme } from "@redux/theme";
import { numberWithCommas } from "@lib/stringAvatar";
import moment from "moment";

const DailySummary = ({ buyChallengeGet, historyData }: any) => {
  const rows = [
    {
      startDate: "14 Aug",
      noOfTrades: 29,
      noOfLots: 2,
      result: 5035.08,
    },
    {
      startDate: "15 Aug",
      noOfTrades: 31,
      noOfLots: 3,
      result: -6000.0,
    },
    {
      startDate: "16 Aug",
      noOfTrades: 35,
      noOfLots: 4,
      result: -7500.0,
    },
    {
      startDate: "17 Aug",
      noOfTrades: 28,
      noOfLots: 2,
      result: -4900.0,
    },
    {
      startDate: "18 Aug",
      noOfTrades: 30,
      noOfLots: 3,
      result: -6750.0,
    },
  ];

  return (
    <>
      <TextLabel fontWeight="600" variant="h6" title="Daily Summary" />
      <Box sx={{ marginTop: { sm: "10px", xs: "12px" }, overflowX: "auto" }}>
        <CommonTable
          minWidth={"400px"}
          tableHeader={
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Trades</TableCell>
              <TableCell>Lots</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          }
          tableBody={
            <>
              {historyData?.length > 0 &&
                historyData.map((row: any, index: any) => (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell>
                        {moment(row.startDate).format("DD MMM YYYY") || "-"}
                      </TableCell>
                      <TableCell>{row.noOfTrades || "0"}</TableCell>
                      <TableCell>{row.noOfLots || "0"}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            row.result == 0
                              ? "#000000DE"
                              : row.result > 0
                              ? lightTheme.palette.bgDefultGreen.main
                              : lightTheme.palette.defultError.main,

                          //   color:
                          //     row.result >= 0
                          //       ? lightTheme.palette.bgDefultGreen.main
                          //       : lightTheme.palette.defultError.main,
                        }}
                      >
                        {numberWithCommas(row.result.toFixed(2) || "-")}
                      </TableCell>
                    </TableRow>
                    {index < historyData.length - 1 && (
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
  );
};

export default DailySummary;
