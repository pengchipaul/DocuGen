export interface Profile {
    username: String, 
    email: String
}

export interface ProfileState {
    data: Profile
}

export const LOAD_PROFILE = 'LOAD_PROFILE'

interface LoadProfileAction {
    type: typeof LOAD_PROFILE,
    payload: Profile
}

export type ProfileActionTypes = LoadProfileAction