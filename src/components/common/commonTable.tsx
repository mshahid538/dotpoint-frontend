import React from "react";
import { makeStyles } from "tss-react/mui";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PaperContainer from "./PaperContainer";

const useStyles = makeStyles()((theme) => {
  return {
    tableHeader: {
      "& .MuiTableCell-head ": {
        borderBottom: "none !important",
        fontSize: "16px",
        lineHeight: "30px",
        fontWeight: "800",
        border: "none",
        padding: "0.6vh 3vh",
        "&:nth-child(odd)": {
          backgroundColor: "#f5fafe",
        },
        "&:nth-child(even)": {
          backgroundColor: "#e4f3ff",
        },
        "&:first-child": {
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
        },
        "&:last-child": {
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
        },
        [theme.breakpoints.down("md")]: {
          fontSize: "14px",
          fontWeight: "700",
          // padding: "10px",
          // padding: "0.3vh 1.5vh",
        },
      },
    },
    tableBody: {
      "& .MuiTableCell-body": {
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "30px",
        borderBottom: "none !important",
        padding: "0.6vh 3vh",
        "&:nth-child(odd)": {
          backgroundColor: "#f5fafe",
        },
        "&:nth-child(even)": {
          backgroundColor: "#e4f3ff",
        },
        "&:first-child": {
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
        },
        "&:last-child": {
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
        },
        [theme.breakpoints.down("md")]: {
          fontSize: "12px",
          // padding: "0.5vh 1.5vh",
        },
      },
    },
    whitebg: {
      backgroundColor: "#fff",
      "&:nth-child(odd)": {
        backgroundColor: "#fff !important",
      },
      "&:nth-child(even)": {
        backgroundColor: "#fff !important",
      },
    },
  };
});
const CommonTable = ({
  minWidth,
  title,
  data,
  maxHeight,
  tableHeader,
  tableBody,
  children1,
  children2,
  children3,
  gridNum,
}: any) => {
  const { classes } = useStyles();

  return (
    // <PaperContainer title={title} bodyPadding={"0px"} sx={{ overflow: 'hidden' }}>
    <Table
      sx={{ minWidth: minWidth || "100%", maxHeight: maxHeight || "100%" }}
    >
      <TableHead className={classes.tableHeader}>
        {tableHeader}
        <TableRow>
          <TableCell className={classes.whitebg}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={classes.tableBody}>{tableBody}</TableBody>
    </Table>
    // </PaperContainer>
  );
};

export default CommonTable;
