import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io'

import ParagraphItem from '../widgets/paragraph/ParagraphItem'
import PargraphToolBar from '../widgets/paragraph/PargraphToolBar'
import { RootState } from '../../store/reducers/rootReducer'
import { ParagraphState, Paragraph } from '../../store/types/paragraphTypes'


function ParagraphPage(props: RouteComponentProps) {
  const paragraphState: ParagraphState = useSelector(
    (state: RootState) => state.paragraphs
  )

  useEffect(() => {
    localStorage.setItem("url", props.history.location.pathname);
  }, [])

  function sortByDate(array: Paragraph[]): Paragraph[]{
      return array.sort(function(a: Paragraph, b: Paragraph) {
        return compareDate(a.updated_at, b.updated_at)
      });
  }

  function compareDate(date1: Date, date2: Date){
      if(date1 > date2) {
          return -1;
      } else {
          return 1;
      }
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          {paragraphState.data.length > 0 &&
            <Row>
              {sortByDate(paragraphState.data).map((p) =>
                <Col sm="12" key={p.id.toString()} className="mb-5">
                  <ParagraphItem paragraph={p} />
                </Col>
              )}
            </Row>
          }
        </Col>
        <Col md="auto">
          <PargraphToolBar />
        </Col>
      </Row>


    </Container>
  )
}

export default withRouter(ParagraphPage);
