import React, { Component,createRef } from 'react';
import './register.css'
import Foto from './../../assets/Homescreen.webp'
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {API_URL} from './../../helpers/idrformat'
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom'
import {RegisterThunk,Clearfunc} from './../../redux/Actions'
import Swal from 'sweetalert2';
const Styles={
    root:{
        'input': {
            '&::placeholder': {
           
              color: 'blue'
            },
        },

        '& label.Mui-focused': {
            color: 'white',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
          },
          '& .MuiOutlinedInput-root': {
    
            '& fieldset': {
              borderColor: 'white',
              color:'white'
            },
            '&:hover fieldset': {
              borderColor: 'white',
              color:'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
              border:'3px solid ',
              color:'white'
            },
          },
    }
}

class Register extends Component {
    
    state = {
        username:createRef(),
        password:createRef(),
        confirmpassword:createRef(),
        alert:''
    }

    OnRegisterClick=()=>{
        const {username,password,confirmpassword}=this.state
        var username1=username.current.value.replace(/\s/g,"")
        var usernamecek=username1.toLowerCase()
        var password1=password.current.value.replace(/\s/g,"")
        var confirmpassword1=confirmpassword.current.value.replace(/\s/g,"")
        if(username1==="" || password1===""){
            return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Tidak boleh kosong!',
                  })
            )
        }

        if(password1.length<=6){
            return(
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password harus lebih dari 6 huruf !',
                  })
            )
        }

        var arrSpecialSymbol=("~`!@#$%^&*()_-+=\|]}[{';:,.<>/?"+`"`).split("")
        var arrNumber=("0123456789").split("")
        var arrAlphabetLow=("zxcvbnmlkjhgfdsaqwertyuiop").split("")
        var arrAlphabetHigh=("ZXCVBNMLKJHGFDSAQWERTYUIOP").split("")
        var condSS,condNum,condAL,condAH=false
        console.log(condSS)
        var arrPass=password1.split("")
        var x,z=0

        for(x=0;x<=arrPass.length;x++){
            if(!condSS){
                for(z=0;z<=arrSpecialSymbol.length-1;z++){
                    if(arrPass[x]==arrSpecialSymbol[z]){
                        condSS=true
                        break
                    }
                }
            }
            
            if(!condNum){
                for(z=0;z<=arrNumber.length-1;z++){
                    if(arrPass[x]==arrNumber[z]){
                        condNum=true
                        break
                    }
                }
            }
            if(!condAL){
                for(z=0;z<=arrAlphabetLow.length-1;z++){
                    if(arrPass[x]==arrAlphabetLow[z]){
                        condAL=true
                        break
                    }
                }
            }
            if(!condAH){
                for(z=0;z<=arrAlphabetHigh.length-1;z++){
                    if(arrPass[x]==arrAlphabetHigh[z]){
                        condAH=true
                        break
                    }
                }
            }
        }
        if(condSS,condNum,condAL,condAH==false){
            return(
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password harus ada huruf besar, kecil, angka, dan simbol',
                  })
            )
        }
        if(password1!==confirmpassword1){
            return(
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password Tidak Sama!',
                  })
            )
        }
        this.props.RegisterThunk(username1,usernamecek,password1,"user")
        
        // console.log(username1,password1)
        // Axios.get(`${API_URL}/users?username=${username1}&password=${password1}`)
        // .then((res)=>{
        //     console.log('masuk sini')
        //     console.log(res.data)
        //     if(res.data.length){
        //         localStorage.setItem('id',res.data[0].id)
        //         this.props.LoginFunc(res.data[0])
        //     }else{
        //         console.log('user salah password')
        //         this.setState({alert:'Password / Username salah bro'})
        //     }
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    render() { 
        const { classes } = this.props;
        console.log(this.props.Auth)
        if(this.props.Auth.isLogin){
            return <Redirect to='/'/>
        }
        return (
            <div className='row m-0 p-0'>
                <div className='col-md-6 m-0 p-0' style={{height:'100vh'}} >
                    <img width='100%' height='100%' style={{objectFit:'cover'}} src={Foto} alt={'foto'}/>
                </div>
                <div className='col-md-6 m-0 p-0 d-flex justify-content-center align-items-center' style={{background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
                    <div className='login-kotak d-flex px-4'>
                        <h1 className='align-self-center'>Register</h1>
                        <div className='mt-3'>
                            <TextField 
                                inputProps={{ 
                                    className:'text-white login-placeholder'
                                }} 
                                InputLabelProps={{
                                    className:'text-white'
                                }} 
                                className={classes.root} 
                                inputRef={this.state.username} 
                                label="Username" 
                                fullWidth='true' 
                                variant="outlined" 
                                size='small' 
                            />
                        </div>
                        <div className='mt-3'>
                            <TextField 
                                inputProps={{ className:'text-white'}} 
                                className={classes.root} 
                                inputRef={this.state.password} 
                                InputLabelProps={{
                                    className:'text-white'
                                }}
                                type="password"  
                                label="Password" 
                                fullWidth='true' 
                                variant="outlined" 
                                size='small' 
                            />
                        </div>
                        <div className='mt-3'>
                            <TextField 
                                inputProps={{ className:'text-white'}} 
                                className={classes.root} 
                                inputRef={this.state.confirmpassword} 
                                InputLabelProps={{
                                    className:'text-white'
                                }}
                                type="password"  
                                label="Confirm Password" 
                                fullWidth='true' 
                                variant="outlined" 
                                size='small' 
                            />
                        </div>
                        <div className='mt-3 mb-2'>
                            {
                                this.props.Auth.error?
                                <div className='alert alert-danger'>{this.props.Auth.error} <span onClick={this.props.Clearfunc} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span></div>
                                :
                                null
                            }
                        </div>
                        
                        <div className=' align-self-end '>
                            <button disabled={this.props.Auth.isLoading} onClick={this.OnRegisterClick} className='px-3 py-2 rounded text-white' style={{border:'white 1px solid',backgroundColor:'transparent'}}>
                                Register
                            </button>
                        </div>
                        <div>
                            <span> have account ? <Link to='/login' style={{textDecoration:'none',color:'blue'}}> click here</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const Mapstatetoprops=(state)=>{
    return{
        Auth:state.Auth
    }
}

export default withStyles(Styles) (connect(Mapstatetoprops,{RegisterThunk,Clearfunc})(Register));