import React, { useEffect, useState } from 'react'
import '../App.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import PostForm from './PostForm'
import PostWrapper from './PostWrapper'

const Feed = () => {
  const [post, setPost] = useState([])
  const [user, setUser] = useState([])

  const history = useHistory()

  const getUser = async () => {
    const data = await axios.get('/account/users')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting education data')
    } else {
      setUser(data.data)
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
      history.push('/login')
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      getPost()
    }, 2000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <div className="navbar">
        <h3>{user.first_name} {user.last_name}</h3>
        <button onClick={() => history.push('/')} style={{ marginBottom: 5, marginRight: 5, fontSize: '25px' }} type="button" className="btn btn-light">Home</button>
        <button onClick={() => history.push('/feed')} style={{ marginBottom: 5, marginRight: 5, fontSize: '25px' }} type="button" className="btn btn-light">Feed</button>
        <button style={{ marginBottom: 5, marginRight: 20, display: 'inline' }} type="button" onClick={logout} className="btn btn-success">Log Out</button>
      </div>
      <div id="postwrap">
        <div id="postcontainer">
          <div id="imagecontainer">
            <span><img id="smallprof" src="https://sumaleeboxinggym.com/wp-content/uploads/2018/06/Generic-Profile-1600x1600.png" alt="unplash" /></span>
          </div>
          <PostForm id="postform" username={user.username} first_name={user.first_name} last_name={user.last_name} />
        </div>
        {post.map(info => (
          <PostWrapper
            key={info._id}
            postid={info._id}
            userInfo={info.username}
            firstname={info.first_name}
            lastname={info.last_name}
            contentInfo={info.content}
          />
        ))}
      </div>
    </>
  )
}
export default Feed
