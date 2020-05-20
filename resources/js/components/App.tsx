import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link, RouteComponentProps, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/Home';
import { getProfile } from './store/actions/profileAction';
import Example from './pages/Example';
import NavBar from './widgets/NavBar';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile());
    })

    return (
        <React.Fragment>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path='/' />
                    <Route path='/app/home' component={Home} />
                    <Route path='/app/example' component={Example} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default App;