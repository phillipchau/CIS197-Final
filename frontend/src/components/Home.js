import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../App.css'

const Home = () => {
  const history = useHistory()
  const logout = async () => {
    const data = await axios.post('/account/logout')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR logging out')
    } else {
      history.push('/')
    }
  }
  return (
    <>
      <h1>Your react app!</h1>
      <button style={{ marginBottom: 5, marginRight: 20, display: 'inline' }} type="button" onClick={logout} className="btn btn-success">Log Out</button>
    </>
  )
}
export default Home
