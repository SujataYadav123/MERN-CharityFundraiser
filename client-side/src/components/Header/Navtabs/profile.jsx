import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import axiosInterceptor from '../../../interceptor/interceptor';

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const dropDownData = [
    { label: 'Profile', link: '/dashboard', icon: <ManageAccountsIcon /> },
    {
      label: 'Change Password',
      link: '/change_password',
      icon: <VpnKeyIcon />,
    },
    // { label: 'Logout', link: '/', icon: <LogoutIcon /> },
  ];
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    handleClose();
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    setDialogOpen(false);
    console.log('Clicked Logout');
    try {
      axiosInterceptor.post('http://localhost:5000/users/logout');
      navigate('/');
      console.log('Logged Out');
    } catch (error) {
      console.log({ error: e.message });
    }
  };

  return (
    <Box>
      <IconButton
        aria-describedby="id"
        variant="contained"
        onClick={handleClick}
      >
        <AccountCircleIcon fontSize="large" color="#ffff" />
      </IconButton>

      <Menu
        id="id"
        open={open}
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >
        {dropDownData.map((item, i) => (
          <MenuItem
            key={i}
            component={NavLink}
            to={item.link}
            onClick={handleClose}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
        <MenuItem onClick={handleDialogOpen}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Logout ?'}</DialogTitle>

        <DialogActions>
          <Button
            onClick={handleDialogClose}
            style={{ backgroundColor: '#6CB4EE' }}
          >
            Cancel
          </Button>
          <Button onClick={handleLogout} style={{ backgroundColor: '#DA2C43' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
