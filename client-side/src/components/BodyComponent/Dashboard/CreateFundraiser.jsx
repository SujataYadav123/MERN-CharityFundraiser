import { Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { Stack } from '@mui/material';
// import DateAdapter from '@mui/lab/AdapterDateFns';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import Stack from '@mui/material/Stack';
import { Grid, Typography } from '@mui/material';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInterceptor from '../../interceptor/interceptor';

const useStyles = makeStyles({
  paperStyle: {
    width: 540,
    padding: '30px 20px',
    margin: '50px auto',
  },
  btstyle: { marginTop: '30px' },
  textField: {
    marginTop: '20px',
  },
});

const CreateFundraiser = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [date, setDate] = useState('');

  // const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  const submitData = (e) => {
    e.preventDefault();
    console.log(status);

    try {
      axiosInterceptor.post('/tasks', { title, description, date, status });
      alert('Complete');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid>
      <Paper elevation={20} className={classes.paperStyle}>
        <Grid align="center"></Grid>
        <form onSubmit={submitData}>
          <TextField
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
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
            id="description"
            label="Description"
            type="description"
            multiline
            rows={4}
            value={description}
            fullWidth
            onChange={(e) => {
              setDescription(e.target.value);
              // setNameErr('');
            }}
            style={{
              marginTop: '10px',
              alignItems: 'center',
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="Status"
              id="status"
              value={status}
              label="Status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value={'Pending'}>Pending</MenuItem>
              <MenuItem value={'Completed'}>Completed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="date"
            label="Date"
            type="date"
            defaultValue="2017-05-24"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginTop: '10px',
              alignItems: 'center',
            }}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={date}
              // onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            // fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default CreateFundraiser;
