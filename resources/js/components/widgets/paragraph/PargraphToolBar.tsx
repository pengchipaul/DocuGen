import React from 'react'
import { Button } from 'react-bootstrap'
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io'

function ParagraphToolBar() {
  return (
    <React.Fragment>
      <Button block variant="primary">
        <h3>
          <IoIosAddCircle size="1.5em" />
        </h3>
        Add
      </Button>
      <Button block variant="primary">
        <h3>
          <IoIosSearch size="1.5em" />
        </h3>
        Search
      </Button>
    </React.Fragment>
  )
}

export default ParagraphToolBar;