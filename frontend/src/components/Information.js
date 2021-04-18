import React, { useState, useEffect } from 'react'
import '../App.css'
import EditModal from './EditModal'

const Information = ({
  id, name, startdate, enddate, location, description, media, type, update, actual, curr
}) => {
  const [modal, setModal] = useState(false)
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
          {actual === curr && (<button onClick={() => setModal(true)} style={{ marginBottom: 5, marginRight: 20, float: 'right' }} type="button" className="btn btn-success">Edit</button>)}
        </div>
        <div className="body">
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}
export default Information
