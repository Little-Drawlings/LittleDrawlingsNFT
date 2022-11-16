import { ethers } from "ethers";
import { deleteToken } from "../../api";

import types from '../reducers/mint/types';
import { DefaultPopupProps } from "../types/data";

export const getBalance = () => async (dispatch: any) => {
	const w: any = window;
	const provider = new ethers.providers.Web3Provider(w.ethereum);
	const signer = provider.getSigner();
	let address = '';
	try {
		address = await signer.getAddress();
		provider.getBalance(address).then((balance) => {
			const balanceInEth = ethers.utils.formatEther(balance)
			dispatch({
				type: types.SET_BALANCE,
				data: balanceInEth,
			})
		})
	}
	catch {
		deleteToken()
	}
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

export const setOpenDrawPopup = (opened: boolean) => ({
	type: types.SET_OPEN_DRAW_POPUP,
	data: opened,
});

export const setOpenSavePopup = (opened: boolean) => ({
	type: types.SET_OPEN_SAVE_POPUP,
	data: opened,
});

export const setOpenProvenancePopup = (opened: boolean) => ({
	type: types.SET_OPEN_PROVENANCE_POPUP,
	data: opened,
});

export const setOpenDefaultPopup = (opened: boolean) => ({
	type: types.SET_OPEN_DEFAULT_POPUP,
	data: opened,
});

export const setDefaultPopupProps = (data: DefaultPopupProps) => ({
	type: types.SET_DEFAULT_POPUP_PROPS,
	data: data,
});


export const setNightModeMint = (nightMode: boolean) => ({
	type: types.SET_NIGHT_MODE,
	data: nightMode,
});

export const setLoading = (loading: boolean) => ({
	type: types.SET_LOADING,
	data: loading
});
