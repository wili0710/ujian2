import React from 'react';
import Home from './pages/home'
import './App.css';
import ManageAdmin from './pages/admin'
import {Switch,Route} from 'react-router-dom'
function App() {
  return (
    <div >
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/manageAdmin' component={ManageAdmin}/>
      </Switch>
    </div>
  );
}

export default App;
