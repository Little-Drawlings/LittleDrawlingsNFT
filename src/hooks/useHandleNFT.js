import React, {useContext} from 'react';
import ItemApi from "../utils/api/ItemApi";
import useHandleWeb3 from "./web3/useHandleWeb3";
import {ethers} from "ethers";
import {Context} from "../store";

const useHandleNft = ({onRequestClose = () => {}, callback = () => {}, handleLoader = () => {}, handleUploadError = () => {}}) => {
    const [{user, contractData}, ACTION] = useContext(Context);
    const handleWeb3 = useHandleWeb3();

    const exit = () => {
        onRequestClose()
        handleLoader(false);
        setTimeout(callback(), 1000)
    }

    const getAll = () => {
        ACTION.SET_IS_LOADER(true);
        return new ItemApi()
            .getAll()
            .then(async (res) => {
                if (res?.status) {
                    return await checkNFTsOwner(res?.data)
                        .then(res => res)
                        .catch(() => res?.data)
                        .finally(() => ACTION.SET_IS_LOADER(false))
                }
            })
    }

    const mintNFT = async (formData) => {
        handleLoader(true);

        let attempt = 0;

        const createRecursion = async () => {
            return await new ItemApi()
                .create(formData)
                .then(async (res) => {
                    if (res?.status) return res?.data

                    if (attempt < 2) {
                        attempt++;
                        return await createRecursion()
                    } else {
                        return null
                    }
                })
                .catch(() => null)
        }

        const createdItem = await createRecursion()

        if (!createdItem) {
            exit()
            return null;
        }

        const data = await handleWeb3.mintNFT(createdItem);

        if (!data) {
            console.error("NFT hasn't been created");
            return await deleteNFT(createdItem);
        }

        const tnxRes = await data

        if (!tnxRes) {
            console.error("NFT hasn't been created - empty transaction hash");
            return await deleteNFT(createdItem);
        }

        new ItemApi()
            .confirm({...createdItem, tokenId: tnxRes?._hex})
            .finally(() => {
                handleLoader(false);
                exit();
            })
    }

    const updateNFTInfo = async (formData, selectedToken) => {
        handleLoader(true);

        const approveData = await handleWeb3.approve(selectedToken, "info");
        if (!approveData) {
            console.error("Info hasn't been updated -  not approved");
            exit();
            return null;
        }

        await new ItemApi()
            .updateInfo(formData)
            .catch(() => exit())

        const data = await handleWeb3.updateNFTInfo(selectedToken);
        if (!data) exit();

        let attempt = 0;

        const confirmRecursion = async () => {
            await new ItemApi()
                .updateInfoConfirm(formData)
                .then(async (res) => {
                    if (!res.status) {
                        if (attempt < 2) {
                            attempt++;
                            await confirmRecursion()
                        }
                    }
                })
                .catch(() => exit())
        }

        await confirmRecursion()

        exit();
    }

    const updateNFTPhoto = async (formData, drawlData) => {
        const data = await handleWeb3.updateNFTPhoto(drawlData);
        if (!data) {
            exit();
            return;
        }

        let attempt = 0;

        const confirmRecursion = async () => {
            await new ItemApi()
                .updatePhoto(formData)
                .then(async (res) => {
                    if (!res.status) {
                         if (attempt < 2) {
                             attempt++;
                             await confirmRecursion()
                         }
                    }
                })
        }

        await confirmRecursion()
        exit();
    }

    const deleteNFT = async (item) => {
        return new ItemApi()
            .delete(item)
            .then(() => {
                exit()
            })
    }

    const loadNFT = async (tokenId) => {
        if (isNaN(tokenId)) {
            handleUploadError();
            return
        }
        ACTION.SET_IS_LOADER(true);

        const {signer, address} = await handleWeb3.getProviderData();

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);

        try {
            const ownerOf = await contract.ownerOf(tokenId);

            if (ownerOf === address) {
                new ItemApi()
                    .loadItem({tokenId: ethers.utils.hexlify(tokenId), newOwner: ownerOf})
                    .then(res => {
                        res?.status ? callback() : onRequestClose()
                    })
            } else {
                handleUploadError()
            }
        } catch (e) {
            handleUploadError()
        }
    }

    const checkNFTsOwner = async (tokens) => {
        const {signer} = await handleWeb3.getProviderData();

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);

        const asyncFilter = async (arr, predicate) => {
            const results = await Promise.all(arr.map(predicate));
            return arr.filter((_v, index) => results[index]);
        }

        return await asyncFilter(tokens, async (tkn) => {
            const ownerOf = await contract.ownerOf(tkn?.tokenId);

            if (ownerOf?.toLowerCase() === user?.publicAddress?.toLowerCase()) {
                return true
            } else {
                changeNFTsOwner(tkn, ownerOf)
                return false
            }
        });
    }

    const changeNFTsOwner = (item, newOwner) => {
        new ItemApi().changeOwner({item, newOwner})
    }

    return {mintNFT, updateNFTInfo, updateNFTPhoto, checkNFTsOwner, getAll, loadNFT};
};

export default useHandleNft;