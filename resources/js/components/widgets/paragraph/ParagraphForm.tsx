import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Badge, InputGroup, FormControl } from "react-bootstrap";
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from "react-icons/io";

import {
  Paragraph,
  ParagraphInputModel,
} from "../../../store/types/paragraphTypes";
import { addParagraph } from "../../../store/actions/paragraphAction";
import { RootState } from "../../../store/reducers/rootReducer";
import { Tag, TagInputModel } from "../../../store/types/tagTypes";
import { addTagAction } from "../../../store/actions/tagAction";

interface ParagraphFormProps {
  onSubmit: Function
}

function ParagraphForm(props: ParagraphFormProps) {
  const dispatch = useDispatch();

  const tagState = useSelector((state: RootState) => state.tag);

  const [content, setContent] = useState("")
  const [note, setNote] = useState("")

  // tags that have been added
  const [addedTags, setAddedTags] = useState([])
  // if user is adding tag
  const [addingTag, setAddingTag] = useState(false)
  // text of adding tag
  const [tagText, setTagText] = useState("")

  const [filteredTags, setFilteredTags] = useState([])
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    filterTags(searchText)
  }, [tagState])

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value)
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.currentTarget.value)
  };

  const handleTagTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagText(event.currentTarget.value)
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var text = event.currentTarget.value;
    setSearchText(text)
    filterTags(text)
  }

  const filterTags = (text: string) => {
    if (text == null || text == "") {
      setFilteredTags(tagState.data)
    } else {
      setFilteredTags(
        tagState.data.filter((t) => {
          return t.name.toUpperCase().includes(text.toUpperCase())
        })
      )
    }
  }

  const addTag = (tag: Tag) => {
    setAddedTags(addedTags.concat(tag))
  }

  const removeTag = (tag: Tag) => {
    setAddedTags(
      addedTags.filter((t: Tag) => {
        return t.id != tag.id
      })
    )
  }

  const onTagFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagText == "") {
      return
    }
    var tagInput: TagInputModel = {
      name: tagText,
    }
    dispatch(addTagAction(tagInput))
    setAddingTag(false)
    setTagText("")
  }

  function submitParagraphForm() {
    if (!validateInput()) {
      return;
    }

    var tagIds: BigInt[] = []
    addedTags.forEach((tag: Tag) => {
      tagIds.push(tag.id)
    })

    var paragraphInputModel: ParagraphInputModel = {
      id: null,
      content: content,
      note: note,
      tagIds: tagIds,
    }
    dispatch(addParagraph(paragraphInputModel))

    props.onSubmit()
  }

  function validateInput() {
    if (content == "") {
      return false
    }
    return true
  }

  return (
    <React.Fragment>
      <Form.Group controlId="contentField">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={handleContentChange} />
      </Form.Group>
      <Form.Group controlId="noteField">
        <Form.Label>Note</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter your note"
          onChange={handleNoteChange}
        />
      </Form.Group>

      {/* display selected tags */}
      <Form.Group controlId="tagIdsField">
        <Form.Label className="mr-2">Tags selected: </Form.Label>
        {addedTags.map((tag: Tag) => (
          <Button
            key={tag.id.toString()}
            variant="danger"
            className="mr-2"
            onClick={() => removeTag(tag)}
          >
            {tag.name}
            <IoIosCloseCircleOutline size="1.5em" className="ml-2" />
          </Button>
        ))}
      </Form.Group>

      <hr />

      {/* search and select new tags */}
      <Form.Group controlId="tagIdsField">
        <Form.Label className="mr-2">All tags: </Form.Label>
        <InputGroup className="mb-2">
          <FormControl type="text"
            placeholder="Search" onChange={handleSearchTextChange} />
        </InputGroup>
        {filteredTags.map((tag: Tag) =>
          !addedTags.includes(tag) ? (
            <Button
              key={tag.id.toString()}
              variant="success"
              className="mr-2 mb-2"
              onClick={() => addTag(tag)}
            >
              {tag.name}
              <IoIosAddCircleOutline size="1.5em" className="ml-2" />
            </Button>
          ) : null
        )}
        {/* add new tag */}
        {addingTag ? (
          <form onSubmit={(e) => onTagFormSubmit(e)} className="d-inline-block">
            <Button
              as="input"
              onChange={handleTagTextChange}
              autoFocus
              type="submit"
              variant="success"
              className="mb-2"
            />
          </form>
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

      <Button variant="primary" onClick={submitParagraphForm}>
        Submit
      </Button>
    </React.Fragment>
  );
}

export default ParagraphForm;
