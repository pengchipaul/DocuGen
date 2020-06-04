import { combineReducers, AnyAction } from 'redux'

import { profileReducer } from './profileReducer'
import { ProfileState } from "../types/profileTypes"
import { paragraphReducer } from "./paragraphReducer"
import { ParagraphState } from "../types/paragraphTypes"
import { tagReducer } from './tagReducer'
import { TagState } from '../types/tagTypes'

export interface RootState {
    profile: ProfileState
    paragraphs: ParagraphState
    tag: TagState
}

const appReducer = combineReducers({
    profile: profileReducer,
    paragraphs: paragraphReducer,
    tag: tagReducer
});

const initState: RootState = {
    profile: {
        data: null
    },
    paragraphs: {
        data: []
    },
    tag: {
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
