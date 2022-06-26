import API from '../../api';
import types from '../reducers/drawl/types';
import { IDrawl } from '../types/reducers';

import { ethers } from "ethers";
import { setLoading } from './mint';

export const contractDrawl = async (ipnsPath: string) => {
    const w: any = window;
    const provider = new ethers.providers.Web3Provider(w.ethereum);
    const signer = provider.getSigner();
    //const address = await signer.getAddress();
    // const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    // if (address && ipnsPath) {
    //     return await contract.mintNFT(address, ipnsPath, { gasLimit: 210000 });
    // }
}

export const getAbiData = () => {
    const url = process.env.REACT_APP_ABI_URL;
    console.log(url);
    
    if (!url) return;
    return API.get(url).then(response => console.log(JSON.stringify(response), 'ku response')
    )
}

export const setDrawl = (drawl: { [x: string]: string | Blob; id: any; }) => async (dispatch: (arg0: { type: string; data: IDrawl | boolean }) => void) => {
    dispatch(setLoading(true));
    const formData = new FormData();
    for (let key in drawl) {
        if (key && drawl[key]) {
            formData.append(key, drawl[key]);
        }
    }
    const id = drawl?.id;
    const apiRequest = id ? API.put(`/drawl`, formData) : API.post(`/drawl`, formData);
    return apiRequest.then((result) => {
        const drawlData: IDrawl = result.data.data
        dispatch({
            type: types.GET_DRAWL,
            data: drawlData
        });
        return drawlData
    }).catch((error) => {
        throw error;
    }).finally(() => dispatch(setLoading(false)))
}

export const getDrawl = (id: string) => (dispatch: (arg0: { type: string; data: IDrawl | null | boolean }) => void) => {
    if (!id) {
        dispatch({
            type: types.GET_DRAWL,
            data: null
        });
        return;
    }
    dispatch(setLoading(true));
    return API.get(`/drawl/${id}`).then((response) => {
        dispatch({
            type: types.GET_DRAWL,
            data: response.data
        });
    }).catch((error) => {
        throw error;
    }).finally(() => dispatch(setLoading(false)))
}

export const getAllDrawls = () => (dispatch: (arg0: { type: string; data: IDrawl[] | boolean }) => void) => {
    dispatch(setLoading(true));
    return API.get(`/drawl/getAll`).then((response) => {
        dispatch({
            type: types.GET_ALL_DRAWLS,
            data: response.data
        });
    }).catch((error) => {
        throw error;
    }).finally(() => dispatch(setLoading(false)))
}