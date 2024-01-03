import {
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import emojiRegex from "emoji-regex";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      // background: "#36373B",
      // minWidth: "50px",
      // border: 'none !important',
      "& .MuiInputBase-input": {
        height: "15px",
        [theme.breakpoints.down('md')]: {
          // height: "10px",
        }
      },
      "& .MuiInputBase-fullWidth": {
        fontSize: "14px",
        fontFamily: "Poppins",
        [theme.breakpoints.down('md')]: {
          fontSize: "12px",
        }
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#EEEEEE ",
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
          borderColor: "#EEEEEE", // Set the border color for hover
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#EEEEEE", // Set the border color for focus
        },
      },
    },
    error: {
      // border: "1px solid green",
    },
    noBorder: {
      border: "none",
    },
    inputDark: {
      // color: '#FFFFFF',
      // transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out",
      // "&:hover": {
      //     borderColor: "rgba(0, 156, 251, 0.8)",
      //     boxShadow: "0 0 5px rgba(0, 156, 251, 0.8)", // Replace with your desired box shadow
      //     "-webkit-box-shadow": "0 0 5px rgba(0, 156, 251, 0.8)", // Replace with your desired box shadow
      // },
      // borderRadius: 5,
      // background: "#36373B",
    },
    inputLight: {
      color: "#FFFFFF",
    },
    label: {
      // color: '#FFFFFF',
    },
  };
});
const CommonTextField = ({
  text,
  type,
  placeholder,
  height,
  width,
  valid,
  multiline,
  rows,
  name,
  value,
  onChange,
  onInput,
  inputProps,
  defaultValue,
  fontWeight,
  labelSize,
  labelColor,
  showPasswordToggle,
  maxValue,
  error,
  className,
  format,
  bgcolor,
  onKeyDown,
  onPaste,
  onBlur,
  disabled,
  onKeyDownCapture,
  shrink,
  onDrag,
  size,
  icon,
  color,
  backgroundColor,
  variant,
  sx,
  InputProps,
  inputLight,
  isIcon,
  textSize,
  noBorder,
  tabIndex
}: any) => {
  const { classes } = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const regex = emojiRegex();
  return (
    <>
      {text && (
        <Box
          // mt={1.5}
          mb={0.8}
          display="flex"
          fontSize="12px"
          flexDirection={"row"}
          sx={sx}
        >
          <InputLabel
            sx={{
              marginRight: "2px",
              fontWeight: fontWeight || "400",
              fontSize: { md: textSize || "14px", sm: "12px", xs: "12px" },
              color: labelColor || "#333333",
              backgroundColor: backgroundColor,
              fontFamily: "poppins",
              border: 'none'
            }}
          >
            {text}
          </InputLabel>
          {valid && (
            <Typography color="#EF627A" component={"caption"} variant={"body2"}>
              *
            </Typography>
          )}
          {isIcon && (
            <InfoOutlinedIcon sx={{ fontSize: "18px" }} />
          )}
        </Box>
      )}
      <TextField
        fullWidth
        size={size || "small"}
        type={
          type == "password"
            ? showPassword && showPasswordToggle
              ? "text"
              : type
            : type
        }
        name={name}
        value={value}
        placeholder={placeholder}
        sx={{ height: height, width: width }}
        multiline={multiline}
        rows={rows}
        className={`${classes?.main} ${className}`}
        onInput={onInput}
        onPaste={onPaste}
        inputProps={inputProps}
        onKeyDown={onKeyDown}
        variant={variant}
        defaultValue={defaultValue}
        onDrag={onDrag}
        onBlur={onBlur}
        disabled={disabled ? disabled : false}
        onChange={(e) => {
          const value = e.target.value;
          const strippedValue = value.replace(regex, "");
          const modifiedEvent = {
            ...e,
            target: {
              ...e.target,
              name: name,
              value: strippedValue,
            },
          };
          onChange(modifiedEvent);
        }}
        InputLabelProps={{
          className: classes.label,
        }}
        InputProps={{
          ...(showPasswordToggle && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Visibility sx={{ color: '#cdcdcd' }} />
                  ) : (
                    <VisibilityOff sx={{ color: '#cdcdcd' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }),
          ...(icon && {
            startAdornment: (
              <Box display='flex' alignItems={'flex-start'} marginRight={1}>
                {icon}
              </Box>
            ),
          }),
          classes: {
            notchedOutline: noBorder && classes.noBorder,
          },
          className: inputLight ? classes.inputLight : classes.inputDark,
          ...InputProps,
          tabIndex: tabIndex,
        }}
      />
    </>
  );
};
export default CommonTextField;