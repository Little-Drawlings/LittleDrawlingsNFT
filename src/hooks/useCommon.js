import React, {useContext} from 'react';
import {Context} from "../store";
import {ethers} from "ethers";

const useCommon = () => {
    const [{user}] = useContext(Context);

    const customAddress = (address) => {
        if (address?.length < 40) return address;
        return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
    };

    const getBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        return await provider.getBalance(user?.publicAddress)
            .then((balance) => {
                const res = ethers.utils.formatEther(balance)
                return res.slice(0, 7)
            })
    }

    return {customAddress, getBalance};
};

export default useCommon;