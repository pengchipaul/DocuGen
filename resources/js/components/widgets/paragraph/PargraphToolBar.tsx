import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io'

function ParagraphToolBar() {
  const [showForm, setShowForm] = useState(false)

  return (
    <React.Fragment>
      <Button block variant="primary" onClick={() => setShowForm(true)} >
        <h3>
          <IoIosAddCircle size="1.5em" />
        </h3>
        Add
      </Button>
      <Modal show={showForm} size="lg" centered>
        <Modal.Header>Add new paragraph</Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
      <Button block variant="primary">
        <h3>
          <IoIosSearch size="1.5em" />
        </h3>
        Search
      </Button>
    </React.Fragment>
  )
}

export default ParagraphToolBar;