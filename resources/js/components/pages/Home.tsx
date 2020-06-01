import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import { RootState } from '../../store/reducers/rootReducer'
import { Profile } from '../../store/types/profileTypes'

function Home(props: RouteComponentProps) {
  const profile: Profile = useSelector(
    (state: RootState) => state.profile.data
  );

  useEffect(() => {
    localStorage.setItem("url", props.history.location.pathname);
  }, []);

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <div className="card">
            <div className="card-header">
              Welcome, {profile && profile.username}{" "}
            </div>
            <div className="card-body">I'm an example component!!!</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Home);