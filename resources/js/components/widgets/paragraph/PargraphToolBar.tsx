import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io'

import ParagraphForm from './ParagraphForm';

function ParagraphToolBar() {
  const [show, setShow] = useState(false)

  const showForm = () => {
    setShow(true);
  }

  const hideForm = () => {
    setShow(false);
  }

  return (
    <div className="float-right">
      <Button block variant="primary" onClick={showForm} >
        <h3>
          <IoIosAddCircle size="1.5em" />
        </h3>
        Add
      </Button>
      <Modal show={show} onHide={hideForm} size="lg" centered>
        <Modal.Header closeButton>Add new paragraph</Modal.Header>
        <Modal.Body>
          <ParagraphForm onSubmit={hideForm} />
        </Modal.Body>
      </Modal>
      <Button block variant="primary">
        <h3>
          <IoIosSearch size="1.5em" />
        </h3>
        Search
      </Button>
    </div>
  )
}

export default ParagraphToolBar;