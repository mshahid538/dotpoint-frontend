import {
  Box,
  FormControlLabel,
  Radio,
  RadioProps,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles, withStyles } from "tss-react/mui";
import TextLabel from "./commonTextLabel";
const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
    },
    primaryBox: {
      border: `2px solid #91D14F`,
      borderRadius: 5,
      width: "auto",
      padding: "0px 20px 0px 5px",
      color: "#000000",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    grayBox: {
      border: `2px solid #91D14F`,
      borderRadius: 5,
      width: "auto",
      padding: "0px 20px 0px 5px",
      color: theme?.palette?.bgGray?.main,
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

const CustomRadioBox = ({
  name,
  label,
  value,
  count,
  handleChange,
  num,
  bg,
  disabled,
  labelPlacement,
  marginLeft,
  radioIcon,
  backgroundColor,
  border,
  textColor,
  fontSize,
  fontWeight,
  isIcon,
  padding,
  borderRadius,
}: any) => {
  const { classes } = useStyles();
  return (
    <Box
      className={count == num && true ? classes?.primaryBox : classes?.grayBox}
      style={{
        backgroundColor:
          count == num && true && backgroundColor ? backgroundColor : null,
        border: count == num && true && border ? border : null,
        padding: padding ? padding : "",
        cursor: "pointer",
        height: "40px",
        borderRadius: borderRadius || "5px",
      }}
      onClick={handleChange}
    >
      <Typography
        style={{
          fontSize: fontSize,
          fontWeight: count == num && true && fontWeight ? fontWeight : "500",
          color: count == num && true && textColor ? textColor : "black",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
export default CustomRadioBox;
