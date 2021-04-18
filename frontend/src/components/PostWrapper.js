import React, { useState, useEffect } from 'react'
import '../App.css'
import CommentWrapper from './CommentWrapper'
import axios from 'axios'

const PostWrapper = ({ postid, userInfo, firstname, lastname, contentInfo }) => {
  const [comment, setComment] = useState('')
  // checks to see if the comment is toggled
  const [commentOn, setCommentOn] = useState(false)
  // checks to see if a comment is submitted
  const [commentsubmit, setCommentSubmitted] = useState(false)

  const [commentcount, setCommentCount] = useState(0)

  const [button, setButton] = useState(true)
  const [commentList, setCommentList] = useState([])
  const [user, setUser] = useState([])

  if ((comment === '') && !button) {
    setButton(true)
  }
  if ((comment !== '') && button) {
    setButton(false)
  }

  const getUser = async () => {
    const data = await axios.get('/account/users')
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting education data')
    } else {
      setUser(data.data)
    }
  }

  const submitComment = async () => {
    const content = comment
    const { username, first_name, last_name } = user
    const data = await axios.post('/feed/comments/add', {
      postid, username, first_name, last_name, content,
    })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR while filling in response. Please try again')
    } else {
      setCommentSubmitted(true)
      setComment('')
      setButton(false)
    }
  }

  const getComments = async () => {
    const data = await axios.get(`/feed/comments/${postid}`)
    setCommentList(data.data)
    // designed simply to rerender once a comment is submitted
    setCommentSubmitted(false)
    setCommentCount(data.data.length)
  }

  useEffect(() => {
    getComments()
  }, [commentOn, commentsubmit])

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <div className="postcontent">
        <div className="headerpost">
          {firstname} {lastname}
        </div>
        <div className="posttext">
          {contentInfo}
        </div>
        <button onClick={() => setCommentOn(!commentOn)} id="commentbutton" type="button" className="btn btn-outline-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16" style={{ marginRight: 10 }}>
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
          {commentcount} Comments
        </button>
        {commentOn && (
          <>
            <div className="commentgroup">
              <div className="form-group" style={{ marginTop: 20 }}>
                <textarea id="text" className="form-control" rows="2" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment..." />
              </div>
              <button onClick={submitComment} disabled={button} id="submitbutton" type="submit" className="btn btn-primary">Submit</button>
            </div>
            {commentList.map(info => (
              <CommentWrapper
                key={info._id}
                commentid={info._id}
                first_name={info.first_name}
                last_name={info.last_name}
                content={info.content}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default PostWrapper
