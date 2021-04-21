import React, { useState } from 'react'
import '../App.css'

const CommentWrapper = ({ commentid, first_name, last_name, content }) => {
  const [comment, setComment] = useState('')
  const [commentOn, setCommentOn] = useState(false)

  return (
    <>
      <div className="postcontent">
        <span>
          <img id="smallprofpost" src="https://sumaleeboxinggym.com/wp-content/uploads/2018/06/Generic-Profile-1600x1600.png" alt="profile" />
        </span>
        <span className="headerpost">
          {first_name} {last_name}
        </span>
        <div className="posttext">
          {content}
        </div>
      </div>
    </>
  )
}

export default CommentWrapper
