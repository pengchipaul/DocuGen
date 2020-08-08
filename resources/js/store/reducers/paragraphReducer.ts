import { ParagraphState, GET_PARAGRAPHS, ADD_PARAGRAPH, UPDATE_PARAGRAPH, DELETE_PARAGRAPH,
     ParagraphActionTypes, ADD_TAG_TO_PARAGRAPH, REMOVE_TAG_FROM_PARAGRAPH } from "../types/paragraphTypes"
import { SortParagraphsByUpdatedDate, ReplaceParagraphInArray } from "../../helper/ParagraphHelper"

const initState: ParagraphState = {
    data: null
}

export function paragraphReducer(state = initState, action: ParagraphActionTypes): ParagraphState{
    switch(action.type){
        case GET_PARAGRAPHS: 
            state.data = SortParagraphsByUpdatedDate(action.payload, -1)
            return {
                ...state,
                data: state.data
            }
        case ADD_PARAGRAPH:
            state.data.push(action.payload)
            state.data = SortParagraphsByUpdatedDate(state.data, -1)
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
        case DELETE_PARAGRAPH: 
            state.data = state.data.filter((p) => {
                return p.id != action.payload
            })
            return {
                ...state,
                data: state.data
            }
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
