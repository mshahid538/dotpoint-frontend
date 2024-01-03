import React from "react";
import PaperContainer from "@components/common/PaperContainer";
import { Divider, Box, Grid, Button } from "@mui/material";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import TextLabel from "@components/common/commonTextLabel";
import { lightTheme } from "@redux/theme";
import Assets from "@components/common/image_container";
import { useRouter } from "next/router";

const billingDetails = [
  {
    description: "Profit split up to 80% with our Dot Point Account",
  },
  {
    description: "Trading analysis provided to improve your performance",
  },
  {
    description: "Full fee refund once successfully proved your skills by completing the challenge",
  },
  {
    description: "Trading analysis provided to improve your performance",
  },
 
];
const BillingCard = () => {
  const router = useRouter()
  return (
    <>
      <PaperContainer

        bodyPadding="28px"
        color="#ffffff"
        backgroundColor="#0781fe"
        sx={{ marginBottom: "28px", textAlign: "center" }}
      >
        <Grid container >
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <Box textAlign={"center"}>
              <Assets src={"/assets/images/alert_billing.svg"} absolutePath={true} style={{ height: "42px", width: "42px", marginBottom: '12px' }} />
              <TextLabel
                variant="h4"
                fontWeight="600"
                textAlign="center"
                margin="10px 0px"
                color={lightTheme.palette.bgWhite.main}
                title={"READY TO BECOME THE Dot Point TRADER?"}
              />
              <Assets
                src={"/assets/images/billing.jpeg"}
                absolutePath={true}
                style={{
                  height: "auto",
                  width: "100%",
                  maxHeight: "700px",
                  maxWidth: "700px",
                  margin: "20px 0px",
                }}
              />
              <TextLabel
                variant="h6"
                fontWeight="500"
                textAlign="center"
                margin="10px 0px"
                color={lightTheme.palette.bgWhite.main}
                title={"Trade Dot Point Account up to "}
                secondText={"US$200,000"}
                secondTextColor="#f8c600"
              />
            </Box>
          </Grid>

          <Grid item xs={12} mx={"auto"} display={'flex'} mt={2} mb={2} justifyContent={'center'}>

            <Grid container spacing={1} xs={1} md={1} lg={1} xl={1}></Grid>
            <Grid container spacing={1} xs={10} md={10} lg={6} xl={5}>
              {billingDetails?.length > 0 &&
                billingDetails?.map((e: any, i: any) => {
                  return (
                    <Grid item sm={6} xs={12} key={i} mx={"auto"} textAlign={"center"}>
                      <TextLabel
                        isIconStart={true}
                        variant="body1"
                        fontSize="16px"
                        margin="10px 0px"
                        color={lightTheme.palette.bgWhite.main}
                        title={e.description}
                        icon={
                          <TaskAltOutlinedIcon
                            sx={{
                              color: lightTheme.palette.bgDefultGreen.main,
                              verticalAlign: "middle",
                              marginRight: "12px",
                            }}
                          />
                        }
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>

          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <Box textAlign={"center"} mb={1} mt={1}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: lightTheme.palette.bgDarkBlack.main,
                  color: lightTheme.palette.bgWhite.main,
                }}
                onClick={() => router.push('/new-challenge')}
              >
                Accept Dot Point Challenge
              </Button>
            </Box>
          </Grid>
        </Grid>
      </PaperContainer>
    </>
  );
};

export default BillingCard;
