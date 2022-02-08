import React from 'react';
import { ListItemIcon, ListItemText } from '@mui/material';
import { List, ListItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { NavLink } from 'react-router-dom';

export default function SidenavData() {
  const listItemData = [
    { label: 'Dashboard', link: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Fundraiser', link: '/fundraiser', icon: <BusinessCenterIcon /> },
    // { label: 'Cards', link: '/cards', icon: <CreditCardIcon /> },
    // {
    //   label: 'Direct Donation',
    //   link: '/directdonate',
    //   icon: <VolunteerActivismIcon />,
    // },
  ];

  return (
    <List>
      {listItemData.map((item, i) => (
        <ListItem component={NavLink} to={item.link} key={i}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.label}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
