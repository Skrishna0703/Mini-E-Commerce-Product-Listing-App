import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: 420 },
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
        boxShadow: { xs: 'none', sm: 3 },
        p: 2,
        overflow: 'hidden',
      }}
    >
      {/* Cart Header */}
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        fontWeight={600}
        gutterBottom
        textAlign="center"
      >
         Your Cart
      </Typography>
      <Divider />

      {/* Product List */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mt: 2,
          pr: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {cartItems.length === 0 ? (
          <Typography variant="body1" textAlign="center" mt={4}>
            Your cart is empty 
          </Typography>
        ) : (
          cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                mb: 2,
                borderRadius: 2,
                bgcolor: '#f9f9f9',
                boxShadow: 1,
              }}
            >
              <Avatar
                variant="rounded"
                src={item.image}
                alt={item.title}
                sx={{ width: 60, height: 60, mb: { xs: 1, sm: 0 } }}
              />

              <Box sx={{ flex: 1, ml: { sm: 2 }, textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography fontSize={14} fontWeight={600} Wrap>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 $ {item.price.toFixed(2)}
                </Typography>

                {/* Quantity Controls */}
                <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                  <IconButton
                    size="small"
                    onClick={() => decreaseQuantity(item.id)}
                    sx={{ border: '1px solid #ccc', borderRadius: 1 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography mx={1}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => increaseQuantity(item.id)}
                    sx={{ border: '1px solid #ccc', borderRadius: 1 }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <IconButton
                onClick={() => removeFromCart(item.id)}
                color="error"
                size="small"
                sx={{ mt: { xs: 1, sm: 0 } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Box>

      {/* Total and Checkout */}
      <Divider />
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          textAlign="right"
          fontSize={{ xs: 14, sm: 16 }}
        >
          Total: ${getTotalPrice()}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 1, py: 1, borderRadius: 2 }}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </Box>

      {/* Footer */}
      <Box
        mt={3}
        textAlign="center"
        fontSize={{ xs: 10, sm: 12 }}
        color="text.secondary"
      >
        © {new Date().getFullYear()} MiniCart App. All rights reserved.
      </Box>
    </Box>
  );
};

export default Cart;
