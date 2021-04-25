import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import '../App.css'
import Information from './Information'
import ResponseModal from './Modal'
import ImageModal from './ImageModal'
import SkillsModal from './SkillsModal'
import SkillContainer from './SkillContainer'

const Home = () => {
  const history = useHistory()
  const [login, setLogin] = useState('')
  const [education, setEducation] = useState([])
  const [experience, setExperience] = useState([])
  const [industrySkills, setIndustrySkills] = useState([])
  const [toolSkills, setToolSkills] = useState([])
  const [user, setUser] = useState([])
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState()

  const { id } = useParams()

  // state to track updates
  const [update, setUpdate] = useState(true)

  const [modaleducation, setModalEducation] = useState(false)
  const [modalexperience, setModalExperience] = useState(false)
  const [modalimage, setModalImage] = useState(false)
  const [modalindstury, setModalIndustry] = useState(false)
  const [modaltools, setModalTools] = useState(false)

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

  const getIndustry = async () => {
    const data = await axios.get(`/api/skills/${id}?type=industry`)
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting industry data')
    } else {
      setIndustrySkills(data.data)
    }
  }

  const getTool = async () => {
    const data = await axios.get(`/api/skills/${id}?type=tool`)
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting tool data')
    } else {
      setToolSkills(data.data)
    }
  }

  const clickHome = x => {
    history.push(`/home/${x}`)
    setUpdate(true)
  }

  const searchSubmit = async () => {
    clickHome(search.username)
  }

  useEffect(() => {
    getLog()
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      getAllUsers()
    }, 2000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    if (update) {
      getUser()
      getEducation()
      getIndustry()
      getTool()
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
              width: 75, height: 75, objectFit: 'cover', marginRight: 10,
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/1200px-UPenn_shield_with_banner.svg.png"
            alt="logo"
          />
        </span>
        <span style={{ marginTop: 20 }}>
          <Autocomplete
            id="combo-box-demo"
            options={users}
            onChange={(event, value) => setSearch(value)}
            getOptionSelected={(option, value) => `${option.first_name} ${option.last_name}` === `${value.first_name} ${value.last_name}`}
            getOptionLabel={option => `${option.first_name} ${option.last_name}`}
            style={{
              width: 300, display: 'inline-block', verticalAlign: 'middle', color: 'grey', backgroundColor: 'white',
            }}
            renderInput={params => <TextField {...params} label="Find Friends" variant="outlined" />}
          />
          <button
            style={{
              display: 'inline-block', verticalAlign: 'middle', height: 57, marginLeft: 5,
            }}
            type="button"
            className="btn btn-outline-light"
            onClick={searchSubmit}
          >
            Submit
          </button>
        </span>
        <span style={{ float: 'right' }}>
          <button onClick={() => clickHome(login)} style={{ marginBottom: 5, marginRight: 5, fontSize: '30px' }} type="button" className="btn btn-primary">Home</button>
          <button onClick={() => history.push('/feed')} style={{ marginBottom: 5, marginRight: 30, fontSize: '30px' }} type="button" className="btn btn-primary">Feed</button>
          <button style={{ marginBottom: 5, marginRight: 20, display: 'inline' }} type="button" onClick={logout} className="btn btn-success">Log Out</button>
        </span>
      </div>
      <div className="mainbody">
        <div id="profileArea">
          <ImageModal showState={modalimage} hide={() => setModalImage(false)} update={setUpdate} />
          <div id="profileContainer">
            <img className="profilePicture" src={user.profile} alt="profile" />
          </div>
          <button type="button" id="camera" onClick={() => setModalImage(true)} className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-camera-fill"
              viewBox="0 0 25 20"
            >
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path fillRule="evenodd" d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
          </button>
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
          <SkillsModal showState={modalindstury} hide={() => setModalIndustry(false)} type="industry" update={setUpdate} />
          <SkillsModal showState={modaltools} hide={() => setModalTools(false)} type="tool" update={setUpdate} />
          <h2>
            Skills
          </h2>
          <hr style={{ border: '1px solid gray' }} />
          <div className="skills">
            <h4>
              Industry Knowledge
              {login === id && (
              <button
                style={{ marginBottom: 5, marginRight: 20, float: 'right' }}
                type="button"
                className="btn btn-primary"
                onClick={() => setModalIndustry(true)}
              >
                Add Industry Knowledge +
              </button>
              )}
            </h4>
            <hr style={{ border: '1px solid red' }} />
            {industrySkills.map(skill => (
              <SkillContainer
                key={skill._id}
                skill={skill.skill}
                setUpdate={setUpdate}
                login={login}
                id={id}
              />
            ))}
          </div>
          <div className="skills">
            <h4>
              Tools and Technologies
              {login === id && (
              <button
                style={{ marginBottom: 5, marginRight: 20, float: 'right' }}
                type="button"
                className="btn btn-primary"
                onClick={() => setModalTools(true)}
              >
                Add Tech Skills +
              </button>
              )}
            </h4>
            <hr style={{ border: '1px solid red' }} />
            {toolSkills.map(skill => (
              <SkillContainer
                key={skill._id}
                skill={skill.skill}
                setUpdate={setUpdate}
                login={login}
                id={id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
