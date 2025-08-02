import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Divider,
  Rating,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductDetailModal = ({ open, onClose, product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleQuantityChange = (value) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(product, quantity);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        p={2}
        gap={3}
        alignItems="center"
      >
        {/* Product Image Section */}
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="#f9f9f9"
          borderRadius={2}
          p={2}
        >
          <img
            src={product.image}
            alt={product.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150';
            }}
            style={{
              maxWidth: '100%',
              maxHeight: 300,
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        </Box>

        {/* Product Info Section */}
        <Box flex={2} display="flex" flexDirection="column" justifyContent="space-between">
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', pb: 0 }}>
            {product.title}
          </DialogTitle>

          <DialogContent sx={{ px: 0, pt: 1 }}>
            {/* Category */}
            <Chip
              label={product.category?.toUpperCase()}
              size="small"
              sx={{
                mb: 2,
                backgroundColor: '#e0f7fa',
                color: '#00bcd4',
                fontWeight: 'bold',
              }}
            />

            {/* Description */}
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Rating */}
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Rating
                name="read-only"
                value={product.rating?.rate || 0}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                ({product.rating?.count || 0})
              </Typography>
            </Box>

            {/* Price */}
            <Typography
              variant="h6"
              sx={{ color: 'error.main', fontWeight: 'bold', mb: 2 }}
            >
              ${product.price}
            </Typography>

            {/* Quantity Controls */}
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body1">Quantity:</Typography>
              <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={1}>
                <IconButton size="small" onClick={() => handleQuantityChange(quantity - 1)}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <TextField
                  value={quantity}
                  type="number"
                  size="small"
                  variant="standard"
                  inputProps={{ min: 1, style: { textAlign: 'center' } }}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  sx={{ width: 40 }}
                />
                <IconButton size="small" onClick={() => handleQuantityChange(quantity + 1)}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Add to Cart Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddToCart}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: '#00bcd4',
                '&:hover': {
                  backgroundColor: '#00acc1',
                },
              }}
            >
              🛒 Add to Cart
            </Button>
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProductDetailModal;
