import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import Modal from 'react-bootstrap/Modal'

require('react-bootstrap/ModalHeader')

const ImageModal = props => {
  const [selectedFile, setSelectedFile] = useState(null)
  const { showState, hide, update } = props

  const handleClick = async e => {
    e.preventDefault()
    hide()
    const formData = new FormData()
    formData.append('file', selectedFile)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    const data = await axios.post('/image/upload', formData, config)
    if (typeof data.data === 'string' && data.data.startsWith('ERROR:')) {
      alert('ERROR adding image out')
    } else {
      update(true)
      console.log('uploaded image')
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
            Submit Profile Picture
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="responseForm">
            <form onSubmit={e => {
              e.preventDefault()
            }}
            >
              <div className="form-group">
                <input type="file" name="file" onChange={e => setSelectedFile(e.target.files[0])} />
              </div>
              <button style={{ marginBottom: 5 }} onClick={handleClick} type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
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

export default ImageModal
