import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Signup from './Signup'
import Feed from './Feed'

const App = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home/:id">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
      </Switch>
    </Router>
  </>
)
export default App
