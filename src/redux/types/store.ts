import { AnyAction, Dispatch } from 'redux';

import { RootState } from '../reducers';
export interface MintAppState {
	goesTime: boolean;
	mintFormat: string;
}

export interface IStore {
	dispatch: Dispatch<AnyAction>;
	getState: () => RootState;
}
