import React from "react";
import moment from "moment";
//mui
import { Box, TableCell, TableRow } from "@mui/material";
//component
import { getSymbol, numberWithCommas } from "@lib/stringAvatar";
import TextLabel from "@components/common/commonTextLabel";
import CommonTable from "@components/common/commonTable";

const DotPointChallenge = ({ statisticsModal }: any) => {
  const DotPointChallengeData = [
    {
      label: "Status",
      value: statisticsModal?.status === 0 ||
        statisticsModal?.status === 1 ||
        statisticsModal?.status === 2
        ? "Ongoing"
        : statisticsModal?.status === 3
          ? "Closed"
          : statisticsModal?.status === 4
            ? "Failed"
            : "-",
    },
    {
      label: "Start",
      value: moment(statisticsModal?.createdAt).format("DD MMM YYYY"),
    },
    {
      label: "End",
      value: moment(statisticsModal?.endChallengeDate).format("DD MMM YYYY"),
    },
    {
      label: "Account Size",
      value: `${getSymbol(statisticsModal?.currencyCode)} ${numberWithCommas(
        statisticsModal?.accountBalance
      )}`,
    },
    {
      label: "Account Type",
      value: statisticsModal?.serverDetail,
    },
    {
      label: `Platfrom (${statisticsModal?.serverDetail})`,
      value: (
        <a
          href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader5.com&utm_campaign=download"
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <TextLabel
            textDecoration="underline"
            fontWeight="400"
            variant="body1"
            title="Download"
            color="#0099CB"
          />
        </a>
      ),
    },
    {
      label: "Last Update",
      value: moment("15 Nov 2023 00:12:43").format("DD MMM YYYY"),
    },
  ];

  return (
    <>
      <TextLabel fontWeight="600" variant="h6" title="Dot Point Challenge" />
      <Box sx={{ marginTop: { sm: "10px", xs: "12px" }, overflowX: "auto" }}>
        <CommonTable
          title={"Objectives"}
          tableBody={
            <>
              {DotPointChallengeData.map((row: any, index: any) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    <TableCell
                      colSpan={!row.hiddenSecond ? 1 : 2}
                      sx={{
                        borderBottom: "none",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      }}
                    >
                      {row.label || "-"}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      {row.value || "-"}
                    </TableCell>
                  </TableRow>
                  {index < DotPointChallengeData.length - 1 && (
                    <TableRow>
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
      {/* {DotPointChallengeData.map((item, index) => (
        <Box sx={{ display: 'flex', borderRadius: '10px', margin: '10px', overflow: 'hidden' }} key={index}>
          <Box sx={{ width: '50%', padding: { md: "10px 10px 10px 30px", sm: "10px 10px 10px 20px", xs: "10px 10px 10px 10px" }, backgroundColor: '#e4f3ff', paddingLeft: '30px' }}>
            <TextLabel variant="subtitle2" title={item.label} />
          </Box>
          <Box sx={{ width: '50%', padding: { md: "10px 30px 10px 20px", sm: "10px 20px 10px 12px", xs: "10px 10px 10px 10px" }, backgroundColor: '#cfe7fa', paddingLeft: '30px' }}>
            <TextLabel variant="subtitle2" title={item.value} />
          </Box>
        </Box>
      ))} */}
    </>
  );
};

export default DotPointChallenge;
