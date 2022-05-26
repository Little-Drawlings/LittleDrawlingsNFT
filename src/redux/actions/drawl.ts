import API from '../../api';
import types from '../reducers/drawl/types';
import { IDrawl } from '../types/reducers';

import { ethers } from "ethers";
import { abi } from '../../constants/abi';

async function main() {
    const w: any = window;
    const provider = new ethers.providers.Web3Provider(w.ethereum);
    const gasPrice = await provider.getGasPrice()
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contractAddress = '0xfe620436c5069f9a55b4ef7ddb859a3241b7c7e9';
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(address, gasPrice, 'ku gasPrice');
    console.log(signer, 'ku signer');
    const result = await contract.awardItem(address, 'json', { gasPrice });
    console.log("NFT award:", result);  
}

export const setDrawl = (drawl: IDrawl) => async (dispatch: (arg0: { type: string; data: IDrawl }) => void) => {
    // main().then(() => process.exit(0)).catch(error => {
    //     console.error(error);
    //     process.exit(1);
    // });
    return API.post(`/drawl`, drawl).then(() => {
        dispatch({
            type: types.GET_DRAWL,
            data: drawl
        })
    }).catch((error) => {
        throw error;
    })
}

export const getDrawl = (id: string) => (dispatch: (arg0: { type: string; data: IDrawl }) => void) => {
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