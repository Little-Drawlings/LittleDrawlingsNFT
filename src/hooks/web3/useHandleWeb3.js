import React, {useContext} from 'react';
import Web3 from "web3";
import {ethers} from "ethers";
import ItemApi from "../../utils/api/ItemApi";
import {Context} from "../../store";

const PRICE = process.env.REACT_APP_PRICE;

const useHandleWeb3 = () => {
    const [{user, contractData}] = useContext(Context);

    const loadWeb3 = async (accountsChangedCallback) => {
        if (window?.ethereum) {
            // window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: `eth_requestAccounts` });

            window.ethereum.on("accountsChanged", () => accountsChangedCallback());
            window.ethereum.on("chainChanged", () => accountsChangedCallback());

            if (user){
                const provider = new ethers.providers.Web3Provider(window?.ethereum, "any");
                const acc = await provider.send("eth_requestAccounts", []);

                if (acc[0]?.toLowerCase() !== user?.publicAddress?.toLowerCase()) accountsChangedCallback();
            }


        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            console.warn("Non ethereum!");
        }
    };

    const getNetwork = async () => {
        const provider = new ethers.providers.Web3Provider(window?.ethereum, "any");
        const network = await provider.getNetwork();
        return network?.chainId;
    };

    const getContract = async () => {
        return new ItemApi()
            .getContract()
            .then(res => res?.status ? res?.data : null);
    }

    const getContractByProvider = async (data) => {
        return new ItemApi()
            .getContractByProvider(data)
            .then(res => res?.status ? res?.data : null);
    }

    const getProviderData = async () => {
        const provider = new ethers.providers.Web3Provider(window?.ethereum, "any");

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const nonce = await signer.getTransactionCount();

        return {signer, address, nonce}
    }

    const mintNFT = async (createdItem) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (!contractData) {
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
            const mint = await contract.mintNFT(address?.toLowerCase(), `https://${createdItem.ipnsLink}.ipns.cf-ipfs.com`, {
                    gasLimit: 1100000,
                    value: Number(PRICE) * 10 ** 18
                })
                const receipt = await mint.wait()

                if (!!receipt.status) {
                    const dataToDecode = receipt.logs.find(log => {
                        return log.data.toLowerCase().includes(address?.toLowerCase()?.slice(2, -1))
                    })

                    if (!dataToDecode) return null
                    const decodeData = await ethers.utils.defaultAbiCoder.decode(["address", "uint256"], dataToDecode.data);

                    return decodeData[1];
                }
            } catch (e) {
                console.error("Minting error: ", e)
                return null
            }
        }
        return null
    }

    const updateNFTInfo = async (drawl) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (!contractData) {
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
                const mint = await contract.updateInfo(parseInt(drawl.tokenId, 16), {
                    gasLimit: 1100000,
                    value: Number(process.env.REACT_APP_UPDATE_INFO_PRICE) * 10 ** 18
                })
                const receipt = await mint.wait()

                if (!!receipt?.status) return true
                return null
            } catch (e) {
                console.error("Provenance error: ", e)
                return null
            }
        }
        return null
    }

    const updateNFTPhoto = async (drawlData) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (!contractData) {
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
                const mint = await contract.updateImage(parseInt(drawlData.tokenId, 16), {
                    gasLimit: 1100000,
                    value: Number(process.env.REACT_APP_UPDATE_IMAGE_PRICE) * (10 ** 18)
                })
                const receipt = await mint.wait()

                if (!!receipt?.status) return true
                return null
            } catch (e){
                console.error("Image error: ", e)
                return null
            }

        }
        return null
    }

    return {
        getNetwork,
        loadWeb3,
        mintNFT,
        updateNFTInfo,
        updateNFTPhoto,
        getProviderData,
        getContract,
        getContractByProvider,
    }
};

export default useHandleWeb3;