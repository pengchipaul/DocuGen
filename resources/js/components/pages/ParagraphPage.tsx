import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io'

import ParagraphItem from '../widgets/paragraph/ParagraphItem'
import PargraphToolBar from '../widgets/paragraph/PargraphToolBar'
import { RootState } from '../../store/reducers/rootReducer'
import { Paragraph } from '../../store/types/paragraphTypes'


function ParagraphPage(props: RouteComponentProps) {
  const paragraphs: Paragraph[] = useSelector(
    (state: RootState) => state.paragraphs.data
  )

  useEffect(() => {
    localStorage.setItem("url", props.history.location.pathname);
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col>
          {paragraphs.length > 0 &&
            <Row>
              {paragraphs.map((p) => 
                <Col md="6" key={p.id.toString()} className="mb-5">
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