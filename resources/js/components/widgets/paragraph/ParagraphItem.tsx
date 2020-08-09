import React, { useRef, useState, useEffect } from 'react'
import { InputGroup, FormControl, Card, Button, Overlay, Tooltip, Dropdown, Form, Col, Row, Container, ButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BsXCircle, BsPlusCircle } from "react-icons/bs"
import moment = require("moment")

import { RootState } from "../../../store/reducers/rootReducer"
import { Paragraph, ParagraphInputModel } from '../../../store/types/paragraphTypes'
import { updateParagraph, deleteParagraph, addTagToParagraph, removeTagFromParagraph } from '../../../store/actions/paragraphAction'
import CopyToClipboard from '../../../helper/CopyToClipboard'
import { Tag } from '../../../store/types/tagTypes'
import AddTagToParagraphButton from "./AddTagToParagraphButton"

interface ParagraphItemProps {
  paragraph: Paragraph
  width: number
}

function ParagraphItem(props: ParagraphItemProps) {

  function copyToClipboard(str: string) {
    CopyToClipboard(str)
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }

  const dispatch = useDispatch()
  const tagState = useSelector((state: RootState) => state.tag)


  const paragraphId = "paragraph-" + props.paragraph.id
  /* for updating paragraph and tags */
  const [editContent, setEditContent] = useState(false)
  const [editTag, setEditTag] = useState(false)
  const [content, setContent] = useState(props.paragraph.content)
  const [note, setNote] = useState(props.paragraph.note)
  // search tag text
  const [searchText, setSearchText] = useState("")
  // tags after search
  const [filteredTags, setFilteredTags] = useState([])
  // if user is creating a tag
  const [addingTag, setAddingTag] = useState(false)
  // show 'copied' tooltip
  const [show, setShow] = useState(false)
  const target = useRef(null)
  // height limit
  const heightLimit = 150
  const [hide, setHide] = useState(false)
  const switchHide = () => {
    if(hide) {
      setHide(false)
    } else {
      setHide(true)
    }
  }
  /* Show/Hide excessive content of paragraph
   * set everything to inital value to determine if "show more/less" needs to be displayed
   */
  const [init, setInit] = useState(false)
  const [showHide, setShowHide] = useState(false)
  // reset to default values when col num changed
  useEffect(() => {
    setShowHide(false)
    setHide(false)
    setInit(false)
  }, [props.width])
  useEffect(() => {
    if(!init) {
      dispalyButton()
    }
  }, [init])
  const dispalyButton = () => {
    if(document.getElementById(paragraphId).clientHeight > heightLimit){
      setShowHide(true)
    } else {
      setShowHide(false)
    }
    setHide(true)
    setInit(true)
  }

  useEffect(() => {
    filterTags(searchText)
  }, [tagState, props.paragraph])

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value)
    event.currentTarget.style.height = event.currentTarget.scrollHeight + "px"
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
    props.paragraph.tags.forEach((tag) => {
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
    if(content != props.paragraph.content || note != props.paragraph.note){
      var paragraphInputModel: ParagraphInputModel = {
        id: props.paragraph.id,
        content: content,
        note: note,
        tagIds: []
      }
      dispatch(updateParagraph(paragraphInputModel))
    }

    setEditContent(false)
  }

  const removeTag = (tagId: BigInt) => {
    dispatch(removeTagFromParagraph(props.paragraph.id, tagId))
  }

  const cancelUpdate = () => {
    setContent(props.paragraph.content)
    setNote(props.paragraph.note)
    setEditContent(false)
    setEditTag(false)
  }

  const addTagToParagraphOnClick = (tagId: BigInt) => {
    dispatch(addTagToParagraph(props.paragraph.id, tagId))
  }

  return (
    <Card>
      <Card.Header>
        {/* paragraph's tags */}
        {editTag == false && props.paragraph.tags.length > 0 &&
          props.paragraph.tags.map((t) =>
            <Button size="sm" variant="outline-danger" key={t.id.toString()} className="mr-2 mb-1">
              {t.name}
            </Button>
        )}
        {editTag == false && props.paragraph.tags.length == 0 &&
            <Button size="sm" variant="outline-secondary" className="mb-2">
              No tags
            </Button>
        }

        {/* remove tags */}
        {editTag == true && props.paragraph.tags.map((t) =>
          <ButtonGroup key={t.id.toString()} className="mr-2 mb-1">
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
            <Col id={paragraphId} style={{height: !hide ? "auto" : heightLimit,
              overflow: hide ? "hidden" : "auto"}}>
            {editContent == false && props.paragraph.content}

            {editContent == true &&
              <Form.Control
                as="textarea"
                autoFocus
                value={content}
                onChange={handleContentChange}
                rows={5}
              />
            }
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{height: 30, position: "relative"}}>
                {editContent == false && showHide &&
                  <div style={{position: "absolute", bottom: 0, left: 0}}>
                    <Button variant="light" className="p-0 align-bottom"
                      onClick={switchHide}>
                      {hide && <u>show more</u>}
                      {!hide && <u>show less</u>}
                    </Button>
                  </div>
                  }
              </div>
            </Col>
          </Row>
        </Container>

        <hr className="mt-2 mb-1"/>

        <Container fluid>
          {/* paragraph note */}
          <Row className="mb-0">
            <Col md="auto"><small>Note:</small></Col>
            {editContent == true &&
              <Col>
                <Form.Control
                  type="text"
                  value={note}
                  onChange={handleNoteChange}
                />
              </Col>
            }
            {(editContent == false && props.paragraph.note) &&
              <Col className="m-auto">
                <small>{props.paragraph.note}</small>
              </Col>
            }
          </Row>
          {/* created and last updated date */}
          <Row className="mb-0">
              <Col md="auto"><small>Created at:</small></Col>
              <Col className="m-auto">
                <small>{moment(props.paragraph.created_at.toString()).format("dddd, MMMM Do YYYY, h:mm:ss a")}</small>
              </Col>
          </Row>
          <Row className="mb-0">
              <Col md="auto"><small>Updated at:</small></Col>
              <Col className="m-auto">
                <small>{moment(props.paragraph.updated_at.toString()).format("dddd, MMMM Do YYYY, h:mm:ss a")}</small>
              </Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer className="py-2">
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
                <Dropdown.Toggle size="sm" variant="success" id={"dropdown-p-" + props.paragraph.id.toLocaleString()}>
                  Actions
            </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setEditContent(true)} >Edit Content</Dropdown.Item>
                  <Dropdown.Item onClick={() => setEditTag(true)} >Edit Tags</Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(deleteParagraph(props.paragraph.id))} className="text-danger">Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button size="sm" ref={target} onClick={() => copyToClipboard(props.paragraph.content)}>Copy</Button>
              <Overlay target={target.current} show={show} placement="top">
                <Tooltip id={"tooltip-p" + props.paragraph.id.toString()}>
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
