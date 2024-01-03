import React from "react";
//mui
import { Box, TableRow, TableCell } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
//component
import CommonTable from "@components/common/commonTable";
import TextLabel from "@components/common/commonTextLabel";
import { lightTheme } from "@redux/theme";

const Objectives = ({ buyChallengeGet }: any) => {

  const data = [
    {
      id: 1,
      column1: `Minimum ${buyChallengeGet?.minimumTradingDays === undefined
          ? "-"
          : buyChallengeGet?.minimumTradingDays
        } Trading Days`,
      column2: `${buyChallengeGet?.minimumDayObjective?.completedDays === 0
          ? "-"
          : buyChallengeGet?.minimumDayObjective?.completedDays
        } `,
      column3: buyChallengeGet?.minimumDayObjective?.isPassed,
    },
    {
      id: 2,
      column1: `Max Daily Loss - ${buyChallengeGet?.maximumDayLoss === undefined
          ? ""
          : buyChallengeGet?.maximumDayLoss
        } ${buyChallengeGet?.tradingAccounts?.currencyCode === undefined
          ? ""
          : buyChallengeGet?.tradingAccounts?.currencyCode
        }`,
      resultAmount: `${buyChallengeGet?.maxDailyLossObjective?.value === undefined
          ? "0"
          : buyChallengeGet?.maxDailyLossObjective?.value
        }`,
      column2: `
      ${buyChallengeGet?.tradingAccounts?.currencyCode === undefined
          ? ""
          : buyChallengeGet?.tradingAccounts?.currencyCode
        } ${buyChallengeGet?.maxDailyLossObjective?.percentage === undefined
          ? ""
          : `(${buyChallengeGet?.maxDailyLossObjective?.percentage}%)`
        } `,
      column3: buyChallengeGet?.maxDailyLossObjective?.isPassed,
    },
    {
      id: 3,
      column1: `Max Loss - ${buyChallengeGet?.maximumLoss === undefined
          ? ""
          : buyChallengeGet?.maximumLoss
        } ${buyChallengeGet?.tradingAccounts?.currencyCode === undefined
          ? ""
          : buyChallengeGet?.tradingAccounts?.currencyCode
        }`,
      resultAmount: `${buyChallengeGet?.maxLossObjective?.value === undefined
          ? "-"
          : buyChallengeGet?.maxLossObjective?.value
        }`,
      column2: ` ${buyChallengeGet?.tradingAccounts?.currencyCode === undefined
          ? ""
          : buyChallengeGet?.tradingAccounts?.currencyCode
        }  ${buyChallengeGet?.maxLossObjective?.percentage === undefined
          ? ""
          : `(${buyChallengeGet?.maxLossObjective?.percentage}%)`
        } `,
      column3: buyChallengeGet?.maxLossObjective?.isPassed,
    },
    {
        id: 4, column1: `Profit Target ${buyChallengeGet?.profitTarget} ${buyChallengeGet?.tradingAccounts?.currencyCode}`,
        column2: `${buyChallengeGet?.profitObjective?.value} ${buyChallengeGet?.tradingAccounts?.currencyCode} (${buyChallengeGet?.profitObjective?.percentage}%)`, column3: buyChallengeGet?.profitObjective?.isPassed
    }
  ];
  return (
    <>
      <TextLabel fontWeight="600" variant="h6" title="Objectives" />
      <Box sx={{ marginTop: { sm: "10px", xs: "12px" }, overflowX: "auto" }}>
        <CommonTable minWidth={"400px"} title={"Objectives"}
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
                    <TableCell colSpan={!row.hiddenSecond ? 1 : 2}>
                      {row.column1 || "-"}
                    </TableCell>
                    <TableCell
                      sx={{ display: "flex", alignItems: "center", gap: "2px" }}
                    >
                      <TextLabel
                        fontWeight="500"
                        color={
                          row.resultAmount == 0
                            ? "#000000DE"
                            : row.resultAmount > 0
                              ? lightTheme.palette.bgDefultGreen.main
                              : lightTheme.palette.defultError.main
                        }
                        variant="body1"
                        title={row.resultAmount}
                      />
                      {row.column2 || "-"}
                    </TableCell>
                    <TableCell>
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

      {/* {
                DotPointChallengeData.map((item, i) => (
                    <Box style={{ display: 'flex', borderRadius: '10px', margin: '10px', overflow: 'hidden' }}>
                        <Box style={{ width: '50%', padding: '10px', backgroundColor: '#e4f3ff', paddingLeft: '30px' }}><Typography style={{ fontWeight: `${i === 0 ? '700' : '400'}` }}>{item.TradingObjectives}</Typography></Box>
                        <Box style={{ width: '50%', padding: '10px', backgroundColor: '#cfe7fa', paddingLeft: '30px' }}><Typography style={{ fontWeight: `${i === 0 ? '700' : '400'}` }}>{item.Results}</Typography></Box>
                        <Box style={{ width: '50%', padding: '10px', backgroundColor: '#e4f3ff', paddingLeft: '30px' }}><Typography style={{ fontWeight: `${i === 0 ? '700' : '400'}` }}>{item.Summary}</Typography></Box>
                    </Box>
                ))
            } */}
      {/* <Dashboard /> */}
    </>
  );
};

export default Objectives;
