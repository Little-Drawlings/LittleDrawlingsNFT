import { AnyAction, Dispatch } from 'redux';

import { RootState } from '../reducers';
import { ITimeConfig } from './reducers';
export interface MintAppState {
	time: ITimeConfig;
	mintFormat: string;
	mintPause: boolean;
	mintOver: boolean;
	openedDrawPopup: boolean;
	openSavePopup: boolean;
}

export interface IStore {
	dispatch: Dispatch<AnyAction>;
	getState: () => RootState;
}
