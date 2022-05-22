import { AnyAction, Dispatch } from 'redux';

import { RootState } from '../reducers';
import { IDrawl, ITimeConfig } from './reducers';
export interface MintAppState {
	time: ITimeConfig;
	mintFormat: string;
	mintPause: boolean;
	mintOver: boolean;
	openedDrawPopup: boolean;
	openSavePopup: boolean;
	nightMode: boolean;
}

export interface DrawlAppState {
	drawls: IDrawl[];
	activeDrawl: IDrawl;
}

export interface AuthAppState {
	test: string
}

export interface IStore {
	dispatch: Dispatch<AnyAction>;
	getState: () => RootState;
}
