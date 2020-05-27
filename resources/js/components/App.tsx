import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Home from "./pages/Home";
import { getProfile } from "./store/actions/profileAction";
import { getParagraphs } from "./store/actions/paragraphAction";
import NavBar from "./widgets/NavBar";
import Template from "./pages/Template";
import Paragraph from "./pages/Paragraph";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getParagraphs());
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Container fluid>
          <Row>
            <Col xl={2} lg={3}>
              <NavBar />
            </Col>
            <Col xl={10} lg={9}>
              <Switch>
                <Route exact path="/app" component={Home} />
                <Route path="/app/templates" component={Template} />
                <Route path="/app/paragraphs" component={Paragraph} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
