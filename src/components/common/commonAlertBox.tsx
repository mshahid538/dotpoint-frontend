import React from "react";
import { Alert } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { lightTheme } from "@redux/theme";
import TextLabel from "./commonTextLabel";

const useStyles = makeStyles()((theme) => {
  return {
    commanBox: {
      padding: "20px",
      borderRadius: "20px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        padding: "12px",
      },
      "& .MuiTypography-subtitle2 ": {
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px !important",
        },
      },
    },
    bgError: {
      backgroundColor: "red",
      border: "3px solid darkred",
    },
    bgWarning: {
      backgroundColor: lightTheme.palette.lightWarning.main,
      border: "3px solid",
      borderColor: lightTheme.palette.warning.main,
    },
    bgInfo: {
      backgroundColor: lightTheme.palette.bgLightBlue.main,
      border: "3px solid",
      borderColor: lightTheme.palette.info.main,
    },
    bgSuccess: {
      backgroundColor: lightTheme.palette.defultLightGreen.main,
      border: "3px solid",
      borderColor: lightTheme.palette.bgDefultGreen.main,
    },
    bgDefault: {
      backgroundColor: lightTheme.palette.bgLightGray.main,
      border: "3px solid",
      borderColor: lightTheme.palette.bgDefultLight.main,
    },
  };
});

const MUIAlert = ({
  severity,
  description,
  highlightText,
  icon,
  onHandle,
  btnTitle,
  severityIcon,
  iconName,
  fontSize,
  buttonProps,
  sx
}: any) => {
  const { classes } = useStyles();

  let alertClassName = "";

  switch (severity) {
    case "error":
      alertClassName = classes.bgError;
      break;
    case "warning":
      alertClassName = classes.bgWarning;
      break;
    case "info":
      alertClassName = classes.bgInfo;
      break;
    case "success":
      alertClassName = classes.bgSuccess;
      break;
    case "defult":
      alertClassName = classes.bgDefault;
      break;
    default:
      alertClassName = classes.bgDefault;
      break;
  }

  return (
    <Alert
      className={`${alertClassName} ${classes.commanBox}`}
      severity={severity || severityIcon}
      icon={icon}
      sx={sx}
    >
      {iconName}
      <TextLabel
        variant="subtitle2"
        fontWeight="500"
        title={description}
        highlightText={highlightText}
        textAlign={"center"}
        fontSize={fontSize}
      />
      {btnTitle && (
        <button onClick={onHandle} className="your-button-styles">
          {btnTitle}
        </button>
      )}
      {buttonProps}
    </Alert>
  );
};

export default MUIAlert;
