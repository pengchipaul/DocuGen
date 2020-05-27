import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { RootState } from "../store/reducers/rootReducer";
import { Profile } from "../store/types/profileTypes";
import { Paragraph } from "../store/types/paragraphTypes";

function Home(props: RouteComponentProps) {
  const profile: Profile = useSelector(
    (state: RootState) => state.profile.profile
  );

  const paragraphs: Paragraph[] = useSelector(
    (state: RootState) => state.paragraphs.paragraphs
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
      {paragraphs.length > 0 && paragraphs.map((p) => 
        <Row key={p.id.toString()} className="mb-3">
          <Col>
          <div className="card">
            <div className="card-header">
              {p.tags.map((t) => 
                <button key={t.id.toString()} className="mr-2 btn btn-danger">{t.name}</button>
              )}
            </div>
            <div className="card-body">{p.content}</div>
            <div className="card-footer text-secondary">{p.note}</div>
          </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default withRouter(Home);
