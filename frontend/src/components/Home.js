import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import '../App.css'
import Information from './Information'
import ResponseModal from './Modal'

const Home = () => {
  const history = useHistory()
  const [login, setLogin] = useState('')
  const [education, setEducation] = useState([])
  const [experience, setExperience] = useState([])
  const [user, setUser] = useState([])
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState()

  const { id } = useParams()

  // state to track updates
  const [update, setUpdate] = useState(true)

  const [modaleducation, setModalEducation] = useState(false)
  const [modalexperience, setModalExperience] = useState(false)

  const logout = async () => {
    const data = await axios.post('/account/logout')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR logging out')
    } else {
      history.push('/')
    }
  }

  const getLog = async () => {
    const logdata = await axios.get('/account/logstatus')
    if (typeof logdata.data === 'string' && logdata.data.startsWith('ERROR:')) {
      alert('ERROR with getting login data')
    } else if (!logdata.data.user) {
      history.push('/')
    } else {
      setLogin(logdata.data.user)
    }
  }
  const getUser = async () => {
    const data = await axios.get(`/account/users/${id}`)
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting education data')
    } else {
      console.log(data.data)
      setUser(data.data)
    }
  }

  const getAllUsers = async () => {
    const data = await axios.get('/account/allusers')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR with getting data')
    } else {
      console.log(data.data)
      setUsers(data.data)
    }
  }

  const getEducation = async () => {
    const data = await axios.get(`/api/education/${id}`)
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting education data')
    } else {
      setEducation(data.data)
    }
  }

  const getExperience = async () => {
    const data = await axios.get(`/api/experience/${id}`)
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting experience data')
    } else {
      setExperience(data.data)
    }
  }

  useEffect(() => {
    if (update) {
      getLog()
      getUser()
      getEducation()
      getExperience()
      setUpdate(false)
    }
  }, [update])

  return (
    <>
      <div className="topbar" style={{ padding: 20 }}>
        <span>
          <img
            style={{
              width: 75, height: 75, objectFit: 'cover', marginRight: 10
            }}
            src="https://branding.web-resources.upenn.edu/sites/default/files/simplified-shield-final%20%285%29.png"
            alt="logo"
          />
        </span>
        <span style={{ marginTop: 20 }}>
          <Autocomplete
            id="combo-box-demo"
            options={users}
            getOptionLabel={option => `${option.first_name} ${option.last_name}`}
            style={{ width: 300, display: 'inline-block', verticalAlign: 'middle', color: 'grey', backgroundColor: 'white' }}
            onChange={e => setSearch(e.target.value)}
            renderInput={params => <TextField {...params} label="Find Friends" variant="outlined" />}
          />
          <button style={{ display: 'inline-block', verticalAlign: 'middle', height: 57, marginLeft: 5 }} type="button" className="btn btn-outline-light">Submit</button>
        </span>
        <span style={{ float: 'right' }}>
          <button onClick={() => history.push(`/home/${login}`)} style={{ marginBottom: 5, marginRight: 5, fontSize: '30px' }} type="button" className="btn btn-primary">Home</button>
          <button onClick={() => history.push('/feed')} style={{ marginBottom: 5, marginRight: 30, fontSize: '30px' }} type="button" className="btn btn-primary">Feed</button>
          <button style={{ marginBottom: 5, marginRight: 20, display: 'inline' }} type="button" onClick={logout} className="btn btn-success">Log Out</button>
        </span>
      </div>
      <div className="mainbody">
        <div className="profileContainer">
          <img className="profilePicture" src="https://sumaleeboxinggym.com/wp-content/uploads/2018/06/Generic-Profile-1600x1600.png" alt="unplash" />
        </div>
        <div id="intro">
          <h1 style={{ marginTop: 20, fontStyle: 'bold' }}>
            Hello, I am {user.first_name} {user.last_name}
          </h1>
          <h4>
            {user.description}
          </h4>
        </div>
        <div className="section">
          <h2>
            Education
            {login === id && (
              <button
                style={{ marginBottom: 5, marginRight: 20, float: 'right' }}
                type="button"
                className="btn btn-primary"
                onClick={() => setModalEducation(true)}
              >
                Add Education +
              </button>
            )}
          </h2>

          <hr style={{ border: '1px solid gray' }} />
          <ResponseModal showState={modaleducation} hide={() => setModalEducation(false)} type="education" update={setUpdate} />
          {education.map(info => (
            <Information
              key={info._id}
              id={info._id}
              name={info.name}
              startdate={info.startdate}
              enddate={info.enddate}
              location={info.location}
              description={info.description}
              media={info.media}
              type="education"
              update={setUpdate}
              actual={login}
              curr={id}
            />
          ))}
        </div>
        <div className="section">
          <h2>
            Experience
            {login === id && (
            <button
              style={{ marginBottom: 5, marginRight: 20, float: 'right' }}
              type="button"
              className="btn btn-primary"
              onClick={() => setModalExperience(true)}
            >
              Add Experience +
            </button>
            )}
          </h2>
          <hr style={{ border: '1px solid gray' }} />
          <ResponseModal showState={modalexperience} hide={() => setModalExperience(false)} type="experience" update={setUpdate} />
          {experience.map(info => (
            <Information
              key={info._id}
              id={info._id}
              name={info.name}
              startdate={info.startdate}
              enddate={info.enddate}
              location={info.location}
              description={info.description}
              media={info.media}
              type="experience"
              update={setUpdate}
              actual={login}
              curr={id}
            />
          ))}
        </div>
        <div className="section">
          <h2>
            Skills
            {login === id && (
            <button
              style={{ marginBottom: 5, marginRight: 20, float: 'right' }}
              type="button"
              className="btn btn-primary"
              onClick={() => setModalEducation(true)}
            >
              Add Skill +
            </button>
            )}
          </h2>
          <hr style={{ border: '1px solid gray' }} />
          <div className="skills">
            <h4>Industry Knowledge</h4>
            <hr style={{ border: '1px solid red' }} />
          </div>
          <div className="skills">
            <h4>Tools and Technologies</h4>
            <hr style={{ border: '1px solid red' }} />

          </div>
        </div>
      </div>
    </>
  )
}
export default Home
