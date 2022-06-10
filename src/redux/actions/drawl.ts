import API from '../../api';
import types from '../reducers/drawl/types';
import { IDrawl } from '../types/reducers';

import { ethers } from "ethers";
import { abi } from '../../constants/abi';
import { CONTRACT_ADDRESS } from '../../constants/data';

async function contract(ipfsPath: string, id?: string) {
    if (id) {
        return
    }
    const w: any = window;
    const provider = new ethers.providers.Web3Provider(w.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    if (address && ipfsPath) {
        return await contract.mintNFT(address, ipfsPath, { gasLimit: 210000 });
    }
    return;
}

export const setDrawl = (drawl: IDrawl, ipfsPath: string) => async (dispatch: (arg0: { type: string; data: IDrawl }) => void) => {
    const id = drawl?.id;
    contract(ipfsPath, id).then((res) => {
        const hash = res?.hash;
        const apiReq = id ? API.put(`/drawl`, drawl) : API.post(`/drawl`, { ...drawl, hash });
        return apiReq.then(() => {
            dispatch({
                type: types.GET_DRAWL,
                data: drawl
            })
        }).catch((error) => {
            throw error;
        })
    });
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