import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  CircularProgress,
  Container,
  Alert,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      {/* VPN Info Banner - Always Visible */}
      <Alert
        severity="info"
        sx={{
          mb: 3,
          p: 2,
          fontSize: isMobile ? '0.85rem' : '1rem',
          borderRadius: 2,
        }}
      >
        🌐 <strong>VPN Notice:</strong> This site uses{' '}
        <code>https://fakestoreapi.com</code> which may be restricted in your region. Please enable a{' '}
        <strong>VPN</strong> and connect to a region like <strong>United States</strong> or{' '}
        <strong>Europe</strong> to load product data successfully.
      </Alert>

      {/* Loading Spinner */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
          <CircularProgress size={40} />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, p: 2, borderRadius: 2 }}>
          ❌ Failed to load products. Please check your internet or VPN connection and try again.
        </Alert>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{ mb: 2, fontWeight: 600, textAlign: isMobile ? 'center' : 'left' }}
          >
            🛍️ Featured Products
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductList;
