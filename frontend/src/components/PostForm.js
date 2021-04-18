import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'

const PostForm = ({ username, first_name, last_name }) => {
  // sets state for the post information
  const [data, setData] = useState('')
  const [button, setButton] = useState(true)

  if ((data === '') && !button) {
    setButton(true)
  }
  if ((data !== '') && button) {
    setButton(false)
  }

  const submitPost = async () => {
    const content = data
    const info = await axios.post('/feed/posts/add', {
      username, first_name, last_name, content,
    })
    if (typeof info.data === 'string' && info.data.startsWith('ERROR:')) {
      alert('ERROR while filling in response. Please try again')
    } else {
      setData('')
      setButton(false)
    }
  }

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault()
        submitPost()
        setData('')
      }}
      >
        <div className="form-group" style={{ marginTop: 20 }}>
          <textarea id="text" className="form-control" rows="2" value={data} onChange={e => setData(e.target.value)} placeholder="Write a new post..." />
        </div>
        <button id="submitbutton" type="submit" className="btn btn-primary" disabled={button}>Submit</button>
      </form>
    </>
  )
}

export default PostForm
