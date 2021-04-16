import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Signup from './Signup'
import '../App.css'
const App = () => (
  <>
  <Router>
    <Switch>
      <Route exact path = "/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
    </Switch>
  </Router>
  </>
)
export default App