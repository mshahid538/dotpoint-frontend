import React from "react";
import PaperContainer from "./PaperContainer";
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


const Demo = ({ title,children1,children2, children3, gridNum }: any) => {
  return (
    <PaperContainer title={title} bodyPadding={"0px"} sx={{overflow:'hidden'}}>
      <Grid container>
        <Grid item lg={gridNum || 6} xs={gridNum || 6}>
          {children1}
        </Grid>
        <Grid item lg={gridNum || 6} xs={gridNum || 6} sx={{ backgroundColor: "#EEEEEE"}} >
          {children2}
        </Grid>
        <Grid item xs={gridNum || 6} >
          {children3}
        </Grid>
      </Grid>
      {/* <Table>
            <TableHead>
              <TableRow>
                <TableCell>Trading Objectives</TableCell>
                <TableCell className={classes.grayText}>Results</TableCell>
                <TableCell>Summary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.column1}</TableCell>
                  <TableCell className={classes.grayText}>{row.column2}</TableCell>
                  <TableCell>{row.column3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
    </PaperContainer>
  );
};

export default Demo;
