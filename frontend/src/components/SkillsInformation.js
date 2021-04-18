import React, { useState, useEffect } from 'react'
import '../App.css'
import SkillsModal from './SkillsModal'

const SkillsInformation = ({
  id, category, skillList
}) => {
  const [modal, setModal] = useState(false)
  return (
    <>
      <div className="information">
        <div className="header">
          <h3 className="name">{category}</h3>
          <SkillsModal
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
          <button onClick={() => setModal(true)} style={{ marginBottom: 5, marginRight: 20, float: 'right' }} type="button" className="btn btn-success">Edit Skills</button>
        </div>
        <div className="body">
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}
export default SkillsInformation
