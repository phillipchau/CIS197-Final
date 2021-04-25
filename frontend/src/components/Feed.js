import React, { useEffect, useState } from 'react'
import '../App.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import PostForm from './PostForm'
import PostWrapper from './PostWrapper'

const Feed = () => {
  const [post, setPost] = useState([])
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState([])
  const [user, setUser] = useState('')
  const [search, setSearch] = useState('')
  const history = useHistory()

  const getUser = async person => {
    const data = await axios.get(`/account/users/${person}`)
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

  const getLog = async () => {
    const logdata = await axios.get('/account/logstatus')
    if (typeof logdata.data === 'string' && logdata.data.startsWith('ERROR:')) {
      alert('ERROR with getting login data')
    } else if (!logdata.data.user) {
      history.push('/')
    } else {
      setLogin(logdata.data.user)
      getUser(logdata.data.user)
    }
  }

  const getPost = async () => {
    const data = await axios.get('/feed/posts')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting education data')
    } else {
      setPost(data.data)
    }
  }

  const logout = async () => {
    const data = await axios.post('/account/logout')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR logging out')
    } else {
      history.push('/')
    }
  }

  const searchSubmit = async () => {
    console.log(search)
    history.push(`/home/${search.username}`)
  }

  useEffect(() => {
    getLog()
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      getPost()
      getAllUsers()
    }, 2000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])
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
          <button onClick={() => history.push(`/home/${login}`)} style={{ marginBottom: 5, marginRight: 5, fontSize: '30px' }} type="button" className="btn btn-primary">Home</button>
          <button onClick={() => history.push('/feed')} style={{ marginBottom: 5, marginRight: 30, fontSize: '30px' }} type="button" className="btn btn-primary">Feed</button>
          <button style={{ marginBottom: 5, marginRight: 20, display: 'inline' }} type="button" onClick={logout} className="btn btn-success">Log Out</button>
        </span>
      </div>
      <div id="postwrap">
        <div id="postcontainer">
          <span style={{ display: 'inline-block', position: 'relative', bottom: 70 }}>
            <div className="smallprofcontainer">
              <img className="smallprof" src={user.profile} alt="profile" />
            </div>
          </span>
          <span style={{ display: 'inline-block', width: '80%' }}>
            <PostForm id="postform" username={user.username} first_name={user.first_name} last_name={user.last_name} profile={user.profile} />
          </span>
        </div>
        {post.map(info => (
          <PostWrapper
            key={info._id}
            postid={info._id}
            prof={info.profile}
            firstname={info.first_name}
            lastname={info.last_name}
            contentInfo={info.content}
            login={login}
          />
        ))}
      </div>
    </>
  )
}
export default Feed
