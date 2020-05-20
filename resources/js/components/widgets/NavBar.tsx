import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

function NavBar(props: RouteComponentProps) {

    const navigateTo = (link: string) => {
        props.history.push("/app/" + link);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                        <h3>NavBar Example </h3>

                        <button onClick={() => navigateTo("home")} className="btn btn-primary">Go Home</button>
                        <button onClick={() => navigateTo("example")} className="btn btn-primary">Go to Example</button>

            </div>
        </div>
    )
}

export default withRouter(NavBar);