import React from "react";
import { Divider, Box } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Paper, { PaperProps } from "@mui/material/Paper";
import CommonComponentProps from "@customTypes/commonComponentProps";
import TextLabel from "../commonTextLabel";
type NewPaperContainerProps = CommonComponentProps & PaperProps;
const useStyles = makeStyles()((theme) => {
    return {
        titleForm: {
            fontSize: "16px",
            fontWeight: "600",
            // padding: "15px 20px 15px 20px",
        },
    };
});
export default function NewPaperContainer({
    children,
    sx,
    padding,
    margin,
    title,
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
    ...other
}: any) {
    const { classes } = useStyles();
    const hasTitle = title;
    return (
        <Paper
            elevation={0}
            sx={{
                ...sx,
                backgroundColor: backgroundColor || "#fff",
                border: {
                    // md: "1px solid #DEE2E6",
                },
                height: height || "auto",
                borderRadius: "15px",
                color: color || "#000"
                // margin: margin || "24px 0"
            }}
            {...other}
        >
            {hasTitle && (
                <>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'} gap={0.1}>
                        <Box sx={{ padding: { sm: "24px 24px 12px 24px", xs: "15px 15px 6px 15px" } }}>
                            <TextLabel fontWeight="600" variant={"h5"} title={title} isIconStart={isIconStart} isIconEnd={isIconEnd} icon={icon} />
                            <TextLabel variant={"subtitle2"} title={subdes} />
                        </Box>
                        {tabContent}
                    </Box>

                </>
            )}
            {/* {hasTitle && <Divider />} */}
            <Box sx={{ textAlign: textAlign || "left", padding: bodyPadding || { sm: "0  24px 24px", xs: "0 15px 15px" } }}>{children}</Box>
        </Paper>
    );
}

