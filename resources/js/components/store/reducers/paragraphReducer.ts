import { ParagraphState, GET_PARAGRAPHS, ParagraphActionTypes } from "../types/paragraphTypes"

const initState: ParagraphState = {
    data: null
}

export function paragraphReducer(state = initState, action: ParagraphActionTypes): ParagraphState{
    switch(action.type){
        case GET_PARAGRAPHS: 
            console.log(action.payload);
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}
