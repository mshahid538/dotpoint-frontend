import React, { Children } from "react";
import {
  InputLabel,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: any) => {
  return {
    select: {
      "& .MuiSelect-select ": {
        padding: "13px",
        [theme.breakpoints.down("md")]: {
          // padding: "0px 12px",
        },
      },
      "&:before": {
        borderColor: "white",
      },
      "&:after": {
        borderColor: "white",
      },
      "&:not(.Mui-disabled):hover::before": {
        borderColor: "white",
      },
      "& .MuiInputBase-input": {
        height: "20px",
      },
      "& .MuiInputBase-fullWidth": {
        fontSize: "14px",
        fontFamily: "Poppins",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#EEEEEE",
        borderRadius: "10px",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#EEEEEE",
          borderRadius: "10px",
        },
        "&:hover fieldset": {
          borderColor: "#EEEEEE",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#EEEEEE",
        },
      },
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #EEEEEE",
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #EEEEEE",
        },
      },
    },
    icon: {
      fill: theme.palette.bgGray.main,
    },
    root: {
      // color: 'white',
    },
    redborder: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "red",
      },
    },
    flagIcon: {
      marginRight: theme.spacing(1),
      height: "30px",
      width: "30px",
    },
  };
});

const SelectDropDown = ({
  text,
  height,
  width,
  values,
  menu,
  valid,
  onChange,
  name,
  value,
  label,
  defaultValue,
  defaultChecked,
  disabled,
  fontWeight,
  labelSize,
  multiple,
  children,
  rejection,
  className,
  size,
  backgroundColor,
  color,
  sx,
  borderRadius,
  startAdornment,
  placeholder,
  countryFlagIcons,
  maxHeight,
}: any) => {
  const { classes, cx } = useStyles();
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: maxHeight || "30vh",
      },
    },
  };
  return (
    <>
      {text && (
        <Box
          mb={1}
          display="flex"
          fontSize="12px"
          flexDirection={"row"}
          sx={sx}
        >
          <InputLabel
            sx={{
              marginRight: "2px",
              fontWeight: fontWeight || "400",
              fontSize: labelSize || "14px",
              color: color || "#333333",
              backgroundColor: backgroundColor,
              fontFamily: "poppins",
            }}
          >
            {text}
          </InputLabel>
          {valid && (
            <Typography color="#EF627A" component={"caption"} variant={"body2"}>
              *
            </Typography>
          )}
        </Box>
      )}
      <FormControl sx={{ width: width, height: height }}>
        <Select
          size={size || "small"}
          className={cx(classes.select, className)}
          value={value || ""}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue || ""}
          defaultChecked={defaultChecked}
          disabled={disabled}
          displayEmpty
          sx={sx}
          MenuProps={menuProps}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <span style={{ color: color || "#333", fontSize: "14px" }}>
                  {placeholder ? placeholder : "Select"}
                </span>
              );
            }
            return (
              <span style={{ color: color || "#333", fontSize: "14px" }}>
                {selected}
              </span>
            );
            // return selected;
          }}
          style={{
            backgroundColor: backgroundColor || "transparent",
            color: color || "white",
            width: width || "120px",
            borderRadius: "10px",
            height: size === "medium" ? "47px" : "auto",
            fontFamily: "poppins",
          }}
          inputProps={{
            classes: {
              icon: classes.icon,
              root: classes.root,
            },
          }}
          startAdornment={
            countryFlagIcons && value && countryFlagIcons[value] ? (
              <InputAdornment position="start" className={classes.flagIcon}>
                <Avatar
                  src={countryFlagIcons[value]}
                  alt="Flag"
                  className={classes.flagIcon}
                />
              </InputAdornment>
            ) : (
              startAdornment
            )
          }
        >
          {values &&
            values?.map((val: any, index: number) => {
              return (
                <MenuItem value={val} key={index.toString()}>
                  {countryFlagIcons && countryFlagIcons[val] && (
                    <Avatar
                      src={countryFlagIcons[val]}
                      alt={`Flag ${val}`}
                      className={classes.flagIcon}
                    />
                  )}
                  {val}
                </MenuItem>
              );
            })}
          {menu &&
            menu?.map((val: any, index: number) => {
              return (
                <MenuItem value={val?.clientId} key={index.toString()}>
                  {val?.clientName}
                </MenuItem>
              );
            })}
          {rejection &&
            rejection?.map((val: any, index: number) => {
              return (
                <MenuItem value={val} key={index.toString()}>
                  {val?.description}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </>
  );
};
export default SelectDropDown;
