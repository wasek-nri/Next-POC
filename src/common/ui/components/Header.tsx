'use client';

import { Switch } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '../mui/MuiThemeProvider.client';

const Header: React.FC = () => {
  const { toggleTheme } = useThemeContext();

  // Define the style object for the Link components
  const linkStyle = {
    textDecoration: 'none',
    color: '#FFF',
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <MenuItem>
          <Link href="/" passHref style={linkStyle}>
            Home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/inventory/items" passHref style={linkStyle}>
            Inventory
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/operations" passHref style={linkStyle}>
            Operations
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/inventory-hybrid" passHref style={linkStyle}>
            Hybrid Inventory
          </Link>
        </MenuItem>
        {/* Additional MenuItems with styled Links can be added here */}
        {/* Theme Toggle Switch, aligned to the right */}
        <Switch
          onChange={toggleTheme}
          edge="end"
          sx={{ marginLeft: 'auto' }} // This pushes the switch to the far right
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
