import React, { useRef, useState } from 'react'
import { Card, Button, Overlay, Tooltip, Dropdown, Form, Col, Row, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { Paragraph, ParagraphInputModel } from '../../../store/types/paragraphTypes'
import { updateParagraph } from '../../../store/actions/paragraphAction'
import CopyToClipboard from '../../../helper/CopyToClipboard'

interface ParagraphItemProps {
  paragraph: Paragraph
}

function ParagraphItem({ paragraph }: ParagraphItemProps) {

  function copyToClipboard(str: string) {
    CopyToClipboard(str)
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }

  const dispatch = useDispatch()

  /* for updating paragraph */
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState(paragraph.content)
  const [note, setNote] = useState(paragraph.note)

  const [show, setShow] = useState(false)
  const target = useRef(null)

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value)
  }

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.currentTarget.value)
  }

  const updateParagraphOnClick = () => {
    /* update only when there are changes */
    if(content != paragraph.content || note != paragraph.note){
      var paragraphInputModel: ParagraphInputModel = {
        id: paragraph.id,
        content: content,
        note: note,
        tagIds: []
      }
      dispatch(updateParagraph(paragraphInputModel))

      
    }

    setEdit(false)
  }

  const cancelUpdate = () => {
    setContent(paragraph.content)
    setNote(paragraph.note)
    setEdit(false)
  }

  return (
    <Card>
      <Card.Header>
        {paragraph.tags.map((t) =>
          <Button variant="outline-danger" key={t.id.toString()} className="mr-2">
            {t.name}
          </Button>
        )}
      </Card.Header>
      <Card.Body className="pb-0">
        <Container fluid className="mb-2">
          {/* paragraph body */}
          <Row>
            <Col>
            {edit == false && paragraph.content}
            {edit == true &&
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={handleContentChange}
              />
            }
            </Col>
          </Row>
        </Container>

          <hr className="mt-5 mb-1"/>

        <Container fluid>
          {/* paragraph note */}
          <Form.Group as={Row} className="mb-0">
            <Form.Label column md="auto"><small>Note:</small></Form.Label>
            {edit == true &&
              <Col>
                <Form.Control
                  type="text"
                  value={note}
                  onChange={handleNoteChange}
                />
              </Col>
            }
            {(edit == false && paragraph.note) && <Col className="m-auto"><small>{paragraph.note}</small></Col>}
          </Form.Group>

        </Container>
      </Card.Body>
      <Card.Footer>
        <div className="float-right">
          {/* update paragraph button */}
          {edit == true && 
            <Button variant="primary" onClick={() => updateParagraphOnClick()}>
              Update
            </Button>
          }

          {/* exit edit mode button */}
          {edit == true &&
            <Button variant="light" onClick={() => cancelUpdate()}>
              Cancel
            </Button>
          }

          {/*  action buttons */}
          {edit == false &&
            <React.Fragment>
              <Dropdown className="d-inline-block mr-1">
                <Dropdown.Toggle variant="success" id={"dropdown-p-" + paragraph.id.toLocaleString()}>
                  Actions
            </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setEdit(true)} >Edit</Dropdown.Item>
                  <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button ref={target} onClick={() => copyToClipboard(paragraph.content)}>Copy</Button>
              <Overlay target={target.current} show={show} placement="top">
                <Tooltip id={"tooltip-p" + paragraph.id.toString()}>
                  Copied!
                </Tooltip>
              </Overlay>
            </React.Fragment>
          }
        </div>
      </Card.Footer>
    </Card>
  )
}

export default ParagraphItem;
