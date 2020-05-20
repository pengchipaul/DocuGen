import { AnyAction } from "redux";

export interface Profile {
    username: String,
    email: String
}

export interface ProfileState {
    profile: Profile
}

const initState: ProfileState = {
    profile: null
};

export function profileReducer(state = initState, action: AnyAction): ProfileState{
    switch(action.type){
        case "LOAD_PROFILE":
            return {
                ...state,
                profile: action.payload
            }
        default: 
            return state;
    }
}