import React from 'react';
import { AppBar, Hidden, Toolbar, Typography } from '@mui/material';
import Profile from './Navtabs/profile';
import { useStyles } from './HeaderStyles';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" component="div">
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            Halo
          </Link>
        </Typography>
        <Hidden mdDown>
          <Box style={{ display: 'flex' }}>
            <Typography style={{ margin: 'auto' }}>Admin</Typography>
            <Profile />
          </Box>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            onClick={() => console.log('Clicked Menu Icon')}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
