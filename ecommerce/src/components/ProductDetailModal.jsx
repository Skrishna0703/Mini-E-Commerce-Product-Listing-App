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
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} p={2} gap={3}>
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
            style={{
              maxWidth: '100%',
              maxHeight: 300,
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        </Box>

        {/* Product Info and Actions */}
        <Box flex={2} display="flex" flexDirection="column" justifyContent="space-between">
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            {product.title}
          </DialogTitle>

          <DialogContent sx={{ px: 0 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Category: <strong>{product.category}</strong>
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Rating: {product.rating?.rate} ⭐
            </Typography>

            {/* Quantity Controls */}
            <Box display="flex" alignItems="center" gap={2} mt={3}>
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
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProductDetailModal;
