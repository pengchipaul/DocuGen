import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import axios from 'axios'

import { RootState } from '../reducers/rootReducer'
import { GET_TAGS, ADD_TAG, TagInputModel } from '../types/tagTypes'

export const getTagsAction = (): ThunkAction<void, RootState, unknown, Action<String>> => {
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

export const addTagAction = (tag: TagInputModel): ThunkAction<void, RootState, unknown, Action<String>> => {
    return (dispatch, getState) => {
        axios.post('/web_api/tags/store', tag)
            .then(function(res) {
                dispatch({
                    type: ADD_TAG,
                    payload: res.data.data
                })
            })
            .catch(function(err) {

            })
            .finally(function() {

            })
    }
}