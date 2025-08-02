import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Drawer from '@mui/material/Drawer';
import { CartProvider, useCart } from './context/CartContext';
import Footer from './components/Footer';

const AppContent = ({ toggleTheme, darkMode }) => {
  const { cartItems } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCart = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <Navbar
        toggleTheme={toggleTheme}
        isDarkMode={darkMode}
        cartCount={cartItems.length}
        onCartClick={toggleCart}
      />
      <ProductList />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleCart}
        ModalProps={{ keepMounted: true }}
      >
        <Cart />
      </Drawer>
    </>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent toggleTheme={toggleTheme} darkMode={darkMode} />
      </ThemeProvider>
      <Footer />
    </CartProvider>
  );
};

export default App;
