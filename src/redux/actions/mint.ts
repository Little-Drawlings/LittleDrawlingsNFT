import types from '../reducers/mint/types';
import { ITimeConfig } from '../types/reducers';

export const setPauseMint = (pause: boolean) => ({
	type: types.SET_MINT_PAUSE,
	data: pause,
});

export const setOverMint = (over: boolean) => ({
	type: types.SET_MINT_OVER,
	data: over,
});

export const setTimeMint = (time: ITimeConfig) => ({
	type: types.SET_TIME,
	data: time,
});

export const setFormatMint = (format: string) => ({
	type: types.SET_FORMAT,
	data: format,
});

export const setOpenedDrawPopup = (opened: boolean) => ({
	type: types.SET_OPENED_DRAW_POPUP,
	data: opened,
});
