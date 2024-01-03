import React from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { lightTheme } from "@redux/theme";

const MUIButton = ({
    text,
    height,
    width,
    marginRight,
    marginLeft,
    border,
    borderRadius,
    endIcon,
    startIcon,
    onClick,
    marginTop,
    marginBottom,
    color,
    disabled,
    type,
    loading,
    disableLoader,
    fontWeight,
    href,
    fontSize,
    variant,
    fullWidth,
    backgroundColor,
    textcolor,
    maxWidth,
    textHoverColor,
    hoverBgColor,
    borderColor
}: any) => {
    // const theme:any = useTheme();
    return (
        <Button
            fullWidth={fullWidth || false}
            type={type}
            variant={variant || "contained"}
            color={`${color === "error" ? "error" : "primary"}`}
            sx={{
                borderRadius: borderRadius || "10px",
                marginTop: marginTop,
                marginBottom: marginBottom,
                height: height,
                width: width,
                maxWidth: maxWidth,
                marginRight: marginRight,
                marginLeft: marginLeft,
                fontSize: fontSize,
                fontWeight: fontWeight,
                textTransform: 'capitalize',
                backgroundColor: backgroundColor ? backgroundColor : lightTheme.palette.bgdefultBlue.main,
                textcolor: textcolor ? textcolor : "primary",
                "&:hover": {
                    backgroundColor: hoverBgColor || lightTheme.palette.bgdefultBlue.main, // Background color on hover
                    color: textHoverColor ? textHoverColor : "#FFFFFF",
                    border: border ? border : lightTheme.palette.bgdefultBlue.main,
                },
                color: color ? color : "primary",
                border: border ? border : lightTheme.palette.bgdefultBlue.main,
            }}
            disableElevation
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            disabled={disabled}
            href={href}
        // loading={loading}
        >
            <Typography fontFamily={'Poppins'} sx={{ fontSize:{ sm: fontSize || '14px', xs: fontSize || "12px" } }}  >{text}</Typography>
            {loading && !disableLoader ? (
                <CircularProgress
                    size={20}
                    color={"inherit"}
                    sx={{ marginLeft: 3 }}
                // variant={"indeterminate"}
                // disableShrink={true}
                />
            ) : (
                ""
            )}
        </Button>
    );
};

export default MUIButton;
