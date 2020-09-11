import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff'
import {Link,NavLink} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  warna:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.warna} position='static'>
        <Toolbar>
            <NavLink to='/'  style={{textDecoration:'none',color:'white'}}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <FlightTakeoff/>
                </IconButton>
            </NavLink> 
          <Typography variant="h6" className={classes.title}>
            JoinTrip
          </Typography>
          <Link to='/manageAdmin' style={{textDecoration:'none',color:'white'}}>
            <Button color="inherit">Admin</Button>
          </Link>
          <Link to='/login' style={{textDecoration:'none',color:'white'}}>
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
