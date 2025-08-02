import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Tooltip,
  useMediaQuery,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ProductDetailModal from './ProductDetailModal';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const { addToCart, cartItems } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddToCart = () => {
    const exists = cartItems.some(item => item.id === product.id);
    if (exists) {
      alert('Product is already in the cart.');
    } else {
      addToCart(product);
      alert('Product added to cart!');
    }
  };

  return (
    <>
      <Card
        sx={{
          width: isMobile ? '90%' : 300,
          minHeight: 460,
          borderRadius: 3,
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
          mx: 'auto',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            height: 170,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            p: 2,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150';
            }}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, px: 2 }}>
          <Chip
            label={product.category?.toUpperCase()}
            size="small"
            sx={{
              mb: 1,
              backgroundColor: theme.palette.mode === 'light' ? '#e0f7fa' : '#004d40',
              color: 'primary.main',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          />

          <Tooltip title={product.title}>
            <Typography
              variant="subtitle1"
              Wrap
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {product.title}
            </Typography>
          </Tooltip>

          {/* <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              minHeight: 60,
            }}
          >
            {product.description}
          </Typography> */}

          <Typography
            variant="h6"
            sx={{ mt: 1, color: 'error.main', fontWeight: 'bold' }}
          >
            ${product.price}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Rating
              name="read-only"
              value={product.rating?.rate || 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              ({product.rating?.count || 0})
            </Typography>
          </Box>
        </CardContent>

        <CardActions
          sx={{
            justifyContent: 'space-between',
            px: 2,
            pb: 2,
            pt: 0,
          }}
        >
          <Button
            size="small"
            onClick={() => setOpen(true)}
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderColor: '#00bcd4',
              color: '#00bcd4',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#00bcd4',
                color: 'white',
              },
            }}
          >
            View Details
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              py: 1,
              backgroundColor: '#00bcd4',
              '&:hover': {
                backgroundColor: '#00acc1',
              },
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>

      <ProductDetailModal
        open={open}
        onClose={() => setOpen(false)}
        product={product}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductCard;
