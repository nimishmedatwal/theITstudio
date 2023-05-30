import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const data = [
  { id: 1, name: 'John Doe', phoneNumber: '1234567890', email: 'john@example.com', hobbies: 'Reading' },
  { id: 2, name: 'Jane Smith', phoneNumber: '9876543210', email: 'jane@example.com', hobbies: 'Gardening' },
  // Add more data as needed
];

const MyTable = () => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="my table">
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Hobbies</TableCell>
            <TableCell>Update/Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.hobbies}</TableCell>
              <TableCell>
                <Button color="primary">Update</Button>
                <Button color="secondary">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
