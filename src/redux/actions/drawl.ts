import API from '../../api';
import types from '../reducers/drawl/types';
import { IDrawl } from '../types/reducers';

import { ethers } from "ethers";
import { abi } from '../../constants/abi';
import { CONTRACT_ADDRESS } from '../../constants/data';

export const contractDrawl = async (ipnsPath: string) => {
    const w: any = window;
    const provider = new ethers.providers.Web3Provider(w.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    if (address && ipnsPath) {
        return await contract.mintNFT(address, ipnsPath, { gasLimit: 210000 });
    }
}

export const setDrawl = (drawl: IDrawl) => async (dispatch: (arg0: { type: string; data: IDrawl }) => void) => {
    const id = drawl?.id;
    const apiRequest = id ? API.put(`/drawl`, drawl) : API.post(`/drawl`, drawl);
    return apiRequest.then((result) => {
        dispatch({
            type: types.GET_DRAWL,
            data: drawl
        });
        return result.data.data
    }).catch((error) => {
        throw error;
    })
}

export const getDrawl = (id: string) => (dispatch: (arg0: { type: string; data: IDrawl | null }) => void) => {
    if (!id) {
        dispatch({
            type: types.GET_DRAWL,
            data: null
        });
        return;
    }
    return API.get(`/drawl/${id}`).then((response) => {
        dispatch({
            type: types.GET_DRAWL,
            data: response.data
        });
    }).catch((error) => {
        throw error;
    })
}

export const getAllDrawls = () => (dispatch: (arg0: { type: string; data: IDrawl[] }) => void) => {
    return API.get(`/drawl/getAll`).then((response) => {
        dispatch({
            type: types.GET_ALL_DRAWLS,
            data: response.data
        });
    }).catch((error) => {
        throw error;
    })
}