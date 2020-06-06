import { TagState, TagActionTypes, GET_TAGS, ADD_TAG } from '../types/tagTypes'

const initState: TagState = {
    data: null
}

export function tagReducer(state = initState, action: TagActionTypes): TagState{
    switch(action.type){
        case GET_TAGS:
            return {
                ...state,
                data: action.payload
            }
        case ADD_TAG: 
            state.data.push(action.payload)
            return {
                ...state
            }
        default:
            return state;
    }
}


