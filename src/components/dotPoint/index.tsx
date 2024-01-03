import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, CardContent, Grid } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PaperContainer from "@components/common/PaperContainer";
import TextLabel from "@components/common/commonTextLabel";

const useStyles = makeStyles()((theme) => {
  return {
    pointInfo: {
      padding: " 20px 0px",
      borderBottom: " 1px solid #E1E1E1",
      fontSize: "14px",
      fontWeight: 600,
    },
    lastTypography: {
      paddingBottom: "0",
      borderBottom: "none",
    },
    subText:{
      fontSize: "18px",
      fontWeight: 600,
    }
  };
});

const DotPointChallenge = (props: any) => {
  const { classes } = useStyles();
  const {
    status,
    startDate,
    endDate,
    accountSize,
    accountType,
    platform,
    lastUpdated,
    ended,
    date1,
    date2,
    amount,
    type,
    downloadText,
    lastDate,
    isStatistic,
  } = props;
  return (
    <>
      <PaperContainer
        title={"Dot Point Challenge 1091208639"}
        bodyPadding="0px"
      >
        <Grid container>
          <Grid xs={6}>
            <CardContent sx={{ p: "0 0 0 16px" }}>
              <Box textAlign={"start"}>
                <TextLabel
                  className={`${classes.pointInfo} ${classes.subText}`}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={status}
                  subText={'abc'}
                  isStatistic
                  subTextStyle={classes.subText}
                />
                <TextLabel
                  className={classes.pointInfo}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={startDate}
                  subText={'abc'}
                  subTextStyle={classes.subText}
                  textColor="#cfcfcf"
                />
                <TextLabel
                  className={classes.pointInfo}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={endDate}
                />
                <TextLabel
                  className={classes.pointInfo}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={accountSize}
                />
                <TextLabel
                  className={classes.pointInfo}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={accountType}
                />
                <TextLabel
                  className={classes.pointInfo}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={platform}
                />
                <TextLabel
                   className={`${classes.pointInfo} ${classes.lastTypography}`}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={lastUpdated}
                />
              </Box>
            </CardContent>
          </Grid>
          <Grid xs={6} sx={{ backgroundColor: "#EEEEEE" }}>
            <CardContent sx={{ p: "0 16px 0 0" }}>
              <Box textAlign={"end"}>
                <TextLabel
                  className={classes.pointInfo}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={ended}
                  textAlign="end"
                />
                  <TextLabel
                  className={classes.pointInfo}
                  textAlign="end"
                  fontWeight={600}
                  fontSize={"14px"}
                  isIconStart={true}
                  title={date1}
                  icon={<AccessAlarmIcon
                    sx={{
                      verticalAlign: "middle",
                      marginRight: "8px",
                      fontSize: "18px",
                    }}
                  />}
                />
                  <TextLabel
                  className={classes.pointInfo}
                  textAlign="end"
                  fontWeight={600}
                  fontSize={"14px"}
                  isIconStart={true}
                  title={date2}
                  icon={<AccessAlarmIcon
                    sx={{
                      verticalAlign: "middle",
                      marginRight: "8px",
                      fontSize: "18px",
                    }}
                  />}
                />
                <TextLabel
                  className={classes.pointInfo}
                  fontWeight={600}
                  fontSize={"14px"}
                  title={amount}
                  textAlign="end"
                />
                <TextLabel
                  className={classes.pointInfo}
                  fontWeight={600}
                  fontSize={"14px"}
                  textAlign="end"
                  title={type}
                />
                <TextLabel
                  className={classes.pointInfo}
                  textAlign="end"
                  fontWeight={600}
                  fontSize={"14px"}
                  color="#0099CB"
                  title={downloadText}
                  textDecoration={'underline'}
                />

                <TextLabel
                  className={`${classes.pointInfo} ${classes.lastTypography}`}
                  textAlign="end"
                  fontWeight={600}
                  fontSize={"14px"}
                  isIconStart={true}
                  title={lastDate}
                  icon={<AccessAlarmIcon
                    sx={{
                      verticalAlign: "middle",
                      marginRight: "8px",
                      fontSize: "18px",
                    }}
                  />}
                />
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </PaperContainer>
    </>
  );
};

export default DotPointChallenge;
