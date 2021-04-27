import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import EditModal from './EditModal'

const Information = ({
  id, name, startdate, enddate, location, description, media, type, update, actual, curr
}) => {
  const [modal, setModal] = useState(false)

  const deletePost = async () => {
    const data = axios.post(`/api/${type}/delete`, { _id: id })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR: ')) {
      alert('ERROR with getting industry data')
    } else {
      update(true)
    }
  }
  return (
    <>
      <div className="information">
        <div className="containerimage">
          <img alt="icon" className="profileImage" src={media} />
        </div>
        <div className="header">
          <h3 className="name">{name}</h3>
          <span className="date">
            {startdate}
            -
            {enddate}
          </span>
          <span className="date">|</span>
          <span className="date">{location}</span>
          <EditModal
            showState={modal}
            hide={() => setModal(false)}
            type={type}
            update={update}
            nameInfo={name}
            startInfo={startdate}
            endInfo={enddate}
            locationInfo={location}
            descriptionInfo={description}
            mediaInfo={media}
            idInfo={id}
          />
          {actual === curr && (
            <button style={{ float: 'right', top: '20px', backgroundColor: 'white' }} onClick={deletePost} type="button" className="btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          )}
          {actual === curr && (<button onClick={() => setModal(true)} style={{ marginBottom: 5, marginRight: 5, float: 'right' }} type="button" className="btn btn-success">Edit</button>)}
        </div>
        <div className="body">
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}
export default Information
