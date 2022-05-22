import { ethers } from "ethers";

import API, { setToken } from '../../api';

const getNonce = async (account: string) => {
    return API.get(`user/nonce/${account}`).then((res) => {
        return res?.data?.status ? res?.data?.data : null;
    }).catch(() => null)
}

export const signOut = () => {
    return API.post("auth/logout").then(() => {
        setToken('')
    }).catch((error) => {
        throw error;
    })
}

export const signInMetamask = async () => {
        const w: any = window;
        const provider = new ethers.providers.Web3Provider(w.ethereum);
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
        const data = { account, signature, provider };

        return API.post('/auth/login-metamask', data)
            .then(async (response) => {
                if (response?.status) {
                    setToken(response.data.token)
                }
            })
            .catch((error) => {
                throw error;
            })
    };
