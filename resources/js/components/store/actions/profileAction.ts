import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import axios from "axios"

import { RootState } from "../reducers/rootReducer"
import { Profile } from "../types/profileTypes"


export const getProfile = (): ThunkAction<void, RootState, unknown, Action<String>> => {
    return (dispatch, getState) => {
        // to be filled: dispatch start loading process
        axios.get("/web_api/auth/profile")
            .then(function(res) {
                if(res.status === 200) {
                    const profile: Profile = {
                        username: res.data.profile.username,
                        email: res.data.profile.email
                    }
                    dispatch({
                        type: "LOAD_PROFILE",
                        payload: profile
                    })
                } else {
                    throw new Error();
                }
            })
            .catch(function(err){
                // to be filled: dispatch failure notification
            })
            .finally(function() {
                return; // to be modified: dispatch end loading process
            });
    }
}