import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { Paragraph, ParagraphInputModel } from '../../../store/types/paragraphTypes'
import { addParagraph } from '../../../store/actions/paragraphAction'

interface ParagraphFormProps {
  paragraph: Paragraph,
  mode: string
}

function ParagraphForm(props: ParagraphFormProps) {

  const dispatch = useDispatch()

  const [content, setContent] = useState(null)
  const [note, setNote] = useState(null)

  useEffect(() => {
    if(props.mode === "edit") {
      setContent(props.paragraph.content)
      setNote(props.paragraph.note)
    }
  }, [])

  const handleContentChange = (event: React.FormEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value)
  }

  const handleNoteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNote(event.currentTarget.value)
  }

  function submitForm() {
    if(props.mode === "edit") {

    } else {
       var paragraphInputModel: ParagraphInputModel = {
        content: content,
        note: note,
        tagIds: []
      }
      dispatch(addParagraph(paragraphInputModel))
    }
    
  }

  return (
    <Form>
      <Form.Group controlId="contentField">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} value={content} onChange={(event) => handleContentChange} />
      </Form.Group>
      <Form.Group controlId="noteField">
        <Form.Label>Note</Form.Label>
        <Form.Control type="text" placeholder="enter your note" value={note} onChange={(event) => handleNoteChange} />
      </Form.Group>
      <Button variant="primary" onClick={submitForm} >Submit</Button>
    </Form>
  )
}

export default ParagraphForm