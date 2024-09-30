// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateIcon from '@mui/icons-material/Create';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ toggleTheme, darkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/'); // Redirect to home page
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Blog
          </Typography>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
            <IconButton color="inherit">
              <PersonAddIcon />
            </IconButton>
          </Link>
          <Link to="/create-post" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
            <IconButton color="inherit">
              <CreateIcon />
            </IconButton>
          </Link>
          <IconButton onClick={toggleTheme} color="inherit" sx={{ marginLeft: '20px' }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button onClick={handleLogout} color="inherit" sx={{ marginLeft: '20px' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
