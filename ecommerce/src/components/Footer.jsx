import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#00acc1',
        color: 'white',
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        

        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Shrikrishnasutar.dev | All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
