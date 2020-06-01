import { AnyAction } from "redux";

interface Process {
    name: String
}

export interface LoaderState {
    processes: Process[]
}

const initState: LoaderState = {
    processes: []
};

export function profileReducer(state = initState, action: AnyAction): LoaderState{
    switch(action.type){
        case "LOAD_PROCESS":
            state.processes.push()
            return {
                processes: [...state.processes, action.payload]
            }
        default: 
            return state;
    }
}