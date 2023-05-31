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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MyForm from './form2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MyTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data");
      const jsonData = await response.json();
      if (Array.isArray(jsonData)) {
        setData(jsonData);
      }
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

  const handleSendEmail = () => {
    // Extract the selected row data based on the selectedRows state
    const selectedData = data.filter((row) => selectedRows.includes(row.id));
    console.log(selectedData);
    fetch("http://localhost:3000/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent:", data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleCheckboxChange = (event, id) => {
    const checked = event.target.checked;
    setSelectedRows((prevSelectedRows) => {
      if (checked) {
        console.log(id);
        return [...prevSelectedRows, id];
      } else {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      }
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TableContainer>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MyForm />
        </Box>
      </Modal>
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
                <Checkbox
                  checked={selectedRows.includes(row.id)}
                  onChange={(event) => handleCheckboxChange(event, row.id)}
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.hobbies}</TableCell>
              <TableCell>
                <Button color="primary">Update</Button>
                <Button
                  color="secondary"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" sx={{mt:2}} color="primary" onClick={handleSendEmail}>
        Send Email
      </Button>
    </TableContainer>
  );
};

export default MyTable;
