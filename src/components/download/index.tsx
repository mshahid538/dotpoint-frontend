import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AppleIcon from "@mui/icons-material/Apple";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AlertBox from "@components/common/alertBox";

const Download = () => {
  return (
    <>
      
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mb={3} fontWeight={500} fontSize={18}>
              Downloads
            </Typography>
          </Grid>
        </Grid>
        <AlertBox
          img={"ThumbUpOutlinedIcon"}
          description={`EAs and Indicators are available for download for traders who
                had at least one paid Dot Point Challenge in the past. <span style="text-decoration:underline;">Accept our
                Dot Point Challenge</span> and enjoy our Dot Point Indicators`}
          backgroundColor={"#d8e4f6"}
          borderColor={"#3984ff"}
        />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mb={3} fontWeight={500} fontSize={18}>
              Platforms
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              sx={{
                marginBottom: "12px",
                boxShadow:
                  "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0), 0px 1px 8px 0px rgba(0,0,0,0.12)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ flexShrink: "0" }}>
                  <AccountBalanceIcon
                    sx={{ fontSize: "48px", color: "#535456" }}
                  />
                </Box>
                <Box sx={{ flexGrow: "1" }}>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Typography fontWeight={700} fontSize={22}>
                      MetaTrader
                    </Typography>
                    <Typography
                      fontSize={24}
                      fontWeight={700}
                      color={"primary"}
                    >
                      4
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginLeft: "auto" }}>
                  <AppleIcon sx={{ fontSize: "40px", color: "#565b6c" }} />
                  <MicrosoftIcon sx={{ fontSize: "40px", color: "#565b6c" }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography mb={3} fontWeight={500} fontSize={18}>
              Others
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              sx={{
                marginBottom: "12px",
                boxShadow:
                  "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0), 0px 1px 8px 0px rgba(0,0,0,0.12)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ flexShrink: "0" }}>
                  <InsertDriveFileIcon
                    sx={{ fontSize: "48px", color: "#535456" }}
                  />
                </Box>
                <Box sx={{ flexGrow: "1" }}>
                  <Typography
                    fontWeight={600}
                    fontSize={17}
                    sx={{ color: "#404143" }}
                  >
                    TMO Background 1920x1080px (ZIP)
                  </Typography>
                </Box>
                <Box sx={{ marginLeft: "auto" }}>
                  <FileDownloadOutlinedIcon
                    sx={{ fontSize: "40px", color: "#565b6c" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </>
  );
};

export default Download;
