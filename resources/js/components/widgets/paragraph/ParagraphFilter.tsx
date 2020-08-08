import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Form, Col, Container, Button, Dropdown, DropdownButton } from "react-bootstrap"
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa"

import { ParagraphState } from "../../../store/types/paragraphTypes"
import { RootState } from "../../../store/reducers/rootReducer"
import { SortParagraphsByCreatedDate, SortParagraphsByUpdatedDate } from "../../../helper/ParagraphHelper"

interface ParagraphFilterProps {
    setParagraphs: Function
    setColNum: Function
}

function ParagraphFilter(props: ParagraphFilterProps) {

  const paragraphState: ParagraphState = useSelector(
    (state: RootState) => state.paragraphs
  )

  /* update columns  */
  const maxColNum = 4
  const changeColNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    var num = parseInt(event.currentTarget.value)
    if(num >= 1 && num <= maxColNum) {
      props.setColNum(num)
    }
  }

  /* filter process */
  const filterByConditions = () => {
    var paragraphs = paragraphState.data
    props.setParagraphs({paragraphs})
  }

  /* sorts */
  const UPDATEDASEC = 1
  const UPDATEDDESC = 2
  const CREATEDASEC = 3
  const CREATEDDESC = 4
  const [sortCondition, setSortCondition] = useState(UPDATEDDESC)
  const sortByUpdatedDateUp = () => {
    var paragraphs = SortParagraphsByUpdatedDate(paragraphState.data, 1)
    props.setParagraphs({paragraphs})
    setSortCondition(UPDATEDASEC)
  }
  const sortByUpdatedDateDown = () => {
    var paragraphs = SortParagraphsByUpdatedDate(paragraphState.data, -1)
    props.setParagraphs({paragraphs})
    setSortCondition(UPDATEDDESC)
  }

  useEffect(() => {
    filterByConditions()
  }, [paragraphState])

  return (
    <Container fluid>
      <Form.Row className="align-items-center">
        <Col xs="3" className="my-1">
            <Form.Control placeholder="Search content" />
        </Col>
        <Col xs="auto" className="my-1">
            <Form.Control placeholder="Search note" />
        </Col>
        <Col className="my-1">
            <Button variant="light"><u>Clear</u></Button>
        </Col>
        <Col xs="auto" className="my-1">
          <DropdownButton variant="Light" alignRight title="Sort By" id="paragraph-sory-by">
            <Dropdown.Item onClick={sortByUpdatedDateUp}>
              Updated Date <FaArrowAltCircleUp />
            </Dropdown.Item>
            <Dropdown.Item onClick={sortByUpdatedDateDown}>
              Updated Date <FaArrowAltCircleDown />
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs="auto" className="my-1">
          <Form.Control as="select" className="mr-sm-2" onChange={changeColNum} custom>
            <option>Columns</option>
            {Array.from({length: maxColNum}, (_, index) => index + 1).map((index) =>
              <option key={index} value={index}>{index} {index > 1 ? "Columns" : "Column"} </option>
            )}
          </Form.Control>
        </Col>
      </Form.Row>
    </Container>
  );
}

export default ParagraphFilter;
