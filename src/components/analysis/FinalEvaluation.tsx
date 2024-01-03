import React from "react";
import { Box, Grid, TableCell, TableRow, Typography } from "@mui/material";
import TextLabel from "@components/common/commonTextLabel";
import CommonTable from "@components/common/commonTable";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { lightTheme } from "@redux/theme";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";

const FinalEvaluation = ({ buyChallengeGet }: any) => {
  const data = [
    {
      id: 1,
      column1: `Minimum ${buyChallengeGet?.minimumTradingDays === undefined
        ? "-"
        : buyChallengeGet?.minimumTradingDays
        } Trading Days`,
      minDays: "4",
      column2: `${buyChallengeGet?.minimumDayObjective?.completedDays === undefined
        ? "-"
        : buyChallengeGet?.minimumDayObjective?.completedDays
        } days`,
      column3: buyChallengeGet?.minimumDayObjective?.isPassed,
      valueColor: "#000",
    },
    {
      id: 2,
      column1: `Max Daily Loss - ${`${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)} ${numberWithCommas(
        buyChallengeGet?.maximumDayLoss
      )}` || "0"
        } `,
      columnFirstProfit: buyChallengeGet?.maxDailyLossObjective?.value?.toFixed(2)  || "0",
      clumnScndPercentage:
        buyChallengeGet?.maxDailyLossObjective?.percentage || "0",
      column3: buyChallengeGet?.maxDailyLossObjective?.isPassed,
    },
    {
      id: 3,
      column1: `Max Loss - ${buyChallengeGet?.maximumLoss === undefined ? "" : buyChallengeGet?.maximumLoss} ${buyChallengeGet?.tradingAccounts?.currencyCode === undefined ? ""
        : buyChallengeGet?.tradingAccounts?.currencyCode
        }`,
      columnFirstProfit: buyChallengeGet?.maxLossObjective?.value?.toFixed(2)  || "0",
      clumnScndPercentage: buyChallengeGet?.maxLossObjective?.percentage || "0",
      column3: buyChallengeGet?.maxLossObjective?.isPassed,
    },
    {
      id: 4,
      column1: `Profit Target ${buyChallengeGet?.profitTarget || "0"} ${buyChallengeGet?.tradingAccounts?.currencyCode || "-"
        }`,
      columnFirstProfit: buyChallengeGet?.profitObjective?.value?.toFixed(2) || "0",
      clumnScndPercentage: buyChallengeGet?.profitObjective?.percentage || "0",
      column3: buyChallengeGet?.profitObjective?.isPassed,
    },
  ];
  console.log("data",data,buyChallengeGet);
  

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextLabel
            fontWeight="700"
            variant="h6"
            title="Final Evaluation"
          // marginTop="20px"
          />
          <Box
            sx={{
              marginTop: "10px",
              overflow: "auto",
            }}
          >
            <CommonTable
              minWidth={"400px"}
              title={"Objectives"}
              tableHeader={
                <>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      }}
                    >
                      Trading Objectives
                    </TableCell>
                    <TableCell>Results</TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      Summary
                    </TableCell>
                  </TableRow>
                </>
              }
              tableBody={
                <>
                  {data.map((row: any, index: any) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell
                          colSpan={!row.hiddenSecond ? 1 : 2}
                          sx={{
                            borderBottom: "none",
                            borderTopLeftRadius: "8px",
                            borderBottomLeftRadius: "8px",
                          }}
                        >
                          {row.column1 || "-"}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            // color: row.column2 == 0
                            // ? "#000000DE"
                            // : row.column2 > 0
                            // ? lightTheme.palette.bgDefultGreen.main
                            // : lightTheme.palette.defultError.main
                          }}
                        >
                          {/* {row.column2 || "-"} */}
                          <Box sx={{ display: "flex" }}>
                            <TextLabel
                              variant="body1"
                              title={row.columnFirstProfit}
                              color={
                                row.columnFirstProfit == 0
                                  ? "#000000DE"
                                  : row.columnFirstProfit > 0
                                    ? lightTheme.palette.bgDefultGreen.main
                                    : lightTheme.palette.defultError.main
                              }
                            />
                            <TextLabel variant="body1" title={row?.minDays} />
                            {row.clumnScndPercentage && (
                              <>
                                <TextLabel variant="body1" title={"("} />
                                <TextLabel
                                  variant="body1"
                                  color={
                                    row.clumnScndPercentage == 0
                                      ? "#000000DE"
                                      : row.clumnScndPercentage > 0
                                        ? lightTheme.palette.bgDefultGreen.main
                                        : lightTheme.palette.defultError.main
                                  }
                                  title={`${row.clumnScndPercentage}%`}
                                />
                                <TextLabel variant="body1" title={")"} />
                              </>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            borderTopRightRadius: "8px",
                            borderBottomRightRadius: "8px",
                          }}
                        >
                          {row.column3 ? (
                            <CheckIcon
                              sx={{
                                color: "#91D14F",
                                verticalAlign: "middle",
                                fontSize: "22px",
                                marginRight: "5px",
                              }}
                            />
                          ) : (
                            <CloseIcon
                              sx={{
                                color: "#F14336",
                                verticalAlign: "middle",
                                fontSize: "22px",
                                marginRight: "5px",
                              }}
                            />
                          )}{" "}
                          {row.column3 ? "Passed" : "Not passing"}
                        </TableCell>
                      </TableRow>
                      {index < data.length - 1 && (
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
      </Grid>
    </>
  );
};

export default FinalEvaluation;
