import React from "react";
import { Box, TableCell, TableRow } from "@mui/material";
import CommonTable from "@components/common/commonTable";
import TextLabel from "@components/common/commonTextLabel";
import CustomPagination from "@components/common/customPagination";
import moment from "moment";
import { lightTheme } from "@redux/theme";
import { numberWithCommas } from "@lib/stringAvatar";

const TradingJournal = ({ historyData }: any) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState<any>(0);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: any) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const totalRows = historyData?.length || 0;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <>
      <TextLabel fontWeight="600" variant="h6" title="Trading Journal" />
      <Box sx={{ marginTop: { sm: "20px", xs: "12px" }, overflowX: "auto" }}>
        <CommonTable
          minWidth={"400px"}
          tableHeader={
            <TableRow>
              <TableCell>Position Id</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Close</TableCell>
              <TableCell>Swap</TableCell>
              <TableCell>Comm.</TableCell>
              <TableCell>Total Profit</TableCell>
            </TableRow>
          }
          tableBody={
            <>
              {historyData?.length > 0 &&
                historyData.map((row: any, index: any): any => (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell>{row.positionId || "-"}</TableCell>
                      <TableCell>
                        {moment(row.time || "-").format("DD, MMM YYYY")}
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            row.type === "DEAL_TYPE_BUY"
                              ? lightTheme.palette.bgDefultGreen.main
                              : row.type === "DEAL_TYPE_SELL"
                                ? lightTheme.palette.defultError.main
                                : row?.type === "DEAL_TYPE_BALANCE"
                                  ? "#000000DE"
                                  : "#000000DE",
                        }}
                      >
                        {row.type === "DEAL_TYPE_BUY"
                          ? "BUY"
                          : row.type === "DEAL_TYPE_SELL"
                            ? "SELL"
                            : row?.type === "DEAL_TYPE_BALANCE"
                              ? "BALANCE"
                              : null}
                      </TableCell>
                      <TableCell>{row.volume || "-"}</TableCell>
                      <TableCell>{row.symbol || "-"}</TableCell>
                      <TableCell>
                        {`${numberWithCommas(row.price)}` || "0"}
                      </TableCell>
                      {/* <TableCell>{row.sl}</TableCell> */}
                      <TableCell
                        sx={{
                          color:
                            row.swap == 0
                              ? "#000000DE"
                              : row.swap > 0
                                ? lightTheme.palette.bgDefultGreen.main
                                : lightTheme.palette.defultError.main,
                        }}
                      >
                        {`${numberWithCommas(row.swap)}` || "0"}
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            row.commission == 0
                              ? "#000000DE"
                              : row.commission > 0
                                ? lightTheme.palette.bgDefultGreen.main
                                : lightTheme.palette.defultError.main,
                        }}
                      >
                        {`${numberWithCommas(row.commission)}` || "0"}
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            row.profit == 0
                              ? "#000000DE"
                              : row.profit > 0
                                ? lightTheme.palette.bgDefultGreen.main
                                : lightTheme.palette.defultError.main,
                        }}
                      >
                        {`${numberWithCommas(row.profit)}` || "0"}
                      </TableCell>
                    </TableRow>

                    {index < historyData.length - 1 && (
                      <TableRow key={`spacer-${index}`}>
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            backgroundColor: "#FFFFFF !important",
                          }}
                          colSpan={2}
                        ></TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </>
          }
        />
      </Box>
      {/* <CustomPagination
        count={totalPages}
        rowsPerPage={rowsPerPage}
        page={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
      /> */}
    </>
  );
};

export default TradingJournal;
