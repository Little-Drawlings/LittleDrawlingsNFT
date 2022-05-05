import types from '../reducers/mint/types';

export const setTimeMint = (goesTime: boolean) => ({
	type: types.SET_TIME,
	data: goesTime,
});

export const setFormatMint = (format: string) => ({
	type: types.SET_FORMAT,
	data: format,
});
