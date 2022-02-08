import React from 'react';
import { Routes, Route } from 'react-router';

import Navbar from './Navbar';
import Sidenav from './Sidenav';
import Dashboards from '../BodyComponent/Dashboard/Dashboards';
import { Box, Grid } from '@material-ui/core';
import { useStyles } from './HeaderStyles';
import Fundraiser from '../BodyComponent/Dashboard/Fundraiser';
import DirectDonate from '../BodyComponent/Dashboard/DirectDonate';
import Cards from '../BodyComponent/Dashboard/Cards';

export default function HeaderComponent() {
  const classes = useStyles;
  const href = window.location.href;
  if (href.includes('/register')) {
    return null;
  } else if (href.includes('/login')) {
    return null;
  } else {
    return (
      <div>
        <Grid direction="column">
          <Grid direction="column">
            <Navbar />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{ backgroundColor: '#f0eef0' }}
          >
            <Grid item sm={2}>
              <Sidenav />
            </Grid>
            <Grid
              item
              sm={10}
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: '5 rem' }}
            ></Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
// <Switch></Switch>;
// <Route exact path="/" render={() => <Dashboard />} />
//       <Route path="/fundraiser" render={() => <Fundraiser />} />
//       <Route path="/cards" render={() => <Cards />} />
//       <Route path="/directdonate" render={() => <DirectDonate />} />
