import React, { useState, useEffect } from "react"
import { Pagination, Container, Row, Col, Form, Button } from "react-bootstrap"

interface PaginationHelperProps {
  dataSource: {
    data: any[]
  },
  pageSize: number,
  setData: Function
}

function PaginationHelper(props: PaginationHelperProps) {

  const [pageNum, setPageNum] = useState(1)
  const lastPage = Math.ceil(props.dataSource.data.length / props.pageSize)
  // state for goto page
  const [pageInput, setPageInput] = useState("")
  const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) >= 1 &&
      parseInt(event.currentTarget.value) <= lastPage) {
      setPageInput(event.currentTarget.value)
    }
  }
  const gotoPageOnClick = () => {
    var page: number
    try {
      page = parseInt(pageInput)
      gotoPage(page)
    } catch (e) {
      return
    }
  }

  useEffect(() => {
    console.log("paging")
    if(props.dataSource.data.length == 0){
        props.setData({
            data: []
        })
        return
    }
    var indexStart = (pageNum - 1) * props.pageSize
    props.setData({
      data: props.dataSource.data.slice(indexStart, indexStart + props.pageSize)
    })
  }, [pageNum, props.dataSource, props.pageSize])

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1)
    }
  }

  const nextPage = () => {
    if (pageNum < lastPage) {
      setPageNum(pageNum + 1)
    }
  }

  const gotoPage = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      setPageNum(page)
    }
  }

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Pagination>
            <Pagination.First onClick={() => gotoPage(1)} />
            <Pagination.Prev onClick={prevPage} />
            <Pagination.Item active>{pageNum}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
            <Pagination.Last onClick={() => gotoPage(lastPage)} />
          </Pagination>
        </Col>
        <Col md="auto">
          <Form inline>
            <Form.Label className="mr-3">
              {pageNum} / {lastPage}
            </Form.Label>
            <Form.Control
              onChange={handlePageInputChange}
              value={pageInput}
              type="number"
              as="input"
              style={{width: 70}}
            />
            <Button onClick={gotoPageOnClick} variant="light">
              Go
            </Button>
          </Form>

        </Col>
      </Row>

    </Container>
  )
}

export default PaginationHelper
