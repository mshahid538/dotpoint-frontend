import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { styled } from "@mui/material/styles";
import {
  Grid,
  TextField,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PaperContainer from "@components/common/PaperContainer";
import CustomPagination from "@components/common/customPagination";
import CommonTextField from "@components/common/commonTextField";
import Visibility from "@mui/icons-material/Visibility";
import SelectDropDown from "@components/common/selectDropDown";
import { wrap } from "module";
import moment from "moment";

const useStyles = makeStyles()((theme) => {
  return {
    autoIcon: {
      outline: "none",
      boxShadow: "none",
      "& svg ": {
        color: "#ffffff !important",
      },
      "& .MuiFilledInput-input": {
        color: "#fff !important",
      },
    },
    tradBox: {
      padding: "16px",
      "& .mui-1tzgnuz-MuiInputBase-root-MuiFilledInput-root:before": {
        borderBottom: "none",
      },
      "& .mui-2y464i-MuiInputBase-root-MuiFilledInput-root:before": {
        borderBottom: "none",
      },
    },
  };
});

const top100Films = [
  { label: "The Redemption" },
  { label: "The Godfather" },
  { label: "The Godfather" },
  { label: "The Dark Knight" },
  { label: "12 Angry Men" },
  { label: "Schindler's List" },
  { label: "Pulp Fiction" },
];

const rows = [
  {
    ticket: "India",
    open: "14 Aug 2023 05:12:39",
    type: "Buy",
    volume: 100.0,
    symbol: "us500 cash",
    price: 4459.4,
    sl: 0,
    tp: 0,
    close: "14 Aug 2023 05:12:39",
    swap: 0.0,
    comm: 0.0,
    profit: -300.0,
    pips: -3,
    duration: "5m 2s",
    log: "Log",
  },
  {
    ticket: "China",
    open: "15 Aug 2023 06:30:15",
    type: "Sell",
    volume: 50.0,
    symbol: "eurusd",
    price: 1.2345,
    sl: 1.2355,
    tp: 1.2335,
    close: "15 Aug 2023 06:35:45",
    swap: -0.5,
    comm: -10.0,
    profit: 75.0,
    pips: 10,
    duration: "5m 30s",
    log: "Log",
  },
  {
    ticket: "Italy",
    open: "16 Aug 2023 10:45:20",
    type: "Buy",
    volume: 75.0,
    symbol: "gold",
    price: 1750.0,
    sl: 1749.0,
    tp: 1755.0,
    close: "16 Aug 2023 11:00:10",
    swap: 1.2,
    comm: -5.5,
    profit: 30.0,
    pips: 5,
    duration: "14m 50s",
    log: "Log",
  },
  {
    ticket: "United States",
    open: "17 Aug 2023 14:20:50",
    type: "Sell",
    volume: 150.0,
    symbol: "oil",
    price: 70.5,
    sl: 71.0,
    tp: 70.0,
    close: "17 Aug 2023 14:45:30",
    swap: -2.5,
    comm: -15.25,
    profit: -50.0,
    pips: -5,
    duration: "24m 40s",
    log: "Log",
  },
  {
    ticket: "Canada",
    open: "18 Aug 2023 09:55:10",
    type: "Buy",
    volume: 200.0,
    symbol: "eurjpy",
    price: 132.75,
    sl: 132.5,
    tp: 133.0,
    close: "18 Aug 2023 10:05:45",
    swap: 1.75,
    comm: -7.9,
    profit: 42.5,
    pips: 25,
    duration: "10m 35s",
    log: "Log",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontFamily: "Poppins",
    fontWeight: "600",
    backgroundColor:"#fff"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const languages = ["English", "Chinese", "Japanese", "Korean"];

const TradingJournal = ({data}:any) => {
  
  // const [data, setData] = React.useState<any>({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState<any>(0);
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (value: any) => {
    setRowsPerPage(value);
    setPage(0);
  };
  const { classes } = useStyles();

  return (
    <>
      <PaperContainer
        title={"Trading Journal"}
        isIconEnd={true}
        bodyPadding="0px"
        icon={
          <InfoOutlinedIcon
            sx={{
              verticalAlign: "middle",
              marginRight: "8px",
              fontSize: "18px",
            }}
          />
        }
      >
        {/* <Grid container spacing={2} className={classes.tradBox}>
          <Grid item lg={5} sm={6} xs={12}>
            <CommonTextField
              text={"Order"}
              name={"name"}
              size="medium"
              placeholder={"Closer Time "}
              // value={data?.name}
              // onChange={(e: any) => handleChange(e, false)}
              
            />
          </Grid>
          <Grid item lg={5} sm={6} xs={12}>
            <CommonTextField
              text={"Search tickets or tags"}
              name={"name"}
              size="medium"
              placeholder={"Closer Time "}
              // value={data?.name}
              // onChange={(e: any) => handleChange(e, false)}
              // valid
              InputProps={{
                endAdornment: <SearchOutlinedIcon />,
              }}
              isIcon={true}
            />
          </Grid>
          <Grid item lg={2} sm={6} xs={12} alignSelf={'end'} display={"flex"} flexWrap={"wrap"} sx={{justifyContent:{lg:"end",xs:'start'}}}>
            <SelectDropDown
              values={languages || []}
              name="language"
              value={data?.language}
              fullWidth
              size="medium"
              textAlign="center"
              backgroundColor="#0099CB"
              color="#fff"
              borderRadius="7px"
              width="170px"
              sx={{ border: "none", boxShadow: "none"}}
              onChange={(e: any) => {
                setData({ ...data, language: e.target.value });
              }}
              className={classes.autoIcon}
              valid
            />
          </Grid>
        </Grid> */}

        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Position Id</StyledTableCell>
                  <StyledTableCell align="center">Open</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Volume</StyledTableCell>
                  <StyledTableCell align="center">Symbol</StyledTableCell>
                  {/* <StyledTableCell align="center">SL</StyledTableCell> */}
                  <StyledTableCell align="center">Close</StyledTableCell>
                  <StyledTableCell align="center">Swap</StyledTableCell>
                  <StyledTableCell align="center">Comm.</StyledTableCell>
                  <StyledTableCell align="center">Total Profit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length > 0 && data.map((row:any, index:any) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <StyledTableCell align="center">{row.positionId}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.time).format("DD, MMM YYYY")}</StyledTableCell>
                      <StyledTableCell align="center">{row.type === "DEAL_TYPE_BUY" ? "BUY" : row.type === "DEAL_TYPE_SELL" ? "SELL" : row?.type}</StyledTableCell>
                      <StyledTableCell align="center">{row.volume}</StyledTableCell>
                      <StyledTableCell align="center">{row.symbol}</StyledTableCell>
                      <StyledTableCell align="center">{row.price}</StyledTableCell>
                      {/* <StyledTableCell align="center">{row.sl}</StyledTableCell> */}
                      <StyledTableCell align="center">{row.swap}</StyledTableCell>
                      <StyledTableCell align="center">{row.commission}</StyledTableCell>
                      <StyledTableCell align="center">{row.profit}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Box p={3}>
            <CustomPagination
              count={100}
              rowsPerPage={rowsPerPage}
              page={page}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handleChangePage}
            />
          </Box> */}
        </Box>
      </PaperContainer>
    </>
  );
};

export default TradingJournal;
