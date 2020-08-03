import { ParagraphState, GET_PARAGRAPHS, ADD_PARAGRAPH, UPDATE_PARAGRAPH,
     ParagraphActionTypes } from "../types/paragraphTypes"
import { SortParagraphsByDate } from "../../helper/SortHelper"

const initState: ParagraphState = {
    data: null
}

export function paragraphReducer(state = initState, action: ParagraphActionTypes): ParagraphState{
    switch(action.type){
        case GET_PARAGRAPHS: 
            return {
                ...state,
                data: action.payload
            }
        case ADD_PARAGRAPH:
            state.data.push(action.payload)
            return {
                ...state
            }
        case UPDATE_PARAGRAPH:
            state.data = state.data.filter(item => item.id !== action.payload.id);
            state.data.push(action.payload);
            return {
                ...state,
                data: SortParagraphsByDate(state.data)
            };
        default:
            return state;
    }
}
