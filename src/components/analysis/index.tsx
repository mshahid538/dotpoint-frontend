import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Basic from "./Basic";
import LongShort from "./LongShort";
import {
  basicAnalytic,
  dayWiseAnalyticIncremental,
  dot_point_challenge,
  getResultByTradeDuration,
  get_historical,
  resultByPositionSize,
  tradingSymbolHistory,
} from "@redux/Redux/Actions";
import { useDispatch } from "react-redux";
import usePageLoader from "@redux/hooks/usePageLoader";
import moment from "moment";
import TradingDaysAnalysis from "./TradingDaysAnalysis";
import ResultByPositionSize from "./ResultByPositionSize";
import ResultByTradeDuration from "./ResultByTradeDuration";
import ResultByOpenHour from "./ResultByOpenHour";
import ResultByDay from "./ResultByDay";

import FinalEvaluation from "./FinalEvaluation";

const balanceCurve = [
  {
    name: "Erik",
    data: [3, 6, 1, 2, 6],
  },
  {
    name: "Gert",
    data: [5, 6, 4, 2, 1],
  },
  {
    name: "Helge",
    data: [2, 6, 5, 2, 3],
  },
  {
    name: "Torstein",
    data: [5, 2, 7, 4, 2],
  },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const chartTabDetails = [
  {
    id: "1",
    name: "Basic",
  },
  {
    id: "2",
    name: "Long/Short comparison",
  },
  {
    id: "3",
    name: "Result by Days",
  },
  {
    id: "4",
    name: "Trading Days Analysis",
  },
  {
    id: "5",
    name: "Result by Position Size",
  },
  {
    id: "6",
    name: "Result by Trade Duration",
  },
  {
    id: "7",
    name: "Result by Open Hour",
  },
  {
    id: "8",
    name: "Final Evaluation",
  },
];

const Index = ({ accountId, challengeUserId, analysisModal }: any) => {
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();

  const [tab, setTab] = useState("1");
  const [currentResultData, setCurrentResultData] = useState<any>({});
  const [tabName, setTabName] = useState(chartTabDetails[0].name);
  const [buyChallengeGet, setBuyChallengeGet] = useState<any>();

  useEffect(() => {
    if (challengeUserId) {
      (async () => {
        try {
          const res = await dispatch(
            dot_point_challenge(`/${challengeUserId}`)
          );
          if (res?.payload?.status === 200) {
            setFullPageLoader(true);
            setBuyChallengeGet(res?.payload?.data);
            setFullPageLoader(false);
          } else {
            setFullPageLoader(false);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      })();
    }
  }, [challengeUserId]);

  useEffect(() => {
    if (buyChallengeGet?.endChallengeDate) {
      (async () => {
        setFullPageLoader(true);
        const body = {
          challengeUserId: challengeUserId,
        };
        const body2 = {
          "accountId": accountId,
          "startDate": moment(buyChallengeGet?.createdAt).format('YYYY-MM-DD'),
          "endDate": moment(buyChallengeGet?.endChallengeDate).format('YYYY-MM-DD'),
          "challengeUserId": challengeUserId
        }
        try {

          const res = await dispatch(basicAnalytic(body));
          const res2 = await dispatch(dayWiseAnalyticIncremental({ challengeUserId: challengeUserId, "filterOption": "currentWeek" }));
          const res4 = await dispatch(dayWiseAnalyticIncremental({ challengeUserId: challengeUserId, "filterOption": "lastRecord" }));
          const res3 = await dispatch(tradingSymbolHistory({ challengeUserId: challengeUserId, "filterOption": "currentWeek" }));
          const res5 = await dispatch(resultByPositionSize(body2));
          const res6 = await dispatch(getResultByTradeDuration(body2));
          const res7 = await dispatch(get_historical(body2));
          if (res?.payload?.status === 200 && res2?.payload?.status === 200) {
            setCurrentResultData({
              ...currentResultData,
              basicData: res?.payload?.data,
              dayWiseAnalyticIncremental: res2?.payload?.data,
              dayWiseAnalyticInstruments: res3?.payload?.data,
              tradingDatsAnalyticIncremental: res4?.payload?.data,
              resultByPosition: res5?.payload?.data,
              resultByTradeDuration: res6?.payload?.data,
              historicalData: res7?.payload?.data,
            });
          } else {
            setFullPageLoader(false);
          }
        } catch (error) {
          setFullPageLoader(false);
          console.error("Login error:", error);
        } finally {
          setFullPageLoader(false);
        }
      })();
    }
  }, [buyChallengeGet?.endChallengeDate]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: { lg: "15px", md: "14px", xs: "8px" },
          flexWrap: "wrap",
          justifyContent: { lg: "start", md: "center", xs: "center" },
          marginBottom: { sm: "24px", xs: "12px" },
        }}
      >
        {chartTabDetails.map((item, i) => (
          <>
            <Button
              key={i}
              size="large"
              variant="contained"
              sx={{
                padding: { md: "14px 22px", sm: "8px 6px", xs: "8px 10px" },
                fontSize: { md: "14px", sm: "13px", xs: "11px" },
                lineHeight: { sm: "18px", xs: "15px" },
                width: { md: "100%", sm: "100%", xs: "auto" },
                minWidth: { md: "220px", sm: "180px", xs: "unset" },
                maxWidth: { md: "220px", sm: "180px", xs: "unset" },
                borderRadius: "50px",
                backgroundColor: `${item.id === tab ? "" : "#FFFFFF"}`,
                color: `${item.id === tab ? "" : "#000000"}`,
                boxShadow: "0 0 10px 0 rgba(0,0,1,.1)",
                "&:hover": {
                  // backgroundColor: `${item.id === tab ? '' : '#FFFFFF'}`,
                  color: `${item.id === tab ? "" : "#fff"}`,
                  boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                },
              }}
              onClick={() => {
                setTab(item.id);
                setTabName(item?.name);
              }}
            >
              {item.name}
            </Button>
          </>
        ))}
      </Box>
      {/* <Grid container spacing={2}>
        {chartTabDetails.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
            <Button
              size="large"
              variant="contained"
              style={{
                width: "100%",
                borderRadius: "100px",
                backgroundColor: `${item.id === tab ? "" : "#FFFFFF"}`,
                color: `${item.id === tab ? "" : "#000000"}`,
              }}
              onClick={() => {
                setTab(item.id);
                setTabName(item?.name);
              }}
            >
              {item.name}
            </Button>
          </Grid>
        ))}
      </Grid> */}
      {tab === "1" ? (
        <Basic
          analysisModal={analysisModal}
          data={currentResultData?.basicData?.trades}
          settings={settings}
          balanceData={currentResultData?.tradingDatsAnalyticIncremental}
          tabName={tabName}
          balanceCurveDataSet={balanceCurve}
          buyChallengeGet={buyChallengeGet}
        />
      ) : tab === "2" ? (
        <LongShort
          analysisModal={analysisModal}
          data={currentResultData?.tradingDatsAnalyticIncremental}
          historicalData={currentResultData?.historicalData}
          settings={settings}
          tabName={tabName}
          balanceCurveDataSet={balanceCurve}
          buyChallengeGet={buyChallengeGet}
        />
      ) : tab === "3" ? (
        <ResultByDay
          analysisModal={analysisModal}
          data={currentResultData?.dayWiseAnalyticIncremental}
          dataInstruments={currentResultData?.dayWiseAnalyticInstruments}
          settings={settings}
          tabName={tabName}
          balanceCurveDataSet={balanceCurve}
          buyChallengeGet={buyChallengeGet}
        />
      ) : tab === "4" ? (
        <TradingDaysAnalysis
          data={[currentResultData?.tradingDatsAnalyticIncremental]}
          settings={settings}
          tabName={tabName}
          balanceCurveDataSet={balanceCurve}
          buyChallengeGet={buyChallengeGet}
        />
      ) : tab === "5" ? (
        <ResultByPositionSize
          data={currentResultData?.resultByPosition}
          settings={settings}
          tabName={tabName}
          balanceCurveDataSet={balanceCurve}
          buyChallengeGet={buyChallengeGet}
        />
      ) : tab === "6" ? (
        <ResultByTradeDuration
          data={currentResultData?.resultByTradeDuration}
          settings={settings}
          tabName={tabName}
          balanceCurveDataSet={balanceCurve}
          buyChallengeGet={buyChallengeGet}
          analysisModal={analysisModal}
        />
      ) : tab === "7" ? (
        <ResultByOpenHour
          data={currentResultData?.resultByTradeDuration}
          settings={settings}
          tabName={tabName}
          balanceCurveDataSet={balanceCurve}
          buyChallengeGet={buyChallengeGet}
          analysisModal={analysisModal}
        />
      ) : tab === "8" ? (
        <FinalEvaluation buyChallengeGet={buyChallengeGet} />
      ) : null}

      {/* {tab === "1" ? (
        <Basic
          data={currentResultData?.basicData?.trades}
          settings={settings}
          tabName={tabName}
          balanceCurveDataSet={balanceCurve}
          buyChallengeGet={buyChallengeGet}
        />
      ) : tab === "2" ? (
        <LongShort
          data={currentResultData}
          settings={settings}
          tabName={tabName}
        />
      ) : tab === "3" ? (
        <LongShort
          data={currentResultData}
          settings={settings}
          tabName={tabName}
        />
      ) : tab === "4" ? (
        <TradingDaysAnalysis
        // data={currentResultData}
        // settings={settings}
        // tabName={tabName}
        />
      ) : tab === "5" ? (
        <ResultPositionSize
        // data={currentResultData}
        // settings={settings}
        // tabName={tabName}
        />
      ) : null} */}
    </Box>
  );
};

export default Index;
