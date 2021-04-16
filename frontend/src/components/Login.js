import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import '../App.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const signin = async () => {
    const data = await axios.post('/account/login', { username, password })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('An error occured while logging in')
    } else {
      history.push('/')
    }
  }
  return (
    <>
      <div id="loginbody" className="bg-light">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h1>PennConnects</h1>
                  <h2 className="text-secondary">Login</h2>
                  <form onSubmit={e => {
                    e.preventDefault()
                    signin()
                    setUsername('')
                    setPassword('')
                  }}
                  >
                    <div className="form-group">
                      <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} type="text" id="username" name="username" placeholder="Username" required />
                    </div>
                    <div className="form-group">
                      <input className="form-control" value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    <div className="form-group form-row">
                      <button type="submit" className="btn btn-primary">Log In</button>
                      <p className="signup-margin text-secondary">
                        New to PennConnects?
                        <Link to="/signup"> Sign Up Here</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-secondary bot-margin">Created by G08</p>
      </div>
    </>
  )
}
export default Login
