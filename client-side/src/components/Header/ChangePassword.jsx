import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import LockIcon from '@mui/icons-material/Lock';
import Navbar from './Navbar';
import axiosInterceptor from '../../interceptor/interceptor';

const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    // height: '65vh',
    width: 340,
    marginTop: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  avatarStyle: {
    backgroundColor: '#52B3BF',
  },
  btstyle: { margin: '8px 0' },
  textField: { margin: '8px 0' },
});

const ChangePassword = () => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        axiosInterceptor.patch('http://localhost:5000/users/password', {
          password,
        });
      } catch (e) {
        console.log('Password Save Error !!');
      }
    } else {
      console.log("Passwords doesn't match!!");
    }
  };
  return (
    <div>
      <Grid direction="column">
        <Grid direction="column">
          <Navbar />
        </Grid>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarStyle}>
                <LockIcon fontSize="large" />
              </Avatar>
              <h2>Change Password</h2>
            </Grid>
            {/* <TextField placeholder="emailID" /> */}
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="password"
                label="New Password"
                name="password"
                type="password"
                value={password}
                fullWidth
                onChange={(e) => {
                  setPassword(e.target.value);
                  // setPasswordErr('');
                }}
                // className={classes.textField}
                style={{
                  marginTop: '10px',
                  alignItems: 'center',
                }}
              />
              <TextField
                required
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                fullWidth
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  // setPasswordErr('');
                }}
                // className={classes.textField}
                style={{
                  marginTop: '15px',
                  alignItems: 'center',
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginTop: '15px',
                }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default ChangePassword;
