import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MyTable = () => {
  const data = [
    { id: 1, name: 'John', maxLoss: 100, result1: 10, result2: 20, result3: 30, target1: 15, target2: 25, target3: 35, percentage1: 50, percentage2: 60, percentage3: 70 },
    // Add more data as needed
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2}>ID</TableCell>
            <TableCell rowSpan={2}>Name</TableCell>
            <TableCell colSpan={3} align='center'>Max Loss</TableCell>
            <TableCell colSpan={3} align='center'>Profit</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Target 1</TableCell>
            <TableCell>Target 2</TableCell>
            <TableCell>Target 3</TableCell>
            <TableCell>Percentage 1</TableCell>
            <TableCell>Percentage 2</TableCell>
            <TableCell>Percentage 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.target1}</TableCell>
              <TableCell>{row.target2}</TableCell>
              <TableCell>{row.target3}</TableCell>
              <TableCell>{row.percentage1}</TableCell>
              <TableCell>{row.percentage2}</TableCell>
              <TableCell>{row.percentage3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
