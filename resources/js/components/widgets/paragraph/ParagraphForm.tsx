import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Badge } from "react-bootstrap";
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from "react-icons/io";

import {
  Paragraph,
  ParagraphInputModel,
} from "../../../store/types/paragraphTypes";
import { addParagraph } from "../../../store/actions/paragraphAction";
import { RootState } from "../../../store/reducers/rootReducer";
import { Tag } from "../../../store/types/tagTypes";

interface ParagraphFormProps {
  paragraph: Paragraph;
  mode: string;
  onSubmit: Function;
}

function ParagraphForm(props: ParagraphFormProps) {
  const dispatch = useDispatch();

  const tag = useSelector((state: RootState) => state.tag);

  const [content, setContent] = useState("")
  const [note, setNote] = useState("")
  const [tags, setTags] = useState([]);
  const [tagIds, setTagIds] = useState([])

  useEffect(() => {
    if (props.mode === "edit") {
      setContent(props.paragraph.content)
      setNote(props.paragraph.note)
    }
  }, []);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value)
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.currentTarget.value)
  };

  const addTag = (tag: Tag) => {
    setTags(tags.concat(tag))
    setTagIds(tagIds.concat(tag.id))
  }

  const removeTag = (tag: Tag) => {
    setTags(tags.filter( (t: Tag) => {
      return t.id != tag.id
    }))
    setTagIds(tagIds.filter( (t) => {
      return t != tag.id
    }))
  }

  function submitForm() {
    if (props.mode === "edit") {
    } else {
      var paragraphInputModel: ParagraphInputModel = {
        content: content,
        note: note,
        tagIds: tagIds,
      };
      dispatch(addParagraph(paragraphInputModel));
    }

    props.onSubmit();
  }

  return (
    <Form>
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

      <Form.Group controlId="tagIdsField">
        <Form.Label className="mr-2">All tags: </Form.Label>
        {tag.data.map((tag: Tag) => (
          !tags.includes(tag) ?
          <Button key={tag.id.toString()} variant="success" className="mr-2"
            onClick={() => addTag(tag)}
          >
            {tag.name}
            <IoIosAddCircleOutline size="1.5em" className="ml-2" />
          </Button> : null
        ))}
      </Form.Group>
      <Form.Group controlId="tagIdsField">
        <Form.Label className="mr-2">Tags selected: </Form.Label>
        {tags.map((tag: Tag) => (
          <Button key={tag.id.toString()} variant="danger" className="mr-2"
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
    </Form>
  );
}

export default ParagraphForm;
