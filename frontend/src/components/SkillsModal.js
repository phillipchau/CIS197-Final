import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import Modal from 'react-bootstrap/Modal'

require('react-bootstrap/ModalHeader')

const SkillsModal = props => {
  const [skill, setSkill] = useState('')
  const { showState, hide, type, update } = props

  const submitResponse = async () => {
    const data = await axios.post('/api/skills/add', {
      skill, type,
    })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR while filling in response. Please try again')
    } else {
      setSkill('')
      update(true)
      hide()
    }
  }
  return (
    <>
      <Modal
        show={showState}
        onHide={hide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            New Skill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="responseForm">
            <form onSubmit={e => {
              e.preventDefault()
            }}
            >
              <div className="form-group">
                <label htmlFor="name">
                  Name of Skill:
                </label>
                <input className="form-control" type="text" id="name" name="name" value={skill} onChange={e => setSkill(e.target.value)} placeholder="Skill" required />
              </div>
              <button style={{ marginBottom: 5 }} onClick={submitResponse} type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button style={{ marginBottom: 5 }} type="button" onClick={hide} className="btn btn-danger btn-lg btn-block">Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SkillsModal
