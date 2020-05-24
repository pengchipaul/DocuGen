import React, { useEffect } from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom'

function Template(props: RouteComponentProps){
    
    useEffect(() => {
        localStorage.setItem("url", props.history.location.pathname);
    }, [])
    
    return (
        <div>Template page</div>
    );
}

export default withRouter(Template);