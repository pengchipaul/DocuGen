import { ParagraphState, GET_PARAGRAPHS, ParagraphActionTypes } from "../types/paragraphTypes"

const initState: ParagraphState = {
    paragraphs: null
}

export function paragraphReducer(state = initState, action: ParagraphActionTypes): ParagraphState{
    switch(action.type){
        case GET_PARAGRAPHS: 
            console.log(action.payload);
            return {
                ...state,
                paragraphs: action.payload
            }
        default:
            return state;
    }
}
