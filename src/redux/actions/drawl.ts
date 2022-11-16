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
    return await contract.ownerOf(parseInt(tokenId, 16));
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
                            return null;
                        }
                    }));
                    drawlData = drawlData?.filter(Boolean);
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
    (createdItem: any) =>
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

                const data = new Promise((resolve) => {
                    contract.on("Transfer", async (from, to, amount, event) => {
                        const receipt = await event.getTransactionReceipt();
                        const tnx = await event.getTransaction();

                        const dataToDecode = receipt.logs.find((log: any) => {
                            return log.data.toLowerCase().includes(address?.toLowerCase()?.slice(2, -1))
                        })

                        if(!dataToDecode) resolve(null)
                        const decodeData = await ethers.utils.defaultAbiCoder.decode([ "address", "uint256" ], dataToDecode.data);

                        if (address?.toLowerCase() === tnx.from?.toLowerCase()) {
                            event.removeListener();
                            resolve(decodeData[1]);
                        }
                    });
                })

                const mint = new Promise(async (resolve) => {
                    const res = contract.mintNFT(address?.toLowerCase(), `https://${createdItem.ipnsLink}.ipns.cf-ipfs.com`, {
                        gasLimit: 1100000,
                        value: Number(PRICE) * 10 ** 18
                    })
                        .then((res: any) => {
                            resolve(res)
                        })
                        .catch((err: any) => {
                            resolve(err)
                        })

                    return res;
                })

                const mintRes = await mint;

                // @ts-ignore
                if (mintRes.toString().includes("user rejected transaction") || mintRes.toString().includes("UserDeclinedError")) {
                    contract.removeAllListeners("Transfer")
                    return null
                } else {
                    return await data
                }
            }
        };

export const updateInfo = (drawl: any) =>
    async (dispatch: (arg0: { type: string; data: boolean }) => void) => {
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
            const data = new Promise((resolve) => {
                contract.on("NFTUpdated", async (from, tokenId) => {
                    if (from.toLowerCase() === address.toLowerCase() && parseInt(tokenId, 16) === parseInt(drawl.tokenId, 16)) {
                        contract.removeAllListeners("NFTUpdated")
                        resolve(true)
                    }
                });
            })

            const mint = new Promise(async (resolve) => {
                const res = contract.updateInfo(parseInt(drawl.tokenId, 16), {
                    gasLimit: 1100000,
                    value: Number(process.env.REACT_APP_UPDATE_INFO_PRICE) * 10 ** 18
                })
                    .then((res: any) => {
                        resolve(res)
                    })
                    .catch((err: any) => {
                        resolve(err)
                    })

                return res;
            })

            const mintRes = await mint;

            // @ts-ignore
            if (mintRes.toString().includes("user rejected transaction") || mintRes.toString().includes("UserDeclinedError")) {
                contract.removeAllListeners("Transfer")
                return null
            } else {
                return await data
            }
        }
    }

export const updateImage = (drawlData: any) =>
    async (dispatch: (arg0: { type: string; data: boolean }) => void) => {
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
            const data = new Promise((resolve) => {
                contract.on("NFTUpdated", async (from, tokenId) => {

                    if (from.toLowerCase() === address.toLowerCase() && parseInt(tokenId, 16) === parseInt(drawlData.tokenId, 16)) {
                        contract.removeAllListeners("NFTUpdated")
                        resolve(true)
                    }
                });
            })

            const mint = new Promise(async (resolve) => {
                const res = contract.updateImage(parseInt(drawlData.tokenId, 16), {
                    gasLimit: 1100000,
                    value: Number(process.env.REACT_APP_UPDATE_IMAGE_PRICE) * (10 ** 18)
                })
                    .then((res: any) => {
                        resolve(res)
                    })
                    .catch((err: any) => {
                        resolve(err)
                    })

                return res;
            })

            const mintRes = await mint;

            // @ts-ignore
            if (mintRes.toString().includes("user rejected transaction") || mintRes.toString().includes("UserDeclinedError")) {
                contract.removeAllListeners("Transfer")
                return null
            } else {
                return await data
            }
        }
    }


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