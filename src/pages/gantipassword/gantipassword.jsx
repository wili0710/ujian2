import React, { Component,createRef } from 'react';
import './../register/register.css'
import Foto from './../../assets/Homescreen.webp'
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {API_URL} from './../../helpers/idrformat'
import {connect} from 'react-redux';
// import {Redirect, Link} from 'react-router-dom'
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
        passwordlama:createRef(),
        password:createRef(),
        confirmpassword:createRef(),
        alert:''
    }

    OnGantiPasswordClick=()=>{
        const {passwordlama,password,confirmpassword}=this.state
        console.log(this.props.Auth.username)
        var username=this.props.Auth.username
        var passwordlama1=passwordlama.current.value.replace(/\s/g,"")
        var password1=password.current.value.replace(/\s/g,"")
        var confirmpassword1=confirmpassword.current.value.replace(/\s/g,"")
        if(passwordlama==="" || password==="" || confirmpassword===""){
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
        console.log(username,passwordlama1)
        Axios.get(`${API_URL}/users?username=${username}&password=${passwordlama1}`)
        
        .then((res)=>{
            if(res.data){
                // this.updatePayment(username,passwordlama1,password1)
                var id=parseInt(res.data[0].id)
                console.log(res.data[0].id)
                console.log(res.data)
                // Axios.patch(`${API_URL}/users?username=${username}&password=${passwordlama1}`,{
                Axios.patch(`${API_URL}/users/${id}`,{
                    password:password1
                }).catch((err)=>{
                    console.log(err)
                })
                console.log("jalan")
            }else{
                return(
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Password Lama Tidak Sama!',
                      })
                )
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    // updatePayment=(input,input2,input3)=>{
    //     // console.log(temporary)
    //     Axios.patch(`${API_URL}/users?username=${input}&password=${input2}`,{
    //         role:input3,
          // userId: temporary.userId,
          // tanggalPembayaran: temporary.tanggalPembayaran,
          // metode: temporary.metode,
          // buktipembayaran: temporary.buktipembayaran,
          // total: temporary.total    
        // }).then(()=>{
        //     axios.get(`${API_URL}/transactions?status=WaitingAdmin`)
        //     .then((res)=>{
        //         setconfirmpayment(res.data)
        //     }).catch((err)=>{
        //         console.log(err)
        //     })
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }

    render() { 
        const { classes } = this.props;
        console.log(this.props.Auth)
        
        return (
            <div className='row m-0 p-0'>
                <div className='col-md-6 m-0 p-0' style={{height:'100vh'}} >
                    <img width='100%' height='100%' style={{objectFit:'cover'}} src={Foto} alt={'foto'}/>
                </div>
                <div className='col-md-6 m-0 p-0 d-flex justify-content-center align-items-center' style={{background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
                    <div className='login-kotak d-flex px-4'>
                        <h1 className='align-self-center'>Ganti Password</h1>
                        <div className='mt-3'>
                            <TextField 
                                inputProps={{ className:'text-white'}} 
                                className={classes.root} 
                                inputRef={this.state.passwordlama} 
                                InputLabelProps={{
                                    className:'text-white'
                                }}
                                type="password"  
                                label="Password Lama" 
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
                            <button disabled={this.props.Auth.isLoading} onClick={()=>{this.OnGantiPasswordClick()}} className='px-3 py-2 rounded text-white' style={{border:'white 1px solid',backgroundColor:'transparent'}}>
                                Ganti                            </button>
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