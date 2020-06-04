import { ParagraphState, GET_PARAGRAPHS, ADD_PARAGRAPH, ParagraphActionTypes } from "../types/paragraphTypes"

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
        default:
            return state;
    }
}
