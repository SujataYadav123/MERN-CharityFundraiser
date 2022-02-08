import { Avatar, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
// import { Typography } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';

// import { fontSize } from '@mui/system';
const useStyles = makeStyles({
  paperStyle: {
    width: 340,
    padding: '30px 20px',
    margin: '20px auto',
  },
  avatarStyle: {
    backgroundColor: '#1bbd7e',
  },
  btstyle: { marginTop: '30px' },
  textField: {
    marginTop: '20px',
    padding: 0,
  },
});

const Register = () => {
  const navigate = useNavigate();

  const classes = useStyles();

  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  // let url = 'localhost:';

  const submitData = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/users/register', { emailID, password })
      .then(function (res) {
        console.log('email : ' + emailID);
        navigate('/login');
      });

    // setEmailID('');
    // setPassword('');
  };
  // const link = {};
  return (
    <Grid>
      <Paper elevation={20} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: '#1bbd7e' }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2>Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account
          </Typography>
        </Grid>
        <form onSubmit={submitData}>
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
            fullWidth
            style={{
              marginTop: '10px',
              alignItems: 'center',
            }}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
              // setNameErr('');
            }}
            style={{
              marginTop: '10px',
              alignItems: 'center',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            fullWidth
          >
            Sign Up
          </Button>
        </form>
        <Typography style={{ marginTop: '10px' }}>
          <Link to="/">Go back to Login Page</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
