import {
  Box,
  FormControlLabel,
  Radio,
  RadioProps,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles, withStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
      textAlign: 'center'
    },
    primaryBox: {
      // border: `2px solid #91D14F`,
      borderRadius: 5,
      width: "auto",
      padding: "0px 5px 0px 5px",
      color: "#000000",
      textAlign: "center",
    },
    grayBox: {
      border: `2px solid #EEEEEE`,
      borderRadius: 5,
      width: "auto",
      padding: "0px 20px 0px 5px",
      color: theme?.palette?.bgGray?.main,
      textAlign: "center",
    },
  };
});
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  // display:'none',
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394B59" : "#F5F8FA",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404D" : "#EBF1F5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#1BA39C",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#1BA39C",
  },
});
function BpRadio(props: any) {
  return (
    props?.isIcon && (
      <Radio
        sx={{
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        disableRipple
        color="default"
        checkedIcon={
          props.radioIcon ? (
            <img
              src={`${props.radioIcon}`}
              alt=""
              height="28px"
              width="28px"
              style={{ borderRadius: "50%", border: `1px solid #d5d5d5` }}
            />
          ) : (
            <BpCheckedIcon />
          )
        }
        icon={
          props.radioIcon ? (
            <img
              src={`${props.radioIcon}`}
              alt=""
              height="28px"
              width="28px"
              style={{ borderRadius: "50%", border: `1px solid #d5d5d5` }}
            />
          ) : (
            <BpIcon />
          )
        }
        {...props}
      />
    )
  );
}
<a href="https://www.flaticon.com/free-icons/flags" title="flags icons">Flags icons created by Freepik - Flaticon</a>
const RadioButtonBox = ({
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
  width
}: any) => {
  console.log(border, "border")
  const { classes } = useStyles();
  const theme = useTheme()
  return (
    <Box
      className={count == num && true ? classes?.primaryBox : classes?.grayBox}
      style={{
        backgroundColor: count == num && true && backgroundColor ? backgroundColor : '#fbfbfb',
        border: count == num && true && border ? border : `1px solid #e3e3e3`,
        padding: padding ? padding : '',
        cursor: 'pointer',
        borderRadius: borderRadius || "5px",
        width: width || 'auto',
      }}
      onClick={handleChange}
    >
      <FormControlLabel
        className={bg ? classes?.main : ""}
        value={value}
        control={<BpRadio radioIcon={radioIcon} isIcon={isIcon} theme={theme} />}
        label={
          <Typography sx={{ fontSize: fontSize || "16px", fontWeight: fontWeight, "@media (max-width: 768px)": { fontSize: fontSize || "14px", }, }}  >
            {label}
          </Typography>
        }
        style={{
          color: count == num && true && textColor ? textColor : "#000000",
        }}
        name={name}
        // onChange={handleChange}
        checked={count == num && true}
        sx={{ marginLeft: marginLeft ? marginLeft : 1, marginRight: 1 }}
        labelPlacement={labelPlacement}
        disabled={disabled ? disabled : false}
      />
    </Box>
  );
};
export default RadioButtonBox;