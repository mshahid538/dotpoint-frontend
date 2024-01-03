import React from "react";
//mui
import {
  Box,
  TableRow,
  TableCell,
  Tooltip,
  styled,
  TooltipProps,
  tooltipClasses,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
//component
import TextLabel from "@components/common/commonTextLabel";
import CommonTable from "@components/common/commonTable";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import { lightTheme } from "@redux/theme";

const StatisticsTbl = ({ buyChallengeGet }: any) => {
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#fff",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#fff",
      color: "#333",
      boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
      fontSize: 10,
      padding: "4px 18px",
      borderRadius: "8px",
    },
  }));

  const pointListitems = [
    {
      title: "Equity",
      subText: `${
        buyChallengeGet?.accountBalance === undefined
          ? "0"
          : `${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)} ${numberWithCommas(
              buyChallengeGet?.accountBalance
            )}`
      }`,
      secondTitle: "Average profit",
      secondSubText: `${
        buyChallengeGet?.averageProfit === undefined
          ? "0"
          : `${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)} ${numberWithCommas(
              buyChallengeGet?.averageProfit
            )}`
      }`,
      tooltip: "",
      secondSubTextAmount:buyChallengeGet?.averageProfit
    },
    {
      title: "Balance",
      subText: `${
        buyChallengeGet?.currentBalance === undefined
          ? "-"
          : `${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)} ${numberWithCommas(
              buyChallengeGet?.currentBalance
            )}`
      }`,
      secondTitle: "Average loss",
      secondSubText: `${
        buyChallengeGet?.averageLoss === undefined
          ? "-"
          : `${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)} ${numberWithCommas(
              buyChallengeGet?.averageLoss
            )}`
      }`,
      tooltip: "",
      secondSubTextAmount:buyChallengeGet?.averageLoss
    },
    {
      title: "No. of trades",
      subText: `${
        buyChallengeGet?.noOfTrades === undefined
          ? "-"
          : buyChallengeGet?.noOfTrades
      }`,
      secondTitle: `Average RRR`,
      tooltip: (
        <LightTooltip
          title={
            <Typography fontSize={"12px"}>
              info: <b>Average RRR </b>
            </Typography>
          }
          arrow
        >
          <InfoOutlinedIcon fontSize={"inherit"} />
        </LightTooltip>
      ),
      secondSubText: `${
        buyChallengeGet?.averageRRR === undefined
          ? "-"
          : `${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)} ${numberWithCommas(
              buyChallengeGet?.averageRRR
            )}`
      }`,
      secondSubTextAmount:buyChallengeGet?.averageRRR
    },
    {
      title: "Lots",
      subText: `${
        buyChallengeGet?.lots === undefined ? "-" : buyChallengeGet?.lots
      }`,
      secondTitle: "Expectancy",
      secondSubText: `${
        buyChallengeGet?.expectancy === undefined
          ? "-"
          : `${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)} ${
              buyChallengeGet?.expectancy
            }`
      }`,
      tooltip: "",
      secondSubTextAmount:buyChallengeGet?.expectancy
    },
    {
      title: "Win rate",
      subText: `${
        buyChallengeGet?.winRate === undefined
          ? "-"
          : `${(buyChallengeGet?.winRate).toFixed(2)}%`
      }`,
      secondTitle: "Profit factor",
      secondSubText: `${
        buyChallengeGet?.profitFactor === undefined
          ? "-"
          : `${getSymbol(buyChallengeGet?.tradingAccounts?.currencyCode)} ${numberWithCommas(
              buyChallengeGet?.profitFactor
            )}`
      }`,
      tooltip: (
        <LightTooltip
          title={
            <Typography fontSize={"12px"}>
              info: <b>Profit factor </b>
            </Typography>
          }
          arrow
        >
          <InfoOutlinedIcon fontSize={"inherit"} />
        </LightTooltip>
      ),
      secondSubTextAmount:buyChallengeGet?.profitFactor
    },
    {
      title: "Sharpe Ratio",
      subText: `${
        buyChallengeGet?.winRate === undefined
          ? "-"
          : `${(buyChallengeGet?.winRate).toFixed(2)}%`
      }`,
      titleTooltip: (
        <LightTooltip
          title={
            <Typography fontSize={"12px"}>
              info: <b>Sharpe Ratio </b>
            </Typography>
          }
          arrow
        >
          <InfoOutlinedIcon fontSize={"inherit"} />
        </LightTooltip>
      ),
      hiddenSecond: true,
      secondSubTextAmount:""
    },
  ];

  return (
    <>
      <TextLabel fontWeight="600" variant="h6" title="Statistics" />
      <Box sx={{ marginTop: { sm: "0px", xs: "2px" }, overflowX: "auto" }}>
        <CommonTable
          title={"Statistics"}
          tableBody={
            <>
              {pointListitems.map((row: any, index: number) => {              
                return (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell colSpan={!row.hiddenSecond ? 1 : 2}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "6px",
                            alignItems: "center",
                          }}
                        >
                          <TextLabel
                            fontWeight="700"
                            variant="body1"
                            title={row.title || "-"}
                          />{" "}
                          {row.titleTooltip}
                        </Box>
                        {row.subText || "-"}
                      </TableCell>
                      {!row.hiddenSecond && (
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "6px",
                              alignItems: "center",
                            }}
                          >
                            <TextLabel
                              fontWeight="700"
                              variant="body1"
                              title={row.secondTitle || "-"}
                            />{" "}
                            {row.tooltip}
                          </Box>
                          <TextLabel
                            variant="body1"
                            color={
                              row.secondSubTextAmount == 0
                                ? "#000000DE"
                                : row.secondSubTextAmount > 0
                                ? lightTheme.palette.bgDefultGreen.main
                                : lightTheme.palette.defultError.main
                            }
                            title={row.secondSubText || "0"}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                    {index < pointListitems.length - 1 && (
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
                );
              })}
            </>
          }
        />
      </Box>
    </>
  );
};

export default StatisticsTbl;
