import React, { useState } from 'react';
import { useStyles } from './HeaderStyles';
import { Drawer } from '@mui/material';
import { Hidden } from '@material-ui/core';
import SidenavData from './SidenavData';

export default function Sidenav() {
  const classes = useStyles();
  const [mobileOpen, setmobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setmobileOpen(!mobileOpen);
  };
  return (
    <nav aria-label="mailbox folders">
      {/* <Drawer
        variant="temporary"
        anchor={'left'}
        open={mobileOpen}
        onClose={handleDrawerOpen}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <SidenavData />
      </Drawer> */}

      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        <SidenavData />
      </Drawer>
    </nav>
  );
}
