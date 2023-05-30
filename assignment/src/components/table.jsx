import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MyTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/data/${id}`, {
        method: "DELETE",
      });
      fetchData(); // Fetch the updated data after deletion
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
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
                <Button color="secondary" onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
