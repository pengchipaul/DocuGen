import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import axios from "axios"

import { RootState } from "../reducers/rootReducer"
import { GET_PARAGRAPHS } from "../types/paragraphTypes"

export const getParagraphs = (): ThunkAction<void, RootState, unknown, Action<String>> => {
    return (dispatch, getState) => {
        axios.get("/web_api/paragraphs/all")
            .then(function(res) {
                if(res.status === 200){
                    console.log(res.data.data);
                    dispatch({
                        type: GET_PARAGRAPHS,
                        payload: res.data.data
                    });
                } else {
                    throw new Error();
                }
            })
            .catch(function(err){

            })
            .finally(function() {

            })
    }
}