import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import Navbar from '../../Header/Navbar';
import Sidenav from '../../Header/Sidenav';
import axiosInterceptor from '../../../interceptor/interceptor';

export default function Dashboards() {
  const [counts, setCounts] = useState(null);
  const [fundraiserInfo, setFundraiserInfo] = useState('0');
  const countFundraisers = async () => {
    try {
      const { data } = await axiosInterceptor.get('/fundraisers');
      setCounts(data.length);
    } catch (e) {
      console.log('Fetch error');
    }
  };
  useEffect(() => {
    countFundraisers();
  }, []);
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
          style={{ backgroundColor: '#f0eef0', height: '100vh' }}
        >
          <Grid item sm={2}>
            <Sidenav />
          </Grid>
          <Grid
            item
            sm={10}
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: '100px' }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              rowGap={2}
              columnGap={2}
            >
              <Grid xs={3}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Donations
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Expedita nobis, quia neque at cumque facilis hic nam
                      corporis nostrum facere?
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={3}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h4"
                      color="text.secondary"
                      style={{ textAlign: 'center' }}
                    >
                      Fundraisers
                    </Typography>
                    <Typography
                      variant="h2"
                      component="h4"
                      style={{ textAlign: 'center' }}
                    >
                      {counts}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
