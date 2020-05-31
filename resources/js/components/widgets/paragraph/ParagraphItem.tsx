import React, { useRef, useState } from 'react'
import { Card, Button, Overlay, Tooltip, Dropdown } from 'react-bootstrap'

import { Paragraph } from '../../store/types/paragraphTypes'
import CopyToClipboard from '../../helper/CopyToClipboard'

interface ParagraphItemProps {
    paragraph: Paragraph
}

function ParagraphItem({paragraph}: ParagraphItemProps){

  function copyToClipboard(str: string){
    CopyToClipboard(str)
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }

  const [show, setShow] = useState(false)
  const target = useRef(null)

  return (
    <Card>
      <Card.Header>
        {paragraph.tags.map((t) =>
          <Button variant="outline-danger" key={t.id.toString()} className="mr-2">
            {t.name}
          </Button>
        )}
      </Card.Header>
      <Card.Body>{paragraph.content}</Card.Body>
      <Card.Footer>
        {paragraph.note ? <div className="d-inline-block">Note: {paragraph.note}</div> : null}
        <div className="float-right">
          <Dropdown className="d-inline-block mr-3">
            <Dropdown.Toggle variant="success" id={"dropdown-p-" + paragraph.id.toLocaleString()}>
              Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button ref={target} onClick={() => copyToClipboard(paragraph.content) }>Copy to clipboard</Button>
          <Overlay target={target.current} show={show} placement="top">
            <Tooltip id={"tooltip-p"+paragraph.id.toString()}>
              Copied!
            </Tooltip>
          </Overlay>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default ParagraphItem;