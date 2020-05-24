import React, { useEffect } from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom'

function Paragraph(props: RouteComponentProps){
    
    useEffect(() => {
        localStorage.setItem("url", props.history.location.pathname);
    }, [])
    
    return (
        <div>Paragraph page</div>
    );
}

export default withRouter(Paragraph);