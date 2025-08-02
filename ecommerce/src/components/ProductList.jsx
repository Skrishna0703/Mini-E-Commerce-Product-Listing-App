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
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from './ProductCard';

const categories = [
  'All Categories',
  'Electronics',
  'Jewelery',
  "Men's Clothing",
  "Women's Clothing",
];

const ProductList = ({ toggleTheme, isDarkMode }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setFiltered(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    filterProducts(searchTerm, selectedCategory);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (term, category) => {
    const lowerTerm = term.toLowerCase();
    let result = products;

    if (category !== 'All Categories') {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (lowerTerm) {
      result = result.filter((p) => p.title.toLowerCase().includes(lowerTerm));
    }

    setFiltered(result);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
        {/* Search Field */}
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          size="small"
          fullWidth={isMobile}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Category Filter Buttons */}
      <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => handleCategoryClick(category)}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: selectedCategory === category ? '#00acc1' : undefined,
              color: selectedCategory === category ? '#fff' : undefined,
              '&:hover': {
                backgroundColor: selectedCategory === category ? '#00acc1' : undefined,
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
          <CircularProgress size={40} />
        </Box>
      )}

      {/* Error */}
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
            🛍️ Featured Products ({filtered.length})
          </Typography>
          <Grid container spacing={4}>
            {filtered.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
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
