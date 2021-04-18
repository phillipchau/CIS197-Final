import React, { useState } from 'react'
import '../App.css'

const CommentWrapper = ({ commentid, first_name, last_name, content }) => {
  const [comment, setComment] = useState('')
  const [commentOn, setCommentOn] = useState(false)

  return (
    <>
      <div className="postcontent">
        <div className="headerpost">
          {first_name} {last_name}
        </div>
        <div className="posttext">
          {content}
        </div>
      </div>
    </>
  )
}

export default CommentWrapper
