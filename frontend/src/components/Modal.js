import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import Modal from 'react-bootstrap/Modal'

require('react-bootstrap/ModalHeader')

const ResponseModal = props => {
  const [name, setName] = useState('')
  const [startdate, setStartDate] = useState('')
  const [enddate, setEndDate] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [media, setMedia] = useState('')
  const { showState, hide, type, update } = props

  const submitResponse = async () => {
    const data = await axios.post(`/api/${type}/add`, {
      name, startdate, enddate, location, description, media,
    })
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR while filling in response. Please try again')
    } else {
      setName('')
      setStartDate('')
      setEndDate('')
      setLocation('')
      setDescription('')
      setMedia('')
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
            New {type}
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
                  Name of {type}:
                </label>
                <input className="form-control" type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="startdate"> Start Date</label>
                <input className="form-control" type="text" id="startdate" name="startdate" value={startdate} onChange={e => setStartDate(e.target.value)} placeholder="Start Date" required />
              </div>
              <div className="form-group">
                <label htmlFor="enddate"> End Date</label>
                <input className="form-control" type="text" id="enddate" name="enddate" value={enddate} onChange={e => setEndDate(e.target.value)} placeholder="Start Date" required />
              </div>
              <div className="form-group">
                <label htmlFor="date"> Location </label>
                <input className="form-control" type="text" id="location" name="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
              </div>
              <div className="form-group">
                <label style={{ fontSize:20, fontWeight: 'bold' }} htmlFor="textbox">Description: </label>
                <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} id="textbox" rows="3" />
              </div>
              <div className="form-group">
                <label htmlFor="media"> Add Image Icon </label>
                <input className="form-control" type="text" id="media" name="media" value={media} onChange={e => setMedia(e.target.value)} placeholder="Image URL" />
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

export default ResponseModal
