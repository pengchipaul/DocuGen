import { combineReducers, AnyAction } from 'redux';
import { profileReducer, ProfileState } from './profileReducer';

export interface RootState {
    profile: ProfileState
}

const appReducer = combineReducers({
    profile: profileReducer
});

const initState: RootState = {
    profile: {
        profile: null
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
