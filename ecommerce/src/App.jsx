import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Drawer } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer'; // ✅ import footer
import { CartProvider, useCart } from './context/CartContext';

const AppContent = () => {
  const { cartItems, toggleCart, isCartOpen } = useCart();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mini E-Commerce
          </Typography>
          <IconButton color="inherit" onClick={toggleCart}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <ProductList />

      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <Cart />
      </Drawer>

      <Footer /> 
    </>
  );
};

const App = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);

export default App;
