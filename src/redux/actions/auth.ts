import { ethers } from "ethers";

import API, { deleteToken, setToken } from '../../api';
import types from "../reducers/auth/types";
import { MetaMaskData } from "../types/store";
import { setLoading } from "./mint";

const getNonce = async (account: string) => {
    return API.get(`user/nonce/${account}`).then((res) => {
        return res?.data?.status ? res?.data?.data : null;
    }).catch(() => null)
}

export const signOut = () => {
    return API.post("auth/logout").then(() => {
        deleteToken()
    }).catch((error) => {
        throw error;
    })
}

export const signInMetamask = () => async (dispatch: (arg0: { type: string; data: MetaMaskData | boolean }) => void) => {
    const w: any = window;

    const provider = new ethers.providers.Web3Provider(w.ethereum);
    const { chainId } = await provider.getNetwork()
    if (chainId !== 31) {
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

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const coinbase = await signer.getAddress();
    const account = coinbase.toLowerCase();
    const nonce = await getNonce(account);
    const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`)

    if (!signature) {
        signOut();
        return null;
    }
    const data = { account, signature, chainId };
    dispatch(setLoading(true));
    return API.post('/auth/login-metamask', data)
        .then(async (response) => {
            if (response?.status) {
                setToken(response.data?.data.token);
                dispatch({
                    type: types.SIGN_IN_METAMASK,
                    data: response.data?.data
                })
            }
        })
        .catch((error) => {
            throw error;
        }).finally(() => dispatch(setLoading(false)))
};
