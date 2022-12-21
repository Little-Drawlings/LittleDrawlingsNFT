import React, {useContext} from 'react';
import RLogin from "@rsksmart/rlogin";
import useHandleWeb3 from "../web3/useHandleWeb3";
import useHandleUser from "../user/useHandleUser";
import AuthApi from "../../utils/api/AuthApi";
import {localStorageSet} from "../../utils/localStorage";
import {Context} from "../../store";
import {ethers} from "ethers";
import UserApi from "../../utils/api/UserApi";

const useAuthRLogin = () => {
    const [, ACTION] = useContext(Context);

    const w = window;

    const infoOptions = {
        30: { addressBaseURL: 'https://explorer.rsk.co/address/' },
        31: { addressBaseURL: 'https://explorer.testnet.rsk.co/address/' }
    }

    const getNonce = async (account) => {
        return new UserApi()
            .getNonce(account)
                .then((res) => {
                return res?.status ? res?.data : null;
            });
    };

    const login = async () => {

        const rLogin = new RLogin({
            infoOptions
        });

        return rLogin.connect()
            .then(async ({provider}) => {
                const ethersProvider = new ethers.providers.Web3Provider(provider);

                const isMetamask = ethersProvider.connection?.url === 'metamask';
                const { chainId } = await ethersProvider.getNetwork();

                if (chainId !== 31 && chainId !== 30 && isMetamask) {
                    try {
                        await w.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: "0x1f" }],
                        })
                    }
                    catch {
                        await w.ethereum.request({
                            jsonrpc: '2.0',
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: "0x1f",
                                    rpcUrls: ['https://public-node.testnet.rsk.co'],
                                    nativeCurrency: {
                                        name: 'tRBTC',
                                        symbol: 'tRBTC',
                                        decimals: 18
                                    }
                                }
                            ]
                        })
                    }
                }

                await ethersProvider.send("eth_requestAccounts", []);
                const signer = ethersProvider.getSigner();
                const coinbase = await signer.getAddress();
                const account = coinbase.toLowerCase();
                const nonce = await getNonce(account);
                const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`)

                if (!signature) {
                    // signOut();
                    return null;
                }
                const data = { account, signature, chainId };

                // dispatch(setLoading(true));

                return new AuthApi()
                    .loginMetamask(data).then(async (response) => {
                        if (response?.status) {
                            localStorageSet("token", response?.data?.token);
                            ACTION.SET_USER(response?.data?.user)
                        }
                    })
                    .catch((error) => {
                        throw error;
                    })
                    // .finally(() => dispatch(setLoading(false)))
            })


    }

    return {login};
};

export default useAuthRLogin;