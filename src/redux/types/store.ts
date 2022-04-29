import {AnyAction, Dispatch} from 'redux';

import {RootState} from '../reducers';
export interface MintAppState {
    test: string
}

export interface IStore {
    dispatch: Dispatch<AnyAction>;
    getState: () => RootState;
}
