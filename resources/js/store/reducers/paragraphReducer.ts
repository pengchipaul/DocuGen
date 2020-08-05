import { ParagraphState, GET_PARAGRAPHS, ADD_PARAGRAPH, UPDATE_PARAGRAPH,
     ParagraphActionTypes, ADD_TAG_TO_PARAGRAPH, REMOVE_TAG_FROM_PARAGRAPH } from "../types/paragraphTypes"
import { SortParagraphsByDate, ReplaceParagraphInArray } from "../../helper/ParagraphHelper"

const initState: ParagraphState = {
    data: null
}

export function paragraphReducer(state = initState, action: ParagraphActionTypes): ParagraphState{
    switch(action.type){
        case GET_PARAGRAPHS: 
            state.data = SortParagraphsByDate(action.payload)
            return {
                ...state,
                data: state.data
            }
        case ADD_PARAGRAPH:
            state.data.push(action.payload)
            state.data = SortParagraphsByDate(state.data)
            return {
                ...state,
                data: state.data
            }
        case UPDATE_PARAGRAPH:
            ReplaceParagraphInArray(state.data, action.payload)
            return {
                ...state,
                data: state.data
            };
        case ADD_TAG_TO_PARAGRAPH: 
            ReplaceParagraphInArray(state.data, action.payload)
            return {
                ...state,
                data: state.data
            };
        case REMOVE_TAG_FROM_PARAGRAPH:
            ReplaceParagraphInArray(state.data, action.payload)
            return {
                ...state,
                data: state.data
            };
        default:
            return state;
    }
}
