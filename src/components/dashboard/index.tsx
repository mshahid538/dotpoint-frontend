import React, { useEffect, useState } from "react";
import { Grid, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChartComponent from "@components/chart";
import DailySummary from "@components/dailySummary";
import PaperContainerWithColor from "@components/common/paperContainerWithColor";
import TextLabel from "@components/common/commonTextLabel";
import TradingJournal from "@components/tradingJournal";
import PaperContainer from "@components/common/PaperContainer";
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import MUIButton from "@components/common/commonButton";
import MUIAlert from "@components/common/commonAlertBox";
import FooterContent from "@components/common/footerContent";
import CommonTable from "@components/common/commonTable";
import { useDispatch } from "react-redux";
import { buy_challenge, dot_point_challenge, get_historical, get_history, get_history_day_wise } from "@redux/Redux/Actions";
import usePageLoader from "@redux/hooks/usePageLoader";
import { useRouter } from "next/router";
import moment from "moment";
import { numberWithCommas } from "@lib/stringAvatar";

const useStyles = makeStyles()((theme) => {
  return {
    grayText: {
      backgroundColor: '#eeeeee',
    },
    login: {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
    },
    pointInfo: {
      padding: " 20px 20px",
      borderBottom: " 1px solid #E1E1E1",
      fontSize: "14px",
      fontWeight: 600,
    },
    noBorderBottom: {
      borderBottom: "none",
    },
    subTextStyle: {
      fontSize: "14px",
      fontWeight: 500,
    },
    objectiveTableBoxStyle: {
      [theme.breakpoints.between(900, 950)]: {
        minHeight: '45px',
      },
      [theme.breakpoints.between(490, 715)]: {
        minHeight: '45px',
      },
      [theme.breakpoints.down(490)]: {
        minHeight: '70px',
      },
    },
    objectiveBoxTextHide: {
      [theme.breakpoints.down(490)]: {
        overflow: 'hidden',
        wordBreak: "break-all",
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
      },
    },
    challangeTableBox: {
      [theme.breakpoints.down(360)]: {
        minHeight: '45px',
      },
    },
    statisticsTableBox: {
      [theme.breakpoints.down(390)]: {
        minHeight: '65px',
      },
    },
  };
});




function Dashboard() {
  //Hooks
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const router = useRouter()
  const { challengeUserId, accountId } = router.query
  const setFullPageLoader = usePageLoader();

  //States
  const [buyChallengeGet, setBuyChallengeGet] = useState<any>()
  const [historyData, setHistoryData] = useState<any>({})

  const data = [
    { id: 1, column1: `Minimum ${buyChallengeGet?.minimumTradingDays} Trading Days`, column2: `${buyChallengeGet?.minimumDayObjective?.completedDays} days`, column3: buyChallengeGet?.minimumDayObjective?.isPassed},
    { id: 2, column1: `Max Daily Loss - ${buyChallengeGet?.maximumDayLoss} ${buyChallengeGet?.tradingAccounts?.currencyCode}`, column2: `${buyChallengeGet?.maxDailyLossObjective?.value} ${buyChallengeGet?.tradingAccounts?.currencyCode} (${buyChallengeGet?.maxDailyLossObjective?.percentage}%)`, column3: buyChallengeGet?.maxDailyLossObjective?.isPassed },
    { id: 3, column1: `Max Loss - ${buyChallengeGet?.maximumLoss} ${buyChallengeGet?.tradingAccounts?.currencyCode}`, column2: `${buyChallengeGet?.maxLossObjective?.value} ${buyChallengeGet?.tradingAccounts?.currencyCode} (${buyChallengeGet?.maxLossObjective?.percentage}%)`, column3: buyChallengeGet?.maxLossObjective?.isPassed },
    { id: 4, column1: `Profit Target ${buyChallengeGet?.profitTarget} ${buyChallengeGet?.tradingAccounts?.currencyCode}`,  column2: `${buyChallengeGet?.profitObjective?.value} ${buyChallengeGet?.tradingAccounts?.currencyCode} (${buyChallengeGet?.profitObjective?.percentage}%)`, column3: buyChallengeGet?.profitObjective?.isPassed }
  ];

  const pointListitems = [
    { title: "Equity", subText: `${buyChallengeGet?.accountBalance}` },
    { title: "Balance", subText: `${buyChallengeGet?.currentBalance}` },
    { title: "No. of trades", subText: `${buyChallengeGet?.noOfTrades}` },
    { title: "Lots", subText: `${buyChallengeGet?.lots}` },
    { title: "Win rate", subText: `${buyChallengeGet?.winRate}%` },
    {
      title: "Sharpe Ratio",
      subText: `${buyChallengeGet?.sharpeRatio}`,
      icon: (
        <InfoOutlinedIcon
          sx={{
            verticalAlign: "middle",
            marginRight: "8px",
            fontSize: "18px",
          }}
        />
      ),
    },
  ];
  
  const pointListitems2 = [
    {
      title: "Average profit",
      subText: `${buyChallengeGet?.averageProfit}`,
    },
    {
      title: "Average loss",
      subText: `${buyChallengeGet?.averageLoss}`,
    },
    {
      title: "Average RRR",
      subText: `${buyChallengeGet?.averageRRR}`,
      isIconEnd: true,
      icon: (
        <InfoOutlinedIcon
          sx={{
            verticalAlign: "middle",
            marginRight: "8px",
            fontSize: "18px",
          }}
        />
      ),
    },
    {
      title: "Expectancy",
      subText: `${buyChallengeGet?.expectancy}`,
      isIconEnd: true,
      icon: (
        <InfoOutlinedIcon
          sx={{
            verticalAlign: "middle",
            marginRight: "8px",
            fontSize: "18px",
          }}
        />
      ),
    },
    {
      title: "Profit factor",
      subText: `${buyChallengeGet?.profitFactor}`,
      isIconEnd: true,
      icon: (
        <InfoOutlinedIcon
          sx={{
            verticalAlign: "middle",
            marginRight: "8px",
            fontSize: "18px",
          }}
        />
      ),
    },
  ];
  
  const challengeData = [
    { id: 1, column1: 'status', column2: 'Ended' },
    { id: 2, column1: 'Start', column2: moment(buyChallengeGet?.createdAt).format('DD-MM-YYYY') },
    { id: 3, column1: 'End', column2: moment(buyChallengeGet?.endChallengeDate).format('DD-MM-YYYY') },
    { id: 4, column1: 'Account Size', column2: numberWithCommas(buyChallengeGet?.accountBalance) },
    { id: 5, column1: 'Account Type', column2: buyChallengeGet?.serverDetail },
    {
      id: 6, column1: `Platfrom (${buyChallengeGet?.serverDetail})`, column2: <a href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader5.com&utm_campaign=download" target="_blank" style={{ textDecoration: 'none' }}>
        <TextLabel textDecoration="underline" fontWeight="400" variant='body1' title="Download" color="#0099CB" />
      </a>
    },
    // { id: 7, column1: 'Last Updated', column2: '0.00 CAD (0.00%)' },
  ];
  useEffect(() => {
    if (challengeUserId) {
      (async () => {
        try {
          const res = await dispatch(dot_point_challenge(`/${challengeUserId}`));
          if (res?.payload?.status === 200) {
            setFullPageLoader(true)
            setBuyChallengeGet(res?.payload?.data);
            setFullPageLoader(false)
          }else{
            setFullPageLoader(false)
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      })();
    }
  }, [challengeUserId])

  useEffect(() => {
    if (buyChallengeGet?.endChallengeDate) {
      (async () => {
        const body = {
          "accountId": accountId,
          "startDate":moment(buyChallengeGet?.createdAt).format('YYYY-MM-DD'),
          "endDate": moment(buyChallengeGet?.endChallengeDate).format('YYYY-MM-DD'),
          "challengeUserId": challengeUserId
        }
        try {
          const res = await dispatch(get_historical(body));
          const res2 = await dispatch(get_history(body));
          const res3 = await dispatch(get_history_day_wise(body));
          if (res?.payload?.status === 200) {
            setFullPageLoader(true)
            setHistoryData({
              ...historyData,
              currentResultData: res?.payload?.data,
              tradingJournalData: res2?.payload?.data,
              dayWiseData: res3?.payload?.data,
            });
            setFullPageLoader(false)
          }else{
            setFullPageLoader(false)
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      })();
    }
  }, [buyChallengeGet?.endChallengeDate])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <PaperContainer
            title={"Current Results"}
          >
            <ChartComponent  />
          </PaperContainer>
        </Grid>
        <Grid item md={6} xs={12}>
          <CommonTable
            title={`Dot Point Challenge ${buyChallengeGet?.login}`}
            // tableHeader={
            //   <TableRow>
            //     <TableCell>Trading Objectives</TableCell>
            //     <TableCell className={classes.grayText}>Results</TableCell>

            //   </TableRow>
            // }
            tableBody={
              <>
                {challengeData.map((row, index: any) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: "500" }}>{row.column1}</TableCell>
                    <TableCell className={classes.grayText}>{row.column2}</TableCell>
                  </TableRow>
                ))}
              </>
            }
          />
          {/* <PaperContainerWithColor
            title="Dot Point Challenge 1091208639"
            children1={listsData.map((title, index) => (
              <Box
                key={index}
                overflow={"hidden"}
                className={`${classes.pointInfo} ${index === listsData.length - 1 ? classes.noBorderBottom : ""
                  } ${classes.challangeTableBox}`}
              >
                <TextLabel fontWeight={500} fontSize={"14px"} title={title} />
              </Box>
            ))}
            children2={listsData2.map((item, index) => (
              <Box
                key={index}
                overflow={"hidden"}
                className={`${classes.pointInfo} ${index === listsData2.length - 1 ? classes.noBorderBottom : ""
                  } ${classes.challangeTableBox}`}
              >
                <TextLabel
                  fontWeight={500}
                  fontSize={"14px"}
                  title={item.title}
                  textAlign={item.textAlign}
                  isIconStart={item.isIconStart}
                  icon={
                    item.isIconStart && (
                      <AccessAlarmIcon
                        sx={{
                          verticalAlign: "middle",
                          marginRight: "8px",
                          fontSize: "18px",
                        }}
                      />
                    )
                  }
                  style={{
                    color: item.title === "Download" ? "#0099CB" : "#000000",
                    textDecoration:
                      item.title === "Download" ? "underline" : null,
                  }}
                />
              </Box>
            ))}
          /> */}
        </Grid>
        <Grid item md={12} xs={12}>
          <PaperContainer
            title={"Consistency Score"}
            isIconEnd={true}
            bodyPadding="0px"
          >
            <Grid>
              <Box sx={{ display: "flex", padding: "70px 20px", paddingBottom: "0px" }}>
                <Box sx={{ width: "30%", height: "36px", bgcolor: '#FF9AA4' }}></Box>
                <Box sx={{ width: "55%", height: "36px", bgcolor: '#FFE380' }}></Box>
                <Box sx={{ width: "15%", height: "36px", bgcolor: '#91D14F82' }}></Box>
              </Box>
              <Box sx={{ display: "flex", padding: "10px 20px 55px 20px" }}>
                <TextLabel variant={"body2"} textAlign={"center"} width={"30%"} title={"0-30%"} />
                <TextLabel variant={"body2"} textAlign={"center"} width={"55%"} title={"30-80%"} />
                <TextLabel variant={"body2"} textAlign={"center"} width={"15%"} title={"80-100%"} />
              </Box>
            </Grid>
          </PaperContainer>
        </Grid>
        <Grid item md={12} xs={12}>
          <CommonTable
            title={"Objectives"}
            tableHeader={
              <TableRow>
                <TableCell>Trading Objectives</TableCell>
                <TableCell className={classes.grayText}>Results</TableCell>
                <TableCell>Summary</TableCell>
              </TableRow>
            }
            tableBody={
              <>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontWeight: "600", color: "rgb(0, 153, 203)" }}>{row.column1}</TableCell>
                    <TableCell className={classes.grayText}>{row.column2}</TableCell>
                    <TableCell>
                      <TextLabel
                        fontSize={"14px"}
                        title={row.column3 ? "Passed":"Not passing"}
                        className={classes.objectiveBoxTextHide}
                        isIconStart={true}
                        icon={row.column3 ?
                          <CheckBoxRoundedIcon sx={{ color: "#91D14F", verticalAlign: 'middle', fontSize: "22px", marginRight: "5px" }} />
                          :
                          <DisabledByDefaultRoundedIcon sx={{ color: "#F14336", verticalAlign: 'middle', fontSize: "22px", marginRight: "5px" }} />
                        }
                        // icon={row.column3 === "Passed" ?
                        //   <CheckRoundedIcon sx={{ color: "#fff", verticalAlign: 'middle', fontSize: "22px", marginRight: "5px", backgroundColor: "#91D14F", borderRadius: "6px", padding: "2px" }} />
                        //   :
                        //   <CloseOutlinedIcon sx={{ color: "#fff", verticalAlign: 'middle', fontSize: "22px", marginRight: "5px", backgroundColor: "#ff0000", borderRadius: "6px", padding: "2px" }} />
                        // }
                      />
                    </TableCell>

                  </TableRow>
                ))}
              </>
            }
          />
          {/* <PaperContainerWithColor
            title="Objectives"
            gridNum={4}
            children1={tradingObjectives.map((title, index) => (
              <Box
                key={index}
                overflow={"hidden"}
                className={`${classes.pointInfo} ${index === tradingObjectives.length - 1 ? classes.noBorderBottom : ""
                  } ${classes.objectiveTableBoxStyle}`}
              >
                <TextLabel fontWeight={index === 0 ? 600 : 500} fontSize={"14px"} title={title} className={classes.objectiveBoxTextHide}
                  style={{
                    color: title != "Trading Objectives" ? "#0099CB" : "#000000",
                  }}
                />
              </Box>
            ))}
            children2={Results.map((item, index) => (
              <Box
                key={index}
                overflow={"hidden"}
                className={`${classes.pointInfo} ${index === Results.length - 1 ? classes.noBorderBottom : ""
                  } ${classes.objectiveTableBoxStyle}`}
              >
                <TextLabel
                  fontWeight={index === 0 ? 600 : 500}
                  fontSize={"14px"}
                  title={item.title}
                  textAlign={item.textAlign}
                  className={classes.objectiveBoxTextHide}
                />
              </Box>
            ))}
            children3={Summary.map((item, index) => (
              <Box
                key={index}
                overflow={"hidden"}
                className={`${classes.pointInfo} ${index === Summary.length - 1 ? classes.noBorderBottom : ""
                  } ${classes.objectiveTableBoxStyle}`}
              >
                <TextLabel
                  fontWeight={index === 0 ? 600 : 500}
                  fontSize={"14px"}
                  title={item.title}
                  textAlign={item.textAlign}
                  className={classes.objectiveBoxTextHide}
                  style={{
                    color: item.title === "Download" ? "#0099CB" : "#000000",
                    textDecoration:
                      item.title === "Download" ? "underline" : null,
                  }}
                  isIconStart={item.isIcon}
                  icon={item.title === "Passed" ?
                    <CheckBoxRoundedIcon sx={{ color: "#91D14F", verticalAlign: 'middle', fontSize: "22px", marginRight: "5px" }} />
                    :
                    <DisabledByDefaultRoundedIcon sx={{ color: "#F14336", verticalAlign: 'middle', fontSize: "22px", marginRight: "5px" }} />
                  }
                // icon={item.title === "Passed" ?
                //   <CheckRoundedIcon sx={{ color: "#fff", verticalAlign: 'middle', fontSize: "22px", marginRight: "5px", backgroundColor: "#91D14F", borderRadius: "6px", padding: "2px" }} />
                //   :
                //   <CloseOutlinedIcon sx={{ color: "#fff", verticalAlign: 'middle', fontSize: "22px", marginRight: "5px", backgroundColor: "#ff0000", borderRadius: "6px", padding: "2px" }} />
                // }
                />
              </Box>
            ))}
          /> */}
        </Grid>
        <Grid item md={6} xs={12}>
          <PaperContainerWithColor
            title="Statistics"
            children1={pointListitems.map((item, index) => (
              <Box
                overflow={"hidden"}
                key={index}
                className={`${classes.pointInfo} ${index === pointListitems.length - 1
                  ? classes.noBorderBottom
                  : ""
                  } ${classes.statisticsTableBox}`}
              >
                <TextLabel
                  fontWeight={600}
                  fontSize="14px"
                  title={item.title}
                  subText={item.subText}
                  subTextStyle={classes.subTextStyle}
                  icon={item.icon}
                  isIconEnd={true}
                />
              </Box>
            ))}
            children2={pointListitems2.map((item, i) => (
              <Box
                key={i}
                overflow={"hidden"}
                className={`${classes.pointInfo} ${i === pointListitems2.length - 1 ? classes.noBorderBottom : ""
                  } ${classes.statisticsTableBox}`}
              >
                <TextLabel
                  fontWeight={600}
                  fontSize="14px"
                  title={item.title}
                  subText={item.subText}
                  subTextStyle={classes.subTextStyle}
                  isIconEnd={true}
                  icon={item.icon}
                  textColor={i === 0 ? '#91D14F' : i === 1 ? '#ff0000' : '#333'}
                ></TextLabel>
              </Box>
            ))}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <DailySummary data={historyData?.dayWiseData} />
        </Grid>
        <Grid item xs={12}>
          <TradingJournal data={historyData?.tradingJournalData} />
        </Grid>
        <Grid item xs={12} >
          <MUIAlert icon={false} variant="outlined" severity="success" description="THE DISPLAYED RESULTS ARE AUTOMATICALLY UPDATED EVERY 10 MINUTES WHENEVER YOU HAVE ACTIVE TRADE(S). IN CASE OF ANY ERRORS,  PLEASE CONTACT US AT Support@Dotpoint.com. TRADING RESULTS IN THIS Statistics ARE INFORMATIVE ONLY. REAL-TIME TRADING VALUES CAN BE SEEN IN THE TRADING PLATFORM." />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <MUIButton
              type="submit"
              // disabled={isSubmitting}
              fullWidth={true}
              height="42px"
              width="40%"
              text="Save"
              marginTop={8}
            />
          </Box>
        </Grid>
      </Grid>
      <FooterContent />
    </>
  );
}

export default Dashboard;
