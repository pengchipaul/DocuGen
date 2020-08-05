import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import axios from "axios"

import { RootState } from "../reducers/rootReducer"
import { GET_PARAGRAPHS, ADD_PARAGRAPH, UPDATE_PARAGRAPH, DELETE_PARAGRAPH, 
  ParagraphInputModel, ADD_TAG_TO_PARAGRAPH, REMOVE_TAG_FROM_PARAGRAPH
} from "../types/paragraphTypes"

export const getParagraphs = (): ThunkAction<void, RootState, unknown, Action<String>> => {
  return (dispatch, getState) => {
    axios.get("/web_api/paragraphs/all")
      .then(function (res) {
        if (res.status === 200) {
          dispatch({
            type: GET_PARAGRAPHS,
            payload: res.data.data
          });
        } else {
          throw new Error()
        }
      })
      .catch(function (err) {

      })
      .finally(function () {

      })
  }
}

export const addParagraph = (paragraphInputModel: ParagraphInputModel): ThunkAction<void, RootState, unknown, Action<String>> => {
  return (dispatch, getState) => {
    axios.post("/web_api/paragraphs/store", paragraphInputModel)
      .then(function (res) {
        if (res.status === 200) {
          dispatch({
            type: ADD_PARAGRAPH,
            payload: res.data.data
          })
        } else {
          throw new Error()
        }
      })
      .catch(function (err) {

      })
      .finally(function () {

      })
  }
}

export const updateParagraph = (paragraphInputModel: ParagraphInputModel): ThunkAction<void, RootState, unknown, Action<String>> => {
  return (dispatch, getState) => {
    axios.patch("/web_api/paragraphs/update", paragraphInputModel)
      .then(function (res) {
        if (res.status === 200) {
          dispatch({
            type: UPDATE_PARAGRAPH,
            payload: res.data.data
          })
        } else {
          throw new Error()
        }
      })
      .catch(function (err) {

      })
      .finally(function () {

      })
  }
}

export const deleteParagraph = (id: BigInt): ThunkAction<void, RootState, unknown, Action<String>> => {
  return (dispatch, getState) => {
    axios.delete("/web_api/paragraphs/delete", {data: {id}})
      .then(function (res) {
        if (res.status === 200) {
          dispatch({
            type: DELETE_PARAGRAPH,
            payload: id
          })
        } else {
          throw new Error()
        }
      })
      .catch(function (err) {

      })
      .finally(function () {

      })
  }
}



export const addTagToParagraph = (paragraphId: BigInt, tagId: BigInt): ThunkAction<void, RootState, unknown, Action<String>> => {
  return (dispatch, getState) => {
    axios.post("/web_api/paragraphs/add_tag", {paragraphId, tagId})
      .then(function (res) {
        if (res.status === 200) {
          dispatch({
            type: ADD_TAG_TO_PARAGRAPH, 
            payload: res.data.data
          })
        } else {
          throw new Error()
        }
      })
      .catch(function (err) {

      })
      .finally(function () {

      })
  }
}

export const removeTagFromParagraph = (paragraphId: BigInt, tagId: BigInt): ThunkAction<void, RootState, unknown, Action<String>> => {
  return (dispatch, getState) => {
    axios.post("/web_api/paragraphs/remove_tag", {paragraphId: paragraphId, tagId: tagId})
      .then(function (res) {
        if (res.status === 200) {
          dispatch({
            type: REMOVE_TAG_FROM_PARAGRAPH, 
            payload: res.data.data
          })
        } else {
          throw new Error()
        }
      })
      .catch(function (err) {

      })
      .finally(function () {

      })
  }
}