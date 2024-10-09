import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/loans', config);
        setLoans(response.data);
        setFilteredLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans', error.response.data);
      }
    };

    fetchLoans();
  }, [user.token]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredLoans(loans);
    } else {
      setFilteredLoans(loans.filter(loan => loan.status === statusFilter));
    }
  }, [statusFilter, loans]);

  const updateLoanStatus = async (id, newStatus) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.patch(`http://localhost:5000/api/loans/${id}`, { status: newStatus }, config);
      setLoans(loans.map(loan => loan._id === id ? { ...loan, status: newStatus } : loan));
    } catch (error) {
      console.error('Error updating loan status', error.response.data);
    }
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Dashboard
        </Typography>
        <Paper elevation={3} sx={{ mt: 3, p: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Loan Applications</Typography>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="status-filter-label">Status Filter</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Status Filter"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="submitted">Submitted</MenuItem>
                <MenuItem value="in review">In Review</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLoans.map((loan) => (
                  <TableRow key={loan._id}>
                    <TableCell>{loan.name}</TableCell>
                    <TableCell>{loan.email}</TableCell>
                    <TableCell>${loan.amount}</TableCell>
                    <TableCell>{loan.purpose}</TableCell>
                    <TableCell>{loan.status}</TableCell>
                    <TableCell>
                      <Button onClick={() => updateLoanStatus(loan._id, 'approved')} disabled={loan.status === 'approved'}>
                        Approve
                      </Button>
                      <Button onClick={() => updateLoanStatus(loan._id, 'rejected')} disabled={loan.status === 'rejected'}>
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
