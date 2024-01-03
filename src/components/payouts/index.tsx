import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
//mui
import { styled } from "@mui/material/styles";
import {
    Box,
    Grid,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    tableCellClasses,
    Typography,
    useTheme,
    Paper,
} from "@mui/material";
//component
import PaperContainer from "@components/common/PaperContainer";
import TextLabel from "@components/common/commonTextLabel";
import MUIButton from "@components/common/commonButton";
import moment from "moment";
import NoDataFound from "@components/common/noDataFound";
import { getSymbol } from "@lib/stringAvatar";
import MUIAlert from "@components/common/commonAlertBox";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        border: "1px solid #eeeeee",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        [theme.breakpoints.down("md")]: {
            fontSize: "12px",
        },
        padding: 8,
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
        border: 0,
    },
}));

function CustomTableHeader({ headerLabels }: any) {
    const theme = useTheme();

    return (
        <TableHead>
            <TableRow>
                {headerLabels.map((label: any) => (
                    <TableCell
                        key={label}
                        align="left"
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
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
const Payouts = ({
    invoicesContent,
    invoiceData,
    tradingAccount,
    invoicesHeaderLabels,
    userData,
    content,
    headerLabels,
}: any) => {
    const router = useRouter();
    console.log(tradingAccount,"tradingAccount")
    return (
        tradingAccount?.isKYCVerified ?
            <Grid container spacing={2} xs={12}>
                <Grid item xs={12}>
                    <Box>
                        <TextLabel
                            variant="body1"
                            fontWeight="500"
                            title="Welcome to Payout section. If you have an active Dot Point Account, you can manage your withdrawals here."
                        />
                        <TextLabel
                            noWrap={false}
                            margin="8px 0 12px 0"
                            variant="body1"
                            title="Each withdrawal becomes available to you as soon as our team verifies you have been trading in accordance to our rules and confirms the available withdrawal. In most cases, this we’ll be the following
                            business day after your Profit split day. You will receive an email notification as soon as the withdrawal option becomes active."
                            color="#333333b3"
                        />
                        <TextLabel
                            margin="8px 0 12px 0"
                            variant="body1"
                            fontWeight="500"
                            title="Profit Split awaiting your action"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <PaperContainer padding="0px" marginTop={5} bodyPadding="0px" sx={{ overflow: "hidden" }}>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <CustomTableHeader headerLabels={headerLabels} />
                                <TableBody>
                                    {tradingAccount?.tradingAccounts?.length > 0 ? tradingAccount?.tradingAccounts?.map((row: any, i: any) => (
                                        <StyledTableRow key={i}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                            <StyledTableCell component="th" scope="row">
                                                {row?.login || "-"}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {/* {(row?.currentAccountBalance - row?.accountBalance).toFixed(2)} */}
                                                {`${getSymbol(row?.currencyCode)} ${row?.challengeBuyingPrice || "0"}`}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {/* {(row?.currentAccountBalance - row?.accountBalance) < 0 ? ( */}
                                                {row?.challengeBuyingPrice != null ? (
                                                    <MUIButton
                                                        fullWidth={true}
                                                        height="44px"
                                                        width="207px"
                                                        disabled={
                                                            row?.step2Completed && row?.step2Status == "1"
                                                                ? false
                                                                : true
                                                        }
                                                        text={"Start Processing"}
                                                        fontSize="14px"
                                                        fontWeight="600"
                                                        // onClick={() => router.push(`/traders/step-1/${row.login}`)}
                                                        onClick={() =>
                                                            router.push({
                                                                pathname: "/traders/step-1/",
                                                                query: {
                                                                    id: row.login,
                                                                },
                                                            })
                                                        }
                                                    />
                                                ) : null}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )) :
                                        <TableRow>
                                            <TableCell colSpan={12}>
                                                <NoDataFound title={'No Profile Withdrawal Found!'} />
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                    <TextLabel title={"Invoices of your past profit"} fontSize="14px" fontWeight="600" marginBottom={5} />
                    <PaperContainer bodyPadding="0px" padding="0px" sx={{ overflow: "hidden" }}>
                        <TableContainer style={{ padding: "0px", marginBottom: "30px" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <CustomTableHeader headerLabels={invoicesHeaderLabels} />
                                <TableBody>
                                    {invoiceData?.profit_withdrawal_list_data?.length > 0 ? invoiceData?.profit_withdrawal_list_data?.map((row: any) => (
                                        <StyledTableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}  >
                                            <StyledTableCell component="th" scope="row">
                                                {row.accountNumber || "-"}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {moment(row.createdAt || "-").format("DD-MM-YYYY")}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                {/* {getSymbol(row?.currencyCode)} */}
                                                {`${row.withdrawalAmount || "0"}`}
                                            </StyledTableCell>
                                            {/* <StyledTableCell align="right">
                                            <MUIButton
                                                fullWidth={true}
                                                height="44px"
                                                width="207px"
                                                text={"Open"}
                                                fontSize="14px"
                                                fontWeight="600"
                                            />
                                        </StyledTableCell> */}
                                        </StyledTableRow>
                                    )) :
                                        <TableRow>
                                            <TableCell colSpan={12}>
                                                <NoDataFound title={'No Invoices Found!'} />
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </PaperContainer>
                </Grid>
            </Grid> :
            <Grid container spacing={2} xs={12}>
                <Grid item xs={12}>
                    <MUIAlert icon={<ReportGmailerrorredIcon />} variant="outlined" fontSize='14px' severity="warning" description="Payout details will be shown after your Challenge & KYC verification will completed!" />
                </Grid>
            </Grid>
    );
};

export default Payouts;
