import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { Button } from "react-bootstrap";

import { addTagAction } from "../../../store/actions/tagAction";
import { TagInputModel } from "../../../store/types/tagTypes";

interface AddTagToParagraphButtonProps {
  onSubmit: Function
}

function AddTagToParagraphButton(props: AddTagToParagraphButtonProps) {
  const dispatch = useDispatch()

  // text of adding tag
  const [tagText, setTagText] = useState("")

  const handleTagTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagText(event.currentTarget.value)
  };

  /* form submission */
  const onTagFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tagText == "") {
      return;
    }
    var tagInput: TagInputModel = {
      name: tagText,
    };
    dispatch(addTagAction(tagInput))
    setTagText("")

    props.onSubmit()
  };

  return (
    <form onSubmit={(e) => onTagFormSubmit(e)}  className="d-inline-block">
      <Button as="input" onBlur={() => props.onSubmit()} onChange={handleTagTextChange} autoFocus
        type="submit" variant="success" className="mb-2"
      />
    </form>
  )
}

export default AddTagToParagraphButton
