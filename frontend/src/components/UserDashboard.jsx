import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper } from '@mui/material';
import axios from 'axios';

const UserDashboard = () => {
  const [loanStatus, setLoanStatus] = useState(null);
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(`http://localhost:5000/api/loans/status/${user.email}`, config);
        setLoanStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching loan status', error.response.data);
      }
    };

    fetchLoanStatus();
  }, [user.email, user.token]);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome, {user.name}
        </Typography>
        <Paper elevation={3} sx={{ mt: 3, p: 3, width: '100%' }}>
          <Typography variant="h6">Loan Application Status</Typography>
          {loanStatus ? (
            <Typography>Your loan application status: {loanStatus}</Typography>
          ) : (
            <Typography>You haven't applied for a loan yet.</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default UserDashboard;