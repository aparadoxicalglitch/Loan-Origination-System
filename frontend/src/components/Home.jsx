import React from 'react';
import { Typography, Container, Box, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to LoanEz
          </Typography>
          <Typography variant="h5" paragraph>
            Streamline your loan application process with our state-of-the-art Loan Origination System.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/register"
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <AccountBalanceIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Easy Application
              </Typography>
              <Typography variant="body1">
                Apply for loans quickly and easily with our user-friendly interface.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <SpeedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Fast Processing
              </Typography>
              <Typography variant="body1">
                Experience rapid loan processing and quick decision-making.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <SecurityIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Secure & Confidential
              </Typography>
              <Typography variant="body1">
                Your data is protected with state-of-the-art security measures.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6, mt: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Ready to get started?
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Join thousands of satisfied customers who have streamlined their loan application process with LoanEase.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/register"
            >
              Create an Account
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
