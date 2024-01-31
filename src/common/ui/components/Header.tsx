'use client';

import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from "../mui/MuiThemeProvider.client";

const Header: React.FC = () => {
  const { toggleTheme } = useThemeContext();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Use Typography for menu items and add spacing */}
        <Link href="/" passHref>
          <Typography sx={{cursor: 'pointer', marginRight: 2 }}>
            Home
          </Typography>
        </Link>
        <Link href="/inventory" passHref>
          <Typography sx={{cursor: 'pointer', marginRight: 2 }}>
            Inventory
          </Typography>
        </Link>
        <Link href="/operations" passHref>
          <Typography sx={{ cursor: 'pointer' }}>
            Operations
          </Typography>
        </Link>
        {/* Theme Toggle Switch, aligned to the right */}
        <Switch
          onChange={toggleTheme}
          edge="end"
          sx={{ marginLeft: 'auto' }}  // This pushes the switch to the far right
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
