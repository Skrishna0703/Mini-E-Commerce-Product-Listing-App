import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductDetail = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some(item => item.id === product.id);
    if (alreadyInCart) {
      alert('Product is already in the cart.');
    } else {
      addToCart(product);
      alert('Product added to cart successfully!');
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 700,
        width: '100%',
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        mx: 'auto',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        alignItems="center"
        justifyContent="center"
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            height: { xs: 200, sm: 250 },
            width: { xs: '100%', sm: 250 },
            objectFit: 'contain',
            mx: 'auto',
            borderRadius: 2,
          }}
        />

        <CardContent sx={{ flex: 1, px: { xs: 0, sm: 1 } }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {product.description}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
            flexWrap="wrap"
          >
            <Typography variant="subtitle2" color="text.secondary">
              Category: {product.category}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Rating: {product.rating?.rate} ⭐
            </Typography>
          </Stack>

          <Typography variant="h6" color="primary">
            $ {product.price}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default ProductDetail;
