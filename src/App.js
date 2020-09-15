import React, { useEffect,useState } from 'react';
import Home from './pages/home/home'
import './App.css';
// import {
//   Home,
//   Admin
// } from './pages'
import ManageAdmin from './pages/admin/admin'
import ListProd from './pages/Listprod'
import NotFound from './pages/notfound'
import {Switch,Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import {connect} from 'react-redux'
import {LoginFunc} from './redux/Actions'
import {API_URL} from './helpers/idrformat'
import Axios from 'axios'
import Cart from './pages/cart'
import DetailProd from './pages/detailprod'
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

  const renderProtectedroutesadmin=()=>{
    if(props.role=='admin'){
      return(
        <>
          <Route exact path='/manageAdmin' component={ManageAdmin}/>
        </>
      )
    }
  }

  return (
    <div >
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/products' component={ListProd}/>
        <Route path='/products/:id' component={DetailProd}/>
        <Route path='/cart' component={Cart}/>
        {renderProtectedroutesadmin()}
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}
const MapstatetoProps=({Auth})=>{
  return{
    // ...Auth,
    username:Auth.username,
    isLogin:Auth.isLogin,
    role:Auth.role
    // username:Auth.username
    // username:'dino',
    // sd
  }
}
export default connect(MapstatetoProps,{LoginFunc}) (App);
