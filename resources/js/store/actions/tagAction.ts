import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import axios from 'axios'

import { RootState } from '../reducers/rootReducer'
import { GET_TAGS, TagInputModel } from '../types/tagTypes'

export const getTags = (): ThunkAction<void, RootState, unknown, Action<String>> => {
    return (dispatch, getState) => {
        axios.get('/web_api/tags/all')
            .then(function(res) {
                dispatch({
                    type: GET_TAGS,
                    payload: res.data.data
                })
            })
            .catch(function(err) {

            })
            .finally(function() {

            })
    }
}