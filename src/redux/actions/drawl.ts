import API from '../../api';
import types from '../reducers/drawl/types';
import { IDrawl } from '../types/reducers';

import { ethers } from 'ethers';
import { setLoading } from './mint';

const PRICE = process.env.REACT_APP_PRICE;

const getDrawlOwner = async (contractData: { abi: any; address: string }, tokenId: string) => {
    if (!contractData?.address || !tokenId?.length) {
        return;
    }
    const w: any = window;
    const provider = new ethers.providers.Web3Provider(w.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        contractData.address,
        contractData.abi,
        signer
    );
    return await contract.ownerOf(tokenId);
};

export const getAllDrawls =
    (contractData: { abi: any; address: string }, address: string) =>
        (dispatch: (arg0: { type: string; data: IDrawl[] | boolean }) => void) => {
            dispatch(setLoading(true));
            return API.get(`/drawl/getAll`)
                .then(async (response) => {
                    const drawlsList = response.data || [];
                    let drawlData = await Promise.all(drawlsList.map(async (drawl: IDrawl) => {
                        const tokenId = drawl?.tokenId;
                        if (tokenId) {
                            const owner = await getDrawlOwner(contractData, tokenId);
                            return address?.toString()?.toLowerCase() === owner?.toString()?.toLowerCase() ? drawl : null
                        }
                        else {
                            return null
                        }
                    }));
                    drawlData = drawlData?.filter(Boolean);
                    console.log(drawlData, 'ku drawlData');

                    dispatch({
                        type: types.GET_ALL_DRAWLS,
                        data: drawlData,
                    });
                })
                .catch((error) => {
                    throw error;
                })
                .finally(() => dispatch(setLoading(false)));
        };

export const contractDrawl =
    (ipnsPath: string) =>
        async (dispatch: (arg0: { type: string; data: boolean }) => void) => {
            dispatch(setLoading(true));
            const w: any = window;
            const provider = new ethers.providers.Web3Provider(w.ethereum);
            const signer = provider.getSigner();
            const contractData: any = await getContractData();

            if (!contractData) {
                dispatch(setLoading(false));
                return;
            }

            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                contractData.address,
                contractData.abi,
                signer
            );
            if (address) {
                try {
                    const ipnsLink = ipnsPath || '';
                    return await contract.mintNFT(address, ipnsLink, {
                        gasLimit: 210000,
                        value: Number(PRICE) * 10 ** 18,
                    });
                } catch {
                    dispatch(setLoading(false));
                }
            }
            return address;
        };

export const getContractData = () => {
    return API.get(`/drawl/getContractData`)
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const deleteDrawl = (id: string) => {
    return API.delete(`/drawl/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const setDrawl =
    (drawl: { [x: string]: string | Blob; id?: any }) =>
        async (
            dispatch: (arg0: { type: string; data: IDrawl | boolean }) => void
        ) => {
            dispatch(setLoading(true));
            const formData = new FormData();
            for (let key in drawl) {
                if (key && drawl[key]) {
                    formData.append(key, drawl[key]);
                }
            }

            const id = drawl?.id;
            const apiRequest = id
                ? API.put(`/drawl`, formData)
                : API.post(`/drawl`, formData);
            return apiRequest
                .then((result) => {
                    const drawlData: IDrawl = result.data.data;
                    dispatch({
                        type: types.GET_DRAWL,
                        data: drawlData,
                    });
                    return drawlData;
                })
                .catch((error) => {
                    dispatch(setLoading(false));
                    throw error;
                })
                .finally(() => dispatch(setLoading(false)));
        };

export const getDrawl =
    (id: string) =>
        (
            dispatch: (arg0: { type: string; data: IDrawl | null | boolean }) => void
        ) => {
            if (!id) {
                dispatch({
                    type: types.GET_DRAWL,
                    data: null,
                });
                return;
            }
            dispatch(setLoading(true));
            return API.get(`/drawl/${id}`)
                .then((response) => {
                    dispatch({
                        type: types.GET_DRAWL,
                        data: response.data,
                    });
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                })
                .finally(() => dispatch(setLoading(false)));
        };