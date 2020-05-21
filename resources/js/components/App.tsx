import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Home from "./pages/Home";
import { getProfile } from "./store/actions/profileAction";
import Example from "./pages/Example";
import NavBar from "./widgets/NavBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
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
                <Route exact path="/app" />
                <Route path="/app/home" component={Home} />
                <Route path="/app/example" component={Example} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
