import { AnyAction, Dispatch } from 'redux';

import { RootState } from '../reducers';
import { IDrawl } from './reducers';
export interface MintAppState {
	time: number;
	mintFormat: string;
	mintPause: boolean;
	mintOver: boolean;
	openDrawPopup: boolean;
	openSavePopup: boolean;
	nightMode: boolean;
	balance: string;
}

export interface DrawlAppState {
	drawls: IDrawl[];
	activeDrawl: IDrawl;
}

export interface MetaMaskUser {
	avatar: string
	createdAt: string
	description: string
	discord: string
	email: string
	facebook: string
	instagram: string
	medium: string
	name: string
	nonce: number
	password: string
	publicAddress: string
	telegram: string
	token: string
	twitter: string
	updatedAt: string
	__v: number
	_id: string
}

export interface MetaMaskData {
	token: string
	user: MetaMaskUser
}
export interface AuthAppState {
	metaMaskData: MetaMaskData

}



export interface IStore {
	dispatch: Dispatch<AnyAction>;
	getState: () => RootState;
}
