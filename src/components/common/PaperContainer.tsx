import React from "react";
import { Divider, Box } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Paper, { PaperProps } from "@mui/material/Paper";
import CommonComponentProps from "@customTypes/commonComponentProps";
import TextLabel from "./commonTextLabel";
type PaperContainerProps = CommonComponentProps & PaperProps;
const useStyles = makeStyles()((theme) => {
  return {

  };
});
export default function PaperContainer({
  children,
  sx,
  padding,
  margin,
  title,
  mainTitle,
  subdes,
  bodyPadding,
  textAlign,
  height,
  isIconEnd,
  isIconStart,
  icon,
  color,
  backgroundColor,
  tabContent,
  borderRadius,
  mainTitleWeight,
  fontSize,
  ...other
}: any) {
  const { classes } = useStyles();
  const hasTitle = title || mainTitle;
  return (
    <Paper
      elevation={0}
      sx={{
        ...sx,
        backgroundColor: backgroundColor || "#fff",
        boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
        border: {
          md: "1px solid #DEE2E6",
        },
        height: height || "auto",
        borderRadius: borderRadius || "15px",
        color: color || "#000",
        padding: padding ? padding : { sm: "18px 30px", xs: "15px 12px" },
        // margin: margin || "24px 0"
      }}
      {...other}
    >
      {hasTitle && (
        <>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'} gap={0.1}
          // borderBottom={1}
          // borderColor={"#DEE2E6"}
          >
            <Box sx={{ marginBottom: "10px" }}>
              <TextLabel fontWeight={mainTitleWeight || "600"} fontSize={fontSize} variant={"h6"} title={mainTitle} />
              <TextLabel fontWeight="600" variant={"subtitle2"} title={title} isIconStart={isIconStart} isIconEnd={isIconEnd} icon={icon} />
              <TextLabel variant={"subtitle2"} title={subdes} />
            </Box>
            {tabContent}
          </Box>
        </>
      )}
      {/* {hasTitle && <Divider />} */}
      <Box sx={{ textAlign: textAlign || "left", }}>{children}</Box>
    </Paper>
  );
}