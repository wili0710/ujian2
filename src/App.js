import React, { useEffect,useState } from 'react';
import Home from './pages/home/home'
import './App.css';
import ManageAdmin from './pages/admin/admin'
import {Switch,Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import {connect} from 'react-redux'
import {LoginFunc} from './redux/Actions'
import {API_URL} from './helpers/idrformat'
import Axios from 'axios'
function App(props) {
  const [loading,setloading]=useState(true)
  useEffect(()=>{
    var id=localStorage.getItem('id')
    if(id){ 
      Axios.get(`${API_URL}/users/${id}`)
      .then((res)=>{
        props.LoginFunc(res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setloading(false)
      })
    }else{
      setloading(false)
    }
  },[])
  if(loading){
    return(
      <div>Loadinggg</div>

    )
  }
  return (
    <div >
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/manageAdmin' component={ManageAdmin}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default connect(null,{LoginFunc}) (App);
