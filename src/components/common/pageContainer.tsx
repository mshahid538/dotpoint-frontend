import Paper, { PaperProps } from "@mui/material/Paper";
import CommonComponentProps from "@customTypes/commonComponentProps";
import React from "react";

type PaperContainerProps = CommonComponentProps & PaperProps;
export default function PaperContainer({
  children,
  sx,
  ...other
}: PaperContainerProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, ...sx }} {...other}>
      {children}
    </Paper>
  );
}
