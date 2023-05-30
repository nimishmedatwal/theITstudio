import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiButton-root': {
      alignSelf: 'flex-end',
    },
  },
}));

const MyForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
   
    if (
        formData.name.trim() === '' ||
        formData.phoneNumber.trim() === '' ||
        formData.email.trim() === '' ||
        formData.hobbies.trim() === ''
      ) {
        // Handle validation error, display error message or take necessary action
        return;
      }
  
      fetch('http://localhost:3000/api/form-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data inserted:', data);
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
        });
  
  
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      hobbies: '',
    });
  };
  
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Hobbies"
        name="hobbies"
        value={formData.hobbies}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default MyForm;
