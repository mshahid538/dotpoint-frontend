import React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import {
  Card,
  CardContent,
  Table,
  TableRow,
  Typography,
  TableHead,
  TableContainer,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaperContainer from "@components/common/PaperContainer";
import { lightTheme } from "@redux/theme";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 16,
    color: theme.palette.primary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 500,
  },
}));


const useStyles = makeStyles()((theme) => {
  return {
    paddedRow: {
      padding: '20px 16px',
    },
    profit: {
      color: '#F14336'
    }
  };
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const rows = [
  {
    date: "14 Aug",
    trades: 29,
    lots: 2,
    result: 5035.08,
  },
  {
    date: "15 Aug",
    trades: 31,
    lots: 3,
    result: -6000.0,
  },
  {
    date: "16 Aug",
    trades: 35,
    lots: 4,
    result: -7500.0,
  },
  {
    date: "17 Aug",
    trades: 28,
    lots: 2,
    result: -4900.0,
  },
  {
    date: "18 Aug",
    trades: 30,
    lots: 3,
    result: -6750.0,
  },
];

const DailySummary = ({data}:any) => {
  
  const { classes } = useStyles();
  return (
    <>
      <PaperContainer
        title={"Daily Summary"}
        isIconEnd={true}
        bodyPadding="0px"
        icon={<InfoOutlinedIcon
          sx={{
            verticalAlign: "middle",
            marginRight: "8px",
            fontSize: "18px",
          }}
        />}
      >

        <CardContent sx={{ p: "0",height:"480px" }}>
          <TableContainer sx={{ maxHeight: 500,overflowY:"scroll" }}>
            <Table  aria-label="customized table">
              <TableHead >
                <TableRow>
                  <StyledTableCell className={classes.paddedRow}>Date</StyledTableCell>
                  <StyledTableCell>Trades</StyledTableCell>
                  <StyledTableCell>Lots</StyledTableCell>
                  <StyledTableCell>Result</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {data?.length > 0 && data.map((row:any, index:any) => (
                  <StyledTableRow key={index} >
                    <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                      {row.startDate}
                    </StyledTableCell>
                    <StyledTableCell>{row.noOfTrades}</StyledTableCell>
                    <StyledTableCell>{row.noOfLots}</StyledTableCell>
                    <StyledTableCell sx={{ color: row.result >= 0 ? lightTheme.palette.bgDefultGreen.main : 'red' }} >{(row.result).toFixed(2)}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </PaperContainer>
    </>
  );
};

export default DailySummary;
