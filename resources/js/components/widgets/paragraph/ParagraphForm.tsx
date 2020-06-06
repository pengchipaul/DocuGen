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
  onSubmit: Function;
}

function ParagraphForm(props: ParagraphFormProps) {
  const dispatch = useDispatch();

  const tag = useSelector((state: RootState) => state.tag);

  const [content, setContent] = useState("")
  const [note, setNote] = useState("")
  const [tags, setTags] = useState([])
  const [tagIds, setTagIds] = useState([])
  const [addingTag, setAddingTag] = useState(false)
  const [tagText, setTagText] = useState("")
  const [filteredTags, setFilteredTags] = useState([])

  useEffect(() => {
    setFilteredTags(tag.data)
  },tag.data)

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.currentTarget.value);
  };

  const handleTagTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagText(event.currentTarget.value);
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var text = event.currentTarget.value;
    if(text == null || text == ""){

    }
  }

  const addTag = (tag: Tag) => {
    setTags(tags.concat(tag));
    setTagIds(tagIds.concat(tag.id));
  };

  const removeTag = (tag: Tag) => {
    setTags(
      tags.filter((t: Tag) => {
        return t.id != tag.id;
      })
    );
    setTagIds(
      tagIds.filter((t) => {
        return t != tag.id;
      })
    );
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagText == "") {
      return;
    }
    var tagInput: TagInputModel = {
      name: tagText,
    };
    dispatch(addTagAction(tagInput));
    setAddingTag(false);
    setTagText("");
  };

  function submitForm() {
    if (!validateInput()) {
      return;
    }
    var paragraphInputModel: ParagraphInputModel = {
      content: content,
      note: note,
      tagIds: tagIds,
    };
    dispatch(addParagraph(paragraphInputModel));

    props.onSubmit();
  }

  function validateInput() {
    if (content == "") {
      return false;
    }
    return true;
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

      {/* search and select new tags */}
      <Form.Group controlId="tagIdsField">
        <Form.Label className="mr-2">All tags: </Form.Label>
        <InputGroup className="mb-2">
          <FormControl type="text" 
            placeholder="Search" onChange={handleSearchTextChange} />
        </InputGroup>
        {filteredTags.map((tag: Tag) =>
          !tags.includes(tag) ? (
            <Button
              key={tag.id.toString()}
              variant="success"
              className="mr-2"
              onClick={() => addTag(tag)}
            >
              {tag.name}
              <IoIosAddCircleOutline size="1.5em" className="ml-2" />
            </Button>
          ) : null
        )}

        {/* add new tag */}
        {addingTag ? (
          <form onSubmit={(e) => onFormSubmit(e)} className="d-inline-block">
            <Button
              as="input"
              onChange={handleTagTextChange}
              autoFocus
              type="submit"
              variant="success"
            />
          </form>
        ) : (
          <Button
            variant="success"
            onClick={() => {
              setAddingTag(true);
            }}
          >
            Add new
          </Button>
        )}
      </Form.Group>
      <hr/>

      {/* display selected tags */}
      <Form.Group controlId="tagIdsField">
        <Form.Label className="mr-2">Tags selected: </Form.Label>
        {tags.map((tag: Tag) => (
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
      <Button variant="primary" onClick={submitForm}>
        Submit
      </Button>
    </React.Fragment>
  );
}

export default ParagraphForm;
