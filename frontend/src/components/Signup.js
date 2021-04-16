import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import '../App.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [first_name, setFName] = useState('')
  const [last_name, setLName] = useState('')
  const [description, setDescription] = useState('')

  const history = useHistory()
  const signup = async () => {
    const data = await axios.post('/account/signup', {
      username, password, first_name, last_name, description
    })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('An error occured while signing up')
    } else {
      history.push('/')
    }
  }
  return (
    <>
      <div className="bg-light">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h1>Create an account</h1>
                  <p className="text-secondary">Get started on PennConnects!</p>
                  <form onSubmit={e => {
                    e.preventDefault()
                    signup()
                    setUsername('')
                    setPassword('')
                    setDescription('')
                    setFName('')
                    setLName('')
                  }}
                  >
                    <div className="form-group">
                      <label htmlFor="fname"> Name: </label>
                      <div className="form-row">
                        <div className="col-6">
                          <input className="form-control" type="text" id="fname" name="fname" value={first_name} onChange={e => setFName(e.target.value)} placeholder="First Name" required />
                        </div>
                        <div className="col-6">
                          <input className="form-control" type="text" id="lname" name="lname" value={last_name} onChange={e => setLName(e.target.value)} placeholder="Last Name" required />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="username"> Login: </label>
                      <input className="form-control" type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="text" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div className="form-group">
                      <label id="textlabel" htmlFor="textbox">Describe Yourself: </label>
                      <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} id="textbox" rows="3" required />
                    </div>
                    <div className="form-group">
                      <p className="signup-margin text-secondary">
                        Already have an account?
                        <Link to="/login"> Return to login page</Link>
                      </p>
                      <button className="btn btn-primary float-right" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Signup
