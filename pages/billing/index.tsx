import React, { ReactNode, useCallback, useEffect } from "react";
//mui
import Layout from "@components/common/Layout/layout";
import { makeStyles } from "tss-react/mui";
import { styled } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  Chip,
  useTheme,
} from "@mui/material";
//component
import PaperContainer from "@components/common/PaperContainer";
import Assets from "@components/common/image_container";
import MUIButton from "@components/common/commonButton";
import FooterContent from "@components/common/footerContent";
import { lightTheme } from "@redux/theme";
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";

import usePageLoader from "@redux/hooks/usePageLoader";
import AlertBox from "@components/common/alertBox";
import BillingCard from "@components/billingArea/BillingCard";
import { useDispatch } from "react-redux";
import { buy_challenge_list, leader_board } from "@redux/Redux/Actions";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import CustomPagination from "@components/common/customPagination";
import MyTable from "@components/MyTable";
import { useReactToPrint } from 'react-to-print'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "poppins",
  fontWeight: "500",

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    // border: "1px solid #eeeeee",
    padding: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 12,
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& th, & td": {
    whiteSpace: "nowrap",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));
const useStyles = makeStyles()((theme) => {
  return {
    downloadBox: {
      width: "20px",
      height: "20px",
      border: "1px solid #91D14F",
      borderRadius: "6px",
      padding: "8px",
      backgroundColor: "rgba(145, 209, 79, 0.10)",
      cursor: "pointer",
    },
    heading: {
      fontSize: "14px",
      fontWeight: 500,
      [theme.breakpoints.down("md")]: {
        fontSize: "12px",
      },
    },
  };
});
function CustomTableHeader({ headerLabels }: any) {
  const theme = useTheme();


  return (
    <TableHead>
      <StyledTableRow>
        {headerLabels.map((label: any) => (
          <StyledTableCell
            key={label}
            align={label === "Invoice" ? "right" : "left"}
            sx={{
              color: "#0099CB",
              fontSize: "16px",
              fontWeight: 600,
              [theme.breakpoints.down("md")]: {
                fontSize: "14px",
              },
            }}
          >
            {label}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

const Billing = () => {
  const invoiceRef: any = React.createRef();

  const { classes } = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();

  //State
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState<any>(0)
  const [page, setPage] = React.useState<any>(0);
  const [leaderBoard, setLeaderBoard] = React.useState<any>();
  const [displayStyle, setDisplayStyle] = React.useState<any>("none");
  const [selectedBilling, setSelectedBilling] = React.useState<any>({});
  const backgroundColors = ["#FFCC00", "#EEE", "#C5A886"];
  const headerLabels = [
    "No.",
    "Dot Point Challenge",
    "Dates",
    "Pay",
    "Status",
    "Current Balance",
    "Server",
    "Invoice",
  ];
  // const content = [
  //   {
  //     pay: "",
  //     challenge: "Account size: $100,000",
  //     challeng1: "Proforma no.: 18971970",
  //     dates: "9 Aug 2023",
  //     dates1: "9 Aug 2023",
  //     amount: "$",
  //     amout1: "Swing",
  //     Mt: "MT5",
  //   },
  //   {
  //     pay: "",
  //     challenge: "Account size: $100,000",
  //     challeng1: "Proforma no.: 18971970",
  //     dates: "9 Aug 2023",
  //     dates1: "9 Aug 2023",
  //     amount: "$",
  //     amout1: "Swing",
  //     Mt: "MT5",
  //   },
  // ];
  interface Breadcrumb {
    label: ReactNode;
    path: string;
  }
  const breadcrumbsData: Breadcrumb[] = [
    {
      label: "Trader",
      path: "/",
    },
    {
      label: "Billing",
      path: "#",
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    onBeforePrint: () => {
      console.log('Printing is about to start');
    },
    onAfterPrint: () => {
      setSelectedBilling({})
      setDisplayStyle("none")
    },
  });

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: any) => {
    setRowsPerPage(value);
    setPage(0);
  };
  console.log("selectedBilling", selectedBilling);

  useEffect(() => {
    if (selectedBilling?._id && displayStyle === "block") {
      handlePrint()
    }
  }, [selectedBilling, displayStyle])

  useEffect(() => {
    (async () => {
      setFullPageLoader(true);
      try {
        const body = {
          page: page + 1,
          limit: rowsPerPage,
        };
        const res = await dispatch(buy_challenge_list(body));
        if (res?.payload?.status === 200) {
          setLeaderBoard(res?.payload?.data?.buy_challenge_list_data);
          setTotalPages(res?.payload?.data?.state?.data_count)
          setFullPageLoader(false);
        } else {
          setFullPageLoader(false);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    })();
  }, [rowsPerPage, page]);


  return (
    <>
      <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Billing">
        {leaderBoard && (
          <>
            {leaderBoard?.length > 0 ? (
              <PaperContainer title={"Billing"} bodyPadding="0px">
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <CustomTableHeader headerLabels={headerLabels} />
                    <TableBody>
                      {leaderBoard?.length > 0 &&
                        leaderBoard?.map((row: any, index: number) => {
                          return (
                            <StyledTableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0, }, }} >
                              <StyledTableCell align="left">
                                <Box className={classes.heading} marginLeft={2}>
                                  {index + 1}
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                <Box className={classes.heading}>
                                  {"Account size: " + `${getSymbol(row?.currencyData?.[0]?.code || "")} ${numberWithCommas(row?.accountBalance || "0")}`}
                                </Box>
                                {row?.tradingAccount?.login && (<Box className={classes.heading}>{"Login no.: " + row?.tradingAccount?.login || "-"}</Box>)}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                <Box gap={1} display={"flex"} alignItems={"center"}>
                                  {moment(row.updatedAt || "-").format("DD MMM, YYYY")}
                                </Box>
                                <Box gap={1} display={"flex"} alignItems={"center"}>
                                  {moment(row.endChallengeDate || "-").format("DD MMM, YYYY")}
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                {(row?.currencyCode || "") + " " + row?.amount || "-"}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                <Chip label={row?.paymentStatus === 1 ? "Completed" : "Failed"}
                                  color={row?.paymentStatus === 1 ? "success" : "error"}
                                  variant="outlined" />
                              </StyledTableCell>
                              <StyledTableCell align="left" className={classes.heading}  >
                                {getSymbol(row?.currencyData?.[0]?.code || "")}{" "}
                                {numberWithCommas(row?.currentBalance || "0")}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                <Box className={classes.heading}>
                                  {row?.serverDetail?.toUpperCase() || "-"}
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell onClick={() => {
                                setSelectedBilling(row)
                                setDisplayStyle("block");
                              }} align="right" >
                                <Assets
                                  className={classes.downloadBox}
                                  src={"/assets/icons/download.svg"}
                                  absolutePath={true}
                                />
                              </StyledTableCell>
                              {/* <StyledTableCell align="left">
                      <MUIButton
                        height="42px"
                        width="80px"
                        text="Paid"
                        type="paid"
                        backgroundColor={lightTheme.palette.bgDefultGreen.main}
                        hoverBgColor={lightTheme.palette.bgDefultGreen.main}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Assets
                        className={classes.downloadBox}
                        src={"/assets/icons/download.svg"}
                        absolutePath={true}
                      />
                    </StyledTableCell> */}
                            </StyledTableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <CustomPagination
                  count={totalPages}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  onPageChange={handleChangePage}
                />
                {/* <MyTable /> // just for testing */}
              </PaperContainer>
            ) : (
              <Box>
                <AlertBox
                  img={"FeedbackOutlinedIcon"}
                  description={`It looks like you don't have any order yet.`}
                  backgroundColor={"#dceef4"}
                  borderColor={"#0dcaf0"}
                />

                <BillingCard />
              </Box>
            )}
            <FooterContent />
          </>
        )}

      </BreadcrumbLayout>
      <div id="html-content" style={{ width: "820px", display: displayStyle ? displayStyle : "none" }} ref={invoiceRef}>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
        <title>Document</title>
        <div style={{ padding: "40px" }}>
          <table>
            <tbody>
              <tr>
                <td style={{}}>
                  <div style={{ marginRight: '22rem' }}>
                    <Assets src="/assets/images/main-logo.png" alt="" absolutePath={true} height={75} width={250} />
                  </div>
                </td>
                <td>
                  <div style={{ textAlign: 'right' }}>
                    <h1 style={{ textTransform: 'uppercase', fontWeight: 400 }}>INVOICE</h1>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style={{ textTransform: 'capitalize', marginRight: '22rem' }}>
                    <p style={{ fontSize: '15px', color: '#000', margin: 0 }}>Dot Point Capital Limited</p>
                  </div>
                </td>
                <td>
                  <div style={{ textTransform: 'capitalize', textAlign: 'right' }}>
                    <p style={{ fontSize: '18px', color: 'gray', marginTop: '-25px' }}>#2</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br /><br />
          <table>
            <tbody>
              <tr>
                <td scope="row" >
                  <div style={{ marginRight: '18rem', width: '14rem', display: "flex" }}>
                    Bill To:&nbsp;<p style={{ fontWeight: "400", marginTop: "0px" }}>
                      {selectedBilling?.billingInfo?.firstName +
                        " " +
                        selectedBilling?.billingInfo?.lastName}
                      {/* Parth khunt */}
                    </p>
                  </div>
                </td>
                <td style={{ color: 'gray' }}>
                  <div style={{ textAlign: 'right', marginRight: '5rem' }}>
                    Date:
                  </div>
                </td>
                <td style={{ textAlign: "right", marginLeft: "10px" }}>
                  <div>
                    {moment(new Date()).format("DD-MM-YYYY")}
                  </div>
                </td>
              </tr>
              <tr>
                <td>

                </td>
                <td style={{ marginLeft: "10px" }}>
                  <div style={{ color: 'gray', display: "flex", }}>
                    Order&nbsp;Number:
                  </div>
                </td>
                <td style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: "400" }}>{selectedBilling?.tradingAccount?.login || ""}</p>
                </td>
                {/* <td>
                  <div style={{ marginLeft: '-60px' }}>
                    Auto generate number
                  </div>
                </td> */}
              </tr>
            </tbody>
          </table>
          <table style={{ marginLeft: '27rem', background: '#f5f5f5', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', width: "300px" }}>
            <tbody>
              <tr style={{ width: '50%', background: '#f5f5f5', height: '100px' }}>
                <td height={20}>
                  <div style={{ fontWeight: 600, color: '#000', textAlign: 'right', fontSize: '18px', background: '#f5f5f5', marginLeft: '2rem', paddingRight: '1rem' }}>
                    {`Account Size:${getSymbol(
                      selectedBilling?.currencyData?.[0]?.code || ""
                    )} ${numberWithCommas(
                      selectedBilling?.accountBalance || ""
                    )}`}
                    {/* :US$980.00 */}

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <table className="table" style={{ background: '#000', color: '#fff', borderRadius: '5px', marginTop: '15px', height: '30px' }}>
            <thead className="table-dark">
              <tr><th scope="col">
                <div style={{ marginRight: '19rem', marginLeft: '1rem' }}>
                  Item
                </div>
              </th>
                <th scope="col">
                  <div style={{ marginRight: '5rem' }}>
                    Quantity
                  </div>
                </th>
                <th scope="col">
                  <div style={{ marginRight: '5rem' }}>
                    Rate
                  </div>
                </th>
                <th scope="col">
                  <div style={{ marginRight: '1rem' }}>
                    Amount
                  </div>
                </th>
              </tr></thead>
          </table>
          <table style={{ margin: '10px' }}>
            <tbody>
              <tr>
                <td>
                  <div style={{ fontWeight: 500, fontSize: '15px', width: "400px" }}>
                    {selectedBilling?.challenge_list?.[0]?.name}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '15px', marginRight: '6rem' }}>
                    1
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '15px', marginRight: '4.5rem' }}>
                    {`${getSymbol(
                      selectedBilling?.currencyCode || ""
                    )} ${numberWithCommas(
                      selectedBilling?.amount || ""
                    )}`}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '15px' }}>
                    {`${getSymbol(
                      selectedBilling?.currencyCode || ""
                    )} ${numberWithCommas(
                      selectedBilling?.amount || ""
                    )}`}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <br />
          <table>
            <tbody>
              <tr>
                <td>
                  <div style={{ fontSize: '15px', color: 'gray', marginLeft: '31rem' }}>
                    Subtotal:
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '15px', marginLeft: '4.5rem' }}>
                    {`${getSymbol(
                      selectedBilling?.currencyCode || ""
                    )} ${numberWithCommas(
                      selectedBilling?.amount || ""
                    )}`}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <div style={{ fontSize: '15px', color: 'gray', marginLeft: '32.5rem' }}>
                    Total:
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '15px', marginLeft: '4.5rem' }}>
                    {`${getSymbol(
                      selectedBilling?.currencyCode || ""
                    )} ${numberWithCommas(
                      selectedBilling?.amount || ""
                    )}`}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br /><br />
          <div>
            <span style={{ color: 'gray' }}>Notes:</span>
            <p style={{ marginTop: '5px', fontSize: '15px' }}>The account you have purchased is a demo account with virtual funds, intended for educational<br />
              purposes only, and does not involve real market trading or actual financial assets.</p>
          </div>
        </div>
      </div>

    </>
  );
};
export default Billing;
