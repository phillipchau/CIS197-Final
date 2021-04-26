import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import CommentWrapper from './CommentWrapper'

const PostWrapper = ({ postid, firstname, lastname, contentInfo, prof, login, date, likes }) => {
  const [comment, setComment] = useState('')
  // checks to see if the comment is toggled
  const [commentOn, setCommentOn] = useState(false)

  const [commentcount, setCommentCount] = useState(0)

  const [likeOn, setLikeOn] = useState(likes.includes(login))

  const [button, setButton] = useState(true)
  const [commentList, setCommentList] = useState([])
  const [user, setUser] = useState([])
  let buttontype = ''

  if (likeOn) {
    buttontype = 'btn btn-primary'
  } else {
    buttontype = 'btn btn-outline-primary'
  }

  if ((comment === '') && !button) {
    setButton(true)
  }
  if ((comment !== '') && button) {
    setButton(false)
  }

  const likeClick = async () => {
    if (likeOn) {
      const data_on = await axios.post('/feed/posts/deletelike', { _id: postid, person: login })
      if (typeof data_on.data === 'string' && data_on.data.startsWith('ERROR: ')) {
        alert('ERROR with getting education data')
      } else {
        setLikeOn(false)
        buttontype = 'btn btn-outline-primary'
      }
    } else {
      const data_off = await axios.post('/feed/posts/addlike', { _id: postid, person: login })
      if (typeof data_off.data === 'string' && data_off.data.startsWith('ERROR: ')) {
        alert('ERROR with getting education data')
      } else {
        setLikeOn(true)
        buttontype = 'btn btn-primary'
      }
    }
  }
  const getUser = async person => {
    const data = await axios.get(`/account/users/${person}`)
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting education data')
    } else {
      setUser(data.data)
    }
  }

  const submitComment = async () => {
    const content = comment
    const {
      username, first_name, last_name, profile,
    } = user
    const data = await axios.post('/feed/comments/add', {
      postid, username, first_name, last_name, content, profile,
    })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR while filling in response. Please try again')
    } else {
      setComment('')
      setButton(false)
    }
  }

  const getComments = async () => {
    const data = await axios.get(`/feed/comments/${postid}`)
    setCommentList(data.data)
    setCommentCount(data.data.length)
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      getComments()
    }, 2000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    getUser(login)
  }, [])

  return (
    <>
      <div className="postcontent">
        <div style={{ display: 'inline-block' }}>
          <div className="postimagecontainer">
            <img className="smallprof" src={prof} alt="profile" />
          </div>
        </div>
        <div style={{ display: 'inline-block' }} className="headerinfo">
          <span className="headerpost">
            {firstname} {lastname}
          </span>
          <p style={{color: 'gray'}}>{date}</p>
        </div>
        <div className="posttext">
          {contentInfo}
        </div>
        <button onClick={likeClick} type="button" className={`likeButton ${buttontype}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16" style={{ marginRight: 10 }}>
            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
          </svg>
          {likes.length} Likes
        </button>
        <button onClick={() => setCommentOn(!commentOn)} type="button" className="commentButton btn btn-outline-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16" style={{ marginRight: 10 }}>
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
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
                prof={info.profile}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default PostWrapper
