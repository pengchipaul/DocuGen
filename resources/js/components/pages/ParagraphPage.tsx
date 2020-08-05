import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io'

import ParagraphItem from '../widgets/paragraph/ParagraphItem'
import PargraphToolBar from '../widgets/paragraph/PargraphToolBar'
import { RootState } from '../../store/reducers/rootReducer'
import { ParagraphState } from '../../store/types/paragraphTypes'
import { SortParagraphsByDate } from '../../helper/ParagraphHelper'


function ParagraphPage(props: RouteComponentProps) {
  const paragraphState: ParagraphState = useSelector(
    (state: RootState) => state.paragraphs
  )

  useEffect(() => {
    localStorage.setItem("url", props.history.location.pathname);
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col sm="11">
          {paragraphState.data.length > 0 &&
            <Row>
              {paragraphState.data.map((p) =>
                <Col md="6" key={p.id.toString()} className="mb-5">
                  <ParagraphItem paragraph={p} />
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
