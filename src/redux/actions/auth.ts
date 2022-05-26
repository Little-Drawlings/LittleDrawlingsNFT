import { ethers } from "ethers";

import API, { deleteToken, setToken } from '../../api';
import types from "../reducers/auth/types";
import { MetaMaskData } from "../types/store";

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

export const signInMetamask = () => async (dispatch: (arg0: { type: string; data: MetaMaskData }) => void) => {
        const w: any = window;
        const provider = new ethers.providers.Web3Provider(w.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const coinbase = await signer.getAddress();
        const account = coinbase.toLowerCase();
        const nonce = await getNonce(account);
        const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`)
        const { chainId } = await provider.getNetwork()

        if (!signature) {
            signOut();
            return null;
        }
        const data = { account, signature, chainId};

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
            })
    };
