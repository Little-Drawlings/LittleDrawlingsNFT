import { ethers } from "ethers";

import types from '../reducers/mint/types';

export const getBalance = () => async (dispatch: any) => {
	const w: any = window;
	const provider = new ethers.providers.Web3Provider(w.ethereum);
	const signer = provider.getSigner();
	const address = await signer.getAddress();
	provider.getBalance(address).then((balance) => {
		const balanceInEth = ethers.utils.formatEther(balance)
		dispatch({
			type: types.SET_BALANCE,
			data: balanceInEth,
		})
	})
}

export const setPauseMint = (pause: boolean) => ({
	type: types.SET_MINT_PAUSE,
	data: pause,
});

export const setOverMint = (over: boolean) => ({
	type: types.SET_MINT_OVER,
	data: over,
});

export const setTimeMint = (time: number) => ({
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

export const setOpenSavePopup = (opened: boolean) => ({
	type: types.SET_OPEN_SAVE_POPUP,
	data: opened,
});

export const setNightModeMint = (nightMode: boolean) => ({
	type: types.SET_NIGHT_MODE,
	data: nightMode,
});
