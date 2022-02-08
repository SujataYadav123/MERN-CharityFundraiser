import React, { useState, useEffect } from 'react';
import axiosInterceptor from '../../../interceptor/interceptor';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Paper,
  TextField,
  Card,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Sidenav from '../../Header/Sidenav';
import Navbar from '../../Header/Navbar';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

// import axiosInterceptor from '../../interceptor/interceptor';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Fundraiser() {
  const navigate = useNavigate;
  const [fundraiserInfo, setFundraiserInfo] = useState([]);
  const [editFundraiserInfo, setEditFundraiserInfo] = useState('');

  const [iD, setID] = useState(0);
  const [open, setOpen] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [requiredAmt, setRequiredAmt] = useState('');
  const [receivedAmt, setReceivedAmt] = useState('');
  const [status, setStatus] = useState('');
  const [eopen, setEOpen] = useState(false);
  const [eiD, setEID] = useState(0);
  const [ename, setEName] = useState('');
  const [estartDate, setEStartDate] = useState('');
  const [eendDate, setEEndDate] = useState('');
  const [erequiredAmt, setERequiredAmt] = useState('');
  const [ereceivedAmt, setEReceivedAmt] = useState('');
  const [estatus, setEStatus] = useState('');
  // const [editID, setEditID] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);

  // const navigate = useNavigate();
  const getAllFundraisers = async () => {
    try {
      const { data } = await axiosInterceptor.get('/fundraisers');
      setFundraiserInfo(data);
    } catch (e) {
      console.log('Fetch error');
    }
  };

  useEffect(() => {
    getAllFundraisers();
  }, []);

  const openEdit = () => {
    setEOpen(true);
  };
  //Create Edit Modal handle function
  const handleEditModal = async (id) => {
    const { data } = await axiosInterceptor.get('/fundraisers/' + id);
    // console.log(data);
    setEID(id);
    setEName(() => {
      return data.name;
    });
    setEStartDate(() => {
      return data.startDate;
    });
    setEEndDate(() => {
      return data.endDate;
    });
    setERequiredAmt(() => {
      return data.requiredAmt;
    });
    setEReceivedAmt(() => {
      return data.receivedAmt;
    });
    setEStatus(() => {
      return data.status;
    });

    openEdit();
  };
  //Edit Form
  const submitEData = (e) => {
    e.preventDefault();
    console.log(ename);
    try {
      axiosInterceptor.patch('/fundraisers/' + eiD, {
        name: ename,
        startDate: estartDate,
        endDate: eendDate,
        requiredAmt: erequiredAmt,
        receivedAmt: ereceivedAmt,
        status: estatus,
      });
      setEID('');
      setEName('');
      setEStartDate('');
      setEEndDate('');
      setERequiredAmt('');
      setEReceivedAmt('');
      setEStatus('');
      console.log('Edited Fundraiser');
    } catch (e) {
      console.log('Cannot Edit fundraiser');
    }
  };
  //Submit form
  const submitData = (e) => {
    e.preventDefault();
    try {
      axiosInterceptor.post('/fundraisers/create', {
        name,
        startDate,
        endDate,
        requiredAmt,
        receivedAmt,
        status,
      });
      console.log('Created Fundraiser');
    } catch (e) {
      console.log('Cannot Submit data');
    }
    setName('');
    setStartDate('');
    setEndDate('');
    setRequiredAmt('');
    setReceivedAmt('');
    setStatus('');
  };
  // const ehandleOpen = () => setEOpen(true);

  const ehandleClose = () => {
    setEOpen(false);
    setEID('');
    setEName('');
    setEStartDate('');
    setEEndDate('');
    setERequiredAmt('');
    setEReceivedAmt('');
    setEStatus('');
  };
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setID('');
    setName('');
    setStartDate('');
    setEndDate('');
    setRequiredAmt('');
    setReceivedAmt('');
    setStatus('');
  };
  //Delete dialog handle function
  const handleDialogOpen = (id) => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    console.log('Clicked Delete');
    try {
      axiosInterceptor
        .delete('http://localhost:5000/fundraisers/' + iD)
        .then(() => console.log('Data deleted'));
    } catch (error) {
      console.log('Delete Error');
    }
    setDialogOpen(false);
    // navigate('/fundraiser');
  };

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
            style={{ marginTop: '100px' }}
          >
            <Grid
              justifyContent="center"
              alignItems="center"
              style={{ width: '850px', margin: 'auto' }}
            >
              <div style={{ marginTop: '10px' }}>
                <Button
                  onClick={handleOpen}
                  style={{
                    backgroundColor: '#00308F',
                    color: '#ffff',
                    border: '1px solid blue',
                    float: 'right',
                    marginRight: '5rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  Create Fundraiser
                </Button>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Card style={{ width: '400px' }}>
                    <form
                      onSubmit={submitData}
                      style={{ width: '350px', margin: '1rem 1rem' }}
                    >
                      <TextField
                        id="name"
                        label="Name"
                        defaultValue={name}
                        value={name}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                          // setNameErr('');
                        }}
                        fullWidth
                        style={{
                          marginTop: '10px',
                          alignItems: 'center',
                        }}
                      />

                      <TextField
                        id="startDate"
                        label="StartDate"
                        type="date"
                        defaultValue={startDate}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{
                          marginTop: '10px',
                          alignItems: 'center',
                        }}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />

                      <TextField
                        id="endDate"
                        label="EndDate"
                        type="date"
                        defaultValue={endDate}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{
                          marginTop: '10px',
                          alignItems: 'center',
                        }}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                      <FormControl
                        fullWidth
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        <InputLabel htmlFor="outlined-adornment-amount">
                          RequiredAmt
                        </InputLabel>
                        <OutlinedInput
                          id="requiredAmt"
                          type="number"
                          value={requiredAmt}
                          onChange={(e) => {
                            setRequiredAmt(e.target.value);
                          }}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          label="Amount"
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        <InputLabel htmlFor="outlined-adornment-amount">
                          ReceivedAmt
                        </InputLabel>
                        <OutlinedInput
                          id="receivedAmt"
                          type="number"
                          value={receivedAmt}
                          onChange={(e) => {
                            setReceivedAmt(e.target.value);
                          }}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          label="Amount"
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        style={{
                          marginTop: '10px',
                        }}
                      >
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
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                        fullWidth
                      >
                        Create
                      </Button>
                    </form>
                  </Card>
                </Modal>

                <Modal
                  open={eopen}
                  onClose={ehandleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Card style={{ width: '400px' }}>
                    <form
                      onSubmit={submitEData}
                      style={{ width: '350px', margin: '1rem 1rem' }}
                    >
                      <TextField
                        id="ename"
                        label="Name"
                        defaultValue={ename}
                        value={ename}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setEName(e.target.value);
                          // seteNameErr('');
                        }}
                        fullWidth
                        style={{
                          marginTop: '10px',
                          alignItems: 'center',
                        }}
                      />

                      <TextField
                        id="estartDate"
                        label="StartDate"
                        type="date"
                        defaultValue={estartDate}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{
                          marginTop: '10px',
                          alignItems: 'center',
                        }}
                        onChange={(e) => {
                          setEStartDate(e.target.value);
                        }}
                      />

                      <TextField
                        id="eendDate"
                        label="EndDate"
                        type="date"
                        defaultValue={eendDate}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{
                          marginTop: '10px',
                          alignItems: 'center',
                        }}
                        onChange={(e) => {
                          setEEndDate(e.target.value);
                        }}
                      />
                      <FormControl
                        fullWidth
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        <InputLabel htmlFor="outlined-adornment-amount">
                          RequiredAmt
                        </InputLabel>
                        <OutlinedInput
                          id="erequiredAmt"
                          type="number"
                          value={erequiredAmt}
                          onChange={(e) => {
                            setERequiredAmt(e.target.value);
                          }}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          label="Amount"
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        <InputLabel htmlFor="outlined-adornment-amount">
                          ReceivedAmt
                        </InputLabel>
                        <OutlinedInput
                          id="ereceivedAmt"
                          type="number"
                          value={ereceivedAmt}
                          onChange={(e) => {
                            setEReceivedAmt(e.target.value);
                          }}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          label="Amount"
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                          // labelId="Status"
                          id="estatus"
                          value={estatus}
                          label="Status"
                          onChange={(e) => {
                            setEStatus(e.target.value);
                          }}
                        >
                          <MenuItem value={'Pending'}>Pending</MenuItem>
                          <MenuItem value={'Completed'}>Completed</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                        fullWidth
                      >
                        Edit
                      </Button>
                    </form>
                  </Card>
                </Modal>
                <Dialog
                  open={dialogOpen}
                  onClose={handleDialogClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Confirm Delete ?'}
                  </DialogTitle>

                  <DialogActions>
                    <Button
                      onClick={handleDialogClose}
                      style={{ backgroundColor: '#6CB4EE' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDelete}
                      style={{ backgroundColor: '#DA2C43' }}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <TableContainer
                component={Paper}
                // sx={{ maxWidth: 650 }}
                style={{ margin: 'auto' }}
              >
                <Table aria-label="create table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="left">SN.</StyledTableCell>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="left">Start Date</StyledTableCell>
                      <StyledTableCell align="left">End Date</StyledTableCell>
                      <StyledTableCell align="left">
                        Required Amount
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Received Amount
                      </StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                      <StyledTableCell align="left">Action</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {fundraiserInfo.map((fundraiser, index) => (
                      <StyledTableRow key={fundraiser._id}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {fundraiser.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {fundraiser.startDate}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {fundraiser.endDate}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {fundraiser.requiredAmt}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {fundraiser.receivedAmt}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {fundraiser.status}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Box style={{ display: 'flex' }}>
                            <Button
                              onClick={() => {
                                console.log(
                                  'fundraiser _id : ' +
                                    fundraiser._id +
                                    '\n startDate: ' +
                                    fundraiser.startDate
                                );

                                handleEditModal(fundraiser._id);
                              }}
                            >
                              <Avatar>
                                <EditRoundedIcon color="success" />
                              </Avatar>
                            </Button>
                            <Button
                              onClick={() => {
                                handleDialogOpen(fundraiser._id);
                              }}
                            >
                              <Avatar>
                                <DeleteRoundedIcon sx={{ color: pink[500] }} />
                              </Avatar>
                            </Button>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
