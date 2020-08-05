import React, { useRef, useState, useEffect } from 'react'
import { InputGroup, FormControl, Card, Button, Overlay, Tooltip, Dropdown, Form, Col, Row, Container, ButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsXCircle, BsPlusCircle } from "react-icons/bs"

import { RootState } from "../../../store/reducers/rootReducer"
import { Paragraph, ParagraphInputModel } from '../../../store/types/paragraphTypes'
import { updateParagraph, deleteParagraph, addTagToParagraph, removeTagFromParagraph } from '../../../store/actions/paragraphAction'
import CopyToClipboard from '../../../helper/CopyToClipboard'
import { Tag } from '../../../store/types/tagTypes'
import AddTagToParagraphButton from "./AddTagToParagraphButton"

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
  const tagState = useSelector((state: RootState) => state.tag)

  /* for updating paragraph and tags */
  const [editContent, setEditContent] = useState(false)
  const [editTag, setEditTag] = useState(false)
  const [content, setContent] = useState(paragraph.content)
  const [note, setNote] = useState(paragraph.note)
  // search tag text 
  const [searchText, setSearchText] = useState("")
  // tags after search
  const [filteredTags, setFilteredTags] = useState([])
  // if user is creating a tag
  const [addingTag, setAddingTag] = useState(false)

  const [show, setShow] = useState(false)
  const target = useRef(null)

  useEffect(() => {
    filterTags(searchText)
  }, [tagState, paragraph])

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value)
  }

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.currentTarget.value)
  }

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var text = event.currentTarget.value;
    setSearchText(text)
    filterTags(text)
  }

  const filterTags = (text: string) => {
    var tagIds: BigInt[] = []
    paragraph.tags.forEach((tag) => {
      tagIds.push(tag.id)
    })
    var tags = tagState.data.filter((t) => {
      return !tagIds.includes(t.id)
    })

    if (text == null || text == "") {
      setFilteredTags(tags)
    } else {
      setFilteredTags(
        tags.filter((t) => {
          return t.name.toUpperCase().includes(text.toUpperCase())
        })
      )
    }
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

    setEditContent(false)
  }

  const removeTag = (tagId: BigInt) => {
    dispatch(removeTagFromParagraph(paragraph.id, tagId))
  }

  const cancelUpdate = () => {
    setContent(paragraph.content)
    setNote(paragraph.note)
    setEditContent(false)
    setEditTag(false)
  }

  const addTagToParagraphOnClick = (tagId: BigInt) => {
    dispatch(addTagToParagraph(paragraph.id, tagId))
  }

  return (
    <Card>
      <Card.Header>
        {/* paragraph's tags */}
        {editTag == false && paragraph.tags.length > 0 && paragraph.tags.map((t) =>
          <Button variant="outline-danger" key={t.id.toString()} className="mr-2 mb-2">
            {t.name}
          </Button>
        )}
        {editTag == false && paragraph.tags.length == 0 && <Button variant="outline-secondary">No tags</Button>}

        {/* remove tags */}
        {editTag == true && paragraph.tags.map((t) => 
          <ButtonGroup key={t.id.toString()} className="mr-2 mb-2">
            <Button variant="outline-danger">{t.name}</Button>
            <Button variant="danger" onClick={() => removeTag(t.id)}><BsXCircle /></Button>
          </ButtonGroup>
        )}
        {editTag == true && <hr />}

        {/* add tags */}
        {editTag == true && 
          <Form.Group>
            <Form.Label className="mr-2">All tags: </Form.Label>
            <InputGroup className="mb-2">
              <FormControl type="text" placeholder="Search" onChange={handleSearchTextChange} />
            </InputGroup>
            {filteredTags.map((tag: Tag) => 
              <Button
                key={tag.id.toString()}
                variant="success"
                className="mr-2 mb-2"
                onClick={() => addTagToParagraphOnClick(tag.id)} 
              >
                {tag.name}
                <BsPlusCircle className="ml-2" />
              </Button>
            )}
            {/* create new tag */}
            {addingTag ? (
                <AddTagToParagraphButton onSubmit={() => setAddingTag(false)} />
              ) : (
                  <Button
                    variant="success"
                    onClick={() => {
                      setAddingTag(true);
                    }}
                    className="mb-2"
                  >
                    Add new
                  </Button>
                )}
          </Form.Group>
        }

      </Card.Header>
      <Card.Body className="pb-0">
        <Container fluid className="mb-2">
          {/* paragraph body */}
          <Row>
            <Col>
            {editContent == false && paragraph.content}
            {editContent == true &&
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
            {editContent == true &&
              <Col>
                <Form.Control
                  type="text"
                  value={note}
                  onChange={handleNoteChange}
                />
              </Col>
            }
            {(editContent == false && paragraph.note) && <Col className="m-auto"><small>{paragraph.note}</small></Col>}
          </Form.Group>

        </Container>
      </Card.Body>
      <Card.Footer>
        <div className="float-right">
          {/* update paragraph button */}
          {editContent == true && 
            <Button variant="primary" onClick={() => updateParagraphOnClick()}>
              Update
            </Button>
          }

          {/* exit edit mode button */}
          {editContent == true  &&
            <Button variant="light" onClick={() => cancelUpdate()}>
              Cancel
            </Button>
          }
          {editTag == true  &&
            <Button variant="light" onClick={() => cancelUpdate()}>
              Exit
            </Button>
          }

          {/*  action buttons */}
          {editContent == false && editTag == false &&
            <React.Fragment>
              <Dropdown className="d-inline-block mr-1">
                <Dropdown.Toggle variant="success" id={"dropdown-p-" + paragraph.id.toLocaleString()}>
                  Actions
            </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setEditContent(true)} >Edit Content</Dropdown.Item>
                  <Dropdown.Item onClick={() => setEditTag(true)} >Edit Tags</Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(deleteParagraph(paragraph.id))} className="text-danger">Delete</Dropdown.Item>
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
