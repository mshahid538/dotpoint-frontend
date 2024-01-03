import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";

interface AlertProps {
  img?: string;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
}

const AlertBox = ({
  img,
  description,
  backgroundColor,
  borderColor,
}: AlertProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12}>
          <Box
            p={4}
            mb={3}
            border={`3px solid ${borderColor}`}
            borderRadius={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            // marginTop={"25PX"}
            sx={{ backgroundColor: `${backgroundColor}` }}
          >
            <Box
              width={60}
              height={60}
              mb={3}
              borderRadius={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ backgroundColor: `${borderColor}` }}
            >
              {img === "ThumbUpOutlinedIcon" ? (
                <ThumbUpOutlinedIcon sx={{ fontSize: "34px", color: "#fff" }} />
              ) : img === "FeedbackOutlinedIcon" ? (
                <img src="/assets/images/billing.svg" />
              ) : (
                <FeedbackOutlinedIcon
                  sx={{ fontSize: "34px", color: "#fff" }}
                />
              )}
            </Box>
            <div
              style={{ textAlign: "center", fontWeight: 400 }}
              dangerouslySetInnerHTML={{ __html: description } as any}
            ></div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AlertBox;
