import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/reducers/rootReducer';
import { Profile } from '../store/reducers/profileReducer';


function Home() {
    const profile: Profile = useSelector( (state: RootState) => state.profile.profile);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Welcome, {profile && profile.username} </div>

                        <div className="card-body">I'm an example component!!!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;