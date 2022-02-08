import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Grid, Paper } from '@material-ui/core';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    // height: '65vh',
    width: 340,
    margin: '20px auto',
  },
  avatarStyle: {
    backgroundColor: '#52B3BF',
  },
  btstyle: { margin: '8px 0' },
  textField: { margin: '8px 0' },
});

const SignIn = () => {
  // const url = 'http://localhost:27017';
  const classes = useStyles();
  const navigate = useNavigate();

  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Tried');
    try {
      const loggedInUser = await axios.post(
        'http://localhost:5000/users/login',
        {
          withCredentials: true,
          emailID,
          password,
        }
      );
      const { token } = loggedInUser.data;
      localStorage.setItem('jwt', token);
      navigate('/dashboard');
    } catch (error) {
      console.log({ error: e.message });
    }
    console.log('button clicked');

    setEmailID('');
    setPassword('');
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h3>Sign In</h3>
        </Grid>
        {/* <TextField placeholder="emailID" /> */}
        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="emailID"
            label="EmailID"
            name="emailID"
            value={emailID}
            onChange={(e) => {
              setEmailID(e.target.value);
              // setNameErr('');
            }}
            style={{
              marginTop: '10px',
              alignItems: 'center',
            }}
            fullWidth
          />
          <TextField
            required
            id="password"
            label="Password"
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

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.btstyle}
          >
            Sign In
          </Button>
        </form>
        <Typography style={{ marginTop: '5px' }}>
          <Link to="#" underline="always">
            Forgot password ?
          </Link>
        </Typography>
        <Typography>
          Do you have an account ? <Link to="/register">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
