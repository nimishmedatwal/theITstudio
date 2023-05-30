import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Form() {

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
        sendDataToMongoDB(formData);
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          hobbies: '',
        });
      };
  
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="hobbies"
                label="Hobbies "
                name="hobbies"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
              
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }