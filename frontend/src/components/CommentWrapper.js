import React, { useState } from 'react'
import '../App.css'

const CommentWrapper = ({ commentid, first_name, last_name, content, prof }) => {
  const [comment, setComment] = useState('')
  const [commentOn, setCommentOn] = useState(false)

  return (
    <>
      <div className="postcontent">
        <span>
          <div className="postimagecontainer">
            <img className="smallprof" src={prof} alt="profile" />
          </div>
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
