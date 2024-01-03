import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
//mui
import { styled } from "@mui/material/styles";
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  tableCellClasses,
  TableCell,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
//component
import { leader_board } from "@redux/Redux/Actions";
import Assets from "@components/common/image_container";
import FooterContent from "@components/common/footerContent";
import TextLabel from "@components/common/commonTextLabel";
import PaperContainer from "@components/common/PaperContainer";
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import usePageLoader from "@redux/hooks/usePageLoader";
import { lightTheme } from "@redux/theme";
import { numberWithCommas } from "@lib/stringAvatar";
import CustomPagination from "@components/common/customPagination";

const useStyles = makeStyles()((theme) => {
  return {
    thead: {
      "& .MuiTableCell-root": {
        // border: "none !important",
      },
    },
  };
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "poppins",
  fontWeight: "500",
  fontSize: "14px",
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
  [`&.${tableCellClasses.head}`]: {
    color: "#0099CB",
    fontWeight: 600,
    fontSize: "16px",
    background: theme.palette.background.paper,
    // border: '0px'
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Breadcrumb {
  label: ReactNode;
  path: string;
}
interface LeaderboardProps {
  children: ReactNode;
  breadcrumb: Breadcrumb[];
  breadcrumbTitle: string;
  description?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ }) => {
  //Hooks
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const setFullPageLoader = usePageLoader();
  //State
  const [leaderBoard, setLeaderBoard] = React.useState<any>([]);
  const backgroundColors = ["","#FFCC00", "#EEE", "#C5A886"];
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState<any>(0)
  const [page, setPage] = React.useState<any>(0);
  const breadcrumbsData: Breadcrumb[] = [
    {
      label: "Trader",
      path: "/",
    },
    {
      label: "Traders League",
      path: "#",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const body = {
          page: page + 1,
          limit: rowsPerPage,
        };
        const res = await dispatch(leader_board(body));
        if (res?.payload?.status === 200) {
          setFullPageLoader(true);
          setLeaderBoard(res?.payload?.data);
          setTotalPages(res?.payload?.data?.state?.data_count)
          setFullPageLoader(false)
        } else {
          setFullPageLoader(false)
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    })();
  }, [rowsPerPage, page]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: any) => {
    setRowsPerPage(value);
    setPage(0);
  };

  // tradingAccount?.tradingAccounts?.filter((item: any) => item?.login === id)?.[0]?.challengeBuyingPrice
  return (
    <>
      <BreadcrumbLayout
        breadcrumb={breadcrumbsData}
        breadcrumbTitle="Traders League"
      >
        <PaperContainer bodyPadding="0px" title={"Traders League"}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="left"
                    sx={{ width: "0px" }}
                  >Rank</StyledTableCell>
                  <StyledTableCell align="center">#</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Profit</StyledTableCell>
                  <StyledTableCell align="left">Equity</StyledTableCell>
                  <StyledTableCell align="left">Account Size</StyledTableCell>
                  <StyledTableCell align="left">Gain%</StyledTableCell>
                  <StyledTableCell align="left">Country</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.thead}>
                {leaderBoard?.leaderData?.map((item: any, index: any) => (
                  <StyledTableRow key={item?.name}>
                    <StyledTableCell align="center">{item?.index}</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{
                        textAlign: "center",
                        width: "40px",
                        backgroundColor:
                        item?.index < 4 ? backgroundColors[item?.index] : "transparent",
                      }}
                    >
                      <Assets
                        src="/assets/icons/liner.svg"
                        absolutePath={true}
                        style={{
                          filter:
                          item?.index < 4
                              ? ""
                              : "invert(30%) sepia(51%) saturate(15%) hue-rotate(318deg) brightness(102%) contrast(92%)", // Apply filter for other items
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">{`${item?.firstName || "-"} ${item?.lastName || "-"
                      }`}</StyledTableCell>
                    <StyledTableCell align="left">
                      {numberWithCommas(item?.profit || "0")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {numberWithCommas(item?.equity || "0")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {numberWithCommas(item?.accountSize || "0")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item?.gain || "0"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {item?.country || "-"}
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
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
          <TextLabel
            padding="20px"
            fontStyle="italic"
            variant="body1"
            color={lightTheme.palette.bgGray.main}
            title={"*The Traders League includes active accounts only. If you do not wish to have your account displayed on the traders league, please email us at support@dotpoint.com."}
          />
        </PaperContainer>
        <FooterContent />
      </BreadcrumbLayout >
    </>
  );
};

export default Leaderboard;
