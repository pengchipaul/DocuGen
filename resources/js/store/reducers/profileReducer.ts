import { ProfileState, ProfileActionTypes, LOAD_PROFILE } from "../types/profileTypes";

const initState: ProfileState = {
    data: null
};

export function profileReducer(state = initState, action: ProfileActionTypes): ProfileState{
    switch(action.type){
        case LOAD_PROFILE:
            return {
                ...state,
                data: action.payload
            }
        default: 
            return state;
    }
}