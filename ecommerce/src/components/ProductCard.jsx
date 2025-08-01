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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ProductDetailModal from './ProductDetailModal';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Card
        sx={{
          width: isMobile ? '90%' : 300,
          height: '100%',
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
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
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
          <Tooltip title={product.title}>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {product.title}
            </Typography>
          </Tooltip>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: 48,
            }}
          >
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            $ {product.price}
          </Typography>
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
            sx={{ textTransform: 'none' }}
          >
            View Details
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => addToCart(product)}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <ProductDetailModal
        open={open}
        onClose={() => setOpen(false)}
        product={product}
        onAddToCart={addToCart}
      />
    </>
  );
};

export default ProductCard;
