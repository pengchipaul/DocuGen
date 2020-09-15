import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Nav, Row } from 'react-bootstrap';

function NavBar(props: RouteComponentProps) {
  const navigateTo = (link: string) => {
    props.history.push("/app" + link);
  };

  useEffect(() => {
    if(localStorage.getItem("url") !== null) {
      var url = localStorage.getItem("url");
      props.history.push(url);
    }
  },[]);

  return (
    <div className="container">
      <Row>
        <Nav className="flex-column">
          <Nav.Link onClick={() => navigateTo("")}>Home</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/templates")}>Templates</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/paragraphs")}>Paragraphs</Nav.Link>
        </Nav>
      </Row>
    </div>
  );
}

export default withRouter(NavBar);
