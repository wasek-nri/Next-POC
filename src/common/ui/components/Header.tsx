'use client';

import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import { useThemeContext } from "../mui/MuiThemeProvider.client";

const Header: React.FC = () => {
  const { toggleTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* other components */}
        <Switch onChange={toggleTheme} edge="end" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
