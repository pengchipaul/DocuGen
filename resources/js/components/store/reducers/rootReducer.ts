import { combineReducers, AnyAction } from 'redux';

import { profileReducer } from './profileReducer';
import { ProfileState } from "../types/profileTypes";
import { paragraphReducer } from "./paragraphReducer";
import { ParagraphState } from "../types/paragraphTypes";

export interface RootState {
    profile: ProfileState
    paragraphs: ParagraphState
}

const appReducer = combineReducers({
    profile: profileReducer,
    paragraphs: paragraphReducer
});

const initState: RootState = {
    profile: {
        data: null
    },
    paragraphs: {
        data: []
    }
};

export const rootReducer = (state: RootState = initState, action: AnyAction) => {
    if(action.type === 'LOGOUT_SUCCESS') {
        state = undefined;
    }
    if(action.type === 'UNAUTHORIZED') {
        document.location.href = "/";
    }
    return appReducer(state, action);
}
