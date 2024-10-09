import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoanApplication = () => {
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('http://localhost:5000/api/loans', { amount, purpose, name: user.name, email: user.email }, config);
      navigate('/dashboard');
    } catch (error) {
      console.error('Loan application error', error.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Apply for a Loan
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Loan Amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="purpose"
            label="Loan Purpose"
            name="purpose"
            multiline
            rows={4}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Application
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoanApplication;
