import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    flexGrow: 'row wrap',
    justifyContent: 'space-between',
  },
  logo: {
    color: '#ffff',
    textDecorationStyle: 'none',
  },
  buttons: {
    border: '5px solid white',
    color: 'yellow',
  },
  navList: {
    minWidth: '250px',
    maxWidth: '300px',
  },
  //Sidenav
  drawerPaper: {
    marginTop: '75px',
  },
  //wrapper of main container ie. headerComponent
  gridComponent: {
    marginLeft: '5rem',
  },
  passwordForm: {
    maxWidth: '500px',
  },
}));
