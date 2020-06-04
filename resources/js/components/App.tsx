import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import Home from './pages/Home'
import { getProfile } from '../store/actions/profileAction'
import { getParagraphs } from '../store/actions/paragraphAction'
import { getTags } from '../store/actions/tagAction'
import NavBar from './widgets/NavBar'
import TemplatePage from './pages/TemplatePage'
import ParagraphPage from './pages/ParagraphPage'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
    dispatch(getParagraphs())
    dispatch(getTags())
  }, [])

  return (
    <React.Fragment>
      <Router>
        <Container fluid>
          <Row>
            <Col xl={1} lg={2}>
              <NavBar />
            </Col>
            <Col xl={11} lg={10}>
              <Switch>
                <Route exact path="/app" component={Home} />
                <Route path="/app/templates" component={TemplatePage} />
                <Route path="/app/paragraphs" component={ParagraphPage} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
