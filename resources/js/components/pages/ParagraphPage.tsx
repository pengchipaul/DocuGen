import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import ParagraphItem from '../widgets/paragraph/ParagraphItem'
import PargraphToolBar from '../widgets/paragraph/PargraphToolBar'
import { RootState } from '../../store/reducers/rootReducer'
import { ParagraphState } from '../../store/types/paragraphTypes'
import ParagraphFilter from "../widgets/paragraph/ParagraphFilter"

function ParagraphPage(props: RouteComponentProps) {
  const paragraphState: ParagraphState = useSelector(
    (state: RootState) => state.paragraphs
  )

  useEffect(() => {
    localStorage.setItem("url", props.history.location.pathname);
  }, [])


  const [filter, setFilter] = useState({
    paragraphs: []
  })

  const [colNum, setColNum] = useState(2)
  
  return (
    <Container fluid>
      <Row>
        <Col sm="11">
          <Row className="mb-3">
            <ParagraphFilter  setColNum={setColNum} setParagraphs={setFilter} />
          </Row>
          {filter.paragraphs.length > 0 &&
            <Row>
              {filter.paragraphs.map((p) =>
                <Col md={12/colNum} key={p.id.toString()} className="mb-3">
                  <ParagraphItem width={colNum} paragraph={p} />
                </Col>
              )}
            </Row>
          }
        </Col>
        <Col sm="1">
          <PargraphToolBar />
        </Col>
      </Row>


    </Container>
  )
}

export default withRouter(ParagraphPage);
