import { TagState, TagActionTypes, GET_TAGS } from '../types/tagTypes'

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
        default:
            return state;
    }
}


