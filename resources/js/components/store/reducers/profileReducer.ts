import { ProfileState, ProfileActionTypes, LOAD_PROFILE } from "../types/profileTypes";

const initState: ProfileState = {
    profile: null
};

export function profileReducer(state = initState, action: ProfileActionTypes): ProfileState{
    switch(action.type){
        case LOAD_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default: 
            return state;
    }
}