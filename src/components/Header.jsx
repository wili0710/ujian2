import React,{useState} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff'
import {Link,NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaUserAstronaut,FaCartArrowDown} from 'react-icons/fa'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import {LogoutFunc} from './../redux/Actions'

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
const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 5,
    color:'white',
    fontSize:11,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    
    padding: '0 0px',
  },
}))(Badge);
function ButtonAppBar({username,isLogin,role,cart}) {
  const classes = useStyles();
  const [anchorEl,setopen]=useState(null)
  const [anchorE2,setopen2]=useState(null)

  console.log(cart)
  const OnLogoutClick=()=>{
    LogoutFunc()
  }
  const rendercart=()=>{
    if(cart.length){

      var isicart=cart.map((val)=>{
        return(
          <MenuItem key={val.id} style={{padding:'10px'}} className="d-flex">
            <div style={{padding:'5px'}}>
              <img width="100px" src={val.product.gambar}/>
              
            </div>
            <div style={{padding:'5px'}} className="d-flex flex-column">
              <div>
                {val.product.namatrip}
              </div>
              <div>
                QTY = {val.qty}
              </div>
            </div>
          </MenuItem>
        )
      })
      return(
        < >
          <div>
            {isicart}
          </div>
          <div style={{padding:'15px', textAlign:"center"}}>
            
            <Link to="/cart">
              Go to cart
              
            </Link>
          </div>
        </>
      )
    }else{
      return(
        <MenuItem>Masih Kosong</MenuItem>
      )
    }
  }

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
          {
            role==='admin'?
            <>
              <Link to='/managePembayaran' style={{textDecoration:'none',color:'white'}}>
                <Button color="inherit">Manage Pembayaran</Button>
              </Link>
              <Link to='/manageAdmin' style={{textDecoration:'none',color:'white'}}>
                <Button color="inherit">Manage Admin</Button>
              </Link>

            </>
            :
            role==='user'?
            <>
              <Link to='/history' style={{textDecoration:'none',color:'white'}}>
                <Button color="inherit" >History</Button>
              </Link>
              <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={(e)=>setopen2(e.currentTarget)}>
                <StyledBadge badgeContent={cart.length} color='secondary' >
                <FaCartArrowDown style={{fontSize:20}}/>
                </StyledBadge>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorE2}
                keepMounted
                open={Boolean(anchorE2)}
                onClose={()=>setopen2(null)}
              >
                {rendercart()}

              </Menu>
            </>
            :
            null
          }
          {
            isLogin?
            <>
              <Button color="inherit" onClick={(e)=>setopen(e.currentTarget)}><FaUserAstronaut/>&nbsp;{username}</Button>
              <Menu
                // id="simple-menu"
                anchorEl={anchorEl}
                // keepMounted
                open={Boolean(anchorEl)}
                onClose={()=>setopen(null)}
                // onClose={handleClose}
              >
                <MenuItem >Profile</MenuItem>
                <Link to='/gantipassword'style={{textDecoration:'none',color:'black'}}>
                  <MenuItem >Ganti Password</MenuItem>
                </Link>
                  
                <MenuItem >My account</MenuItem>
                <a href='/' style={{textDecoration:'none',color:'black'}}>
                  <MenuItem onClick={()=>OnLogoutClick()}>Logout</MenuItem>
                </a>
              </Menu>
            </>
            :
            <div>
              <Link to='/register' style={{textDecoration:'none',color:'white'}}>
                <Button color="inherit">Register</Button>
              </Link>
              <Link to='/login' style={{textDecoration:'none',color:'white'}}>
                <Button color="inherit">Login</Button>
              </Link>

            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const MapstatetoProps=({Auth})=>{
  return {
    ...Auth
  }
}
export default connect(MapstatetoProps,{LogoutFunc})(ButtonAppBar);