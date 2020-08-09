import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import ParagraphItem from "../widgets/paragraph/ParagraphItem"
import PargraphToolBar from "../widgets/paragraph/PargraphToolBar"
import ParagraphFilter from "../widgets/paragraph/ParagraphFilter"
import PaginationHelper from "../widgets/common/PaginationHelper"

function ParagraphPage(props: RouteComponentProps) {

  useEffect(() => {
    localStorage.setItem("url", props.history.location.pathname);
  }, [])


  const [filter, setFilter] = useState({
    data: []
  })

  const [pagedData, setPagedData] = useState({
    data: []
  })

  const [colNum, setColNum] = useState(2)

  const rowNumber = 2

  return (
    <Container fluid>
      <Row>
        <Col sm="11">
          <Row className="mb-3">
            <ParagraphFilter setColNum={setColNum} setParagraphs={setFilter} />
          </Row>
          {pagedData.data.length > 0 &&
            <Row>
              {pagedData.data.map((p) =>
                <Col md={12 / colNum} key={p.id.toString()} className="mb-2 px-1">
                  <ParagraphItem width={colNum} paragraph={p} />
                </Col>
              )}
            </Row>
          }

          {/* pagination */}
          {filter.data.length > colNum * rowNumber &&
            <Row className="mt-2">
              <PaginationHelper pageSize={colNum * rowNumber} data={filter.data} setData={setPagedData} />
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
