import React, {useContext} from 'react';
import Web3 from "web3";
import {ethers} from "ethers";
import ItemApi from "../../utils/api/ItemApi";
import {Context} from "../../store";

const PRICE = process.env.REACT_APP_PRICE;

const useHandleWeb3 = () => {
    const [{user}] = useContext(Context);

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
        const contractData = await getContract();

        if (!contractData) {
            // dispatch(setLoading(false));
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

                    const dataToDecode = receipt.logs.find(log => {
                        return log.data.toLowerCase().includes(address?.toLowerCase()?.slice(2, -1))
                    })

                    if (!dataToDecode) resolve(null)
                    const decodeData = await ethers.utils.defaultAbiCoder.decode(["address", "uint256"], dataToDecode.data);

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
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((err) => {
                        resolve(err)
                    })

                return res;
            })

            const mintRes = await mint;

            if (mintRes.toString().includes("user rejected transaction") || mintRes.toString().includes("UserDeclinedError")) {
                contract.removeAllListeners("Transfer")
                return null
            } else {
                return await data
            }
        }

    }

    const updateNFTInfo = async (drawl) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractData = await getContract();

        if (!contractData) {
            // dispatch(setLoading(false));
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
                    if (from.toLowerCase() === address.toLowerCase() && parseInt(tokenId?._hex, 16) === parseInt(drawl.tokenId, 16)) {
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
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((err) => {
                        resolve(err)
                    })

                return res;
            })

            const mintRes = await mint;

            if (mintRes.toString().includes("user rejected transaction") || mintRes.toString().includes("UserDeclinedError")) {
                contract.removeAllListeners("NFTUpdated")
                return null
            } else {
                return await data
            }
        }
    }

    const updateNFTPhoto = async (drawlData) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractData = await getContract();

        if (!contractData) {
            // dispatch(setLoading(false));
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

                    if (from.toLowerCase() === address.toLowerCase() && parseInt(tokenId._hex, 16) === parseInt(drawlData.tokenId, 16)) {
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
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((err) => {
                        resolve(err)
                    })

                return res;
            })

            const mintRes = await mint;

            if (mintRes.toString().includes("user rejected transaction") || mintRes.toString().includes("UserDeclinedError")) {
                contract.removeAllListeners("Transfer")
                return null
            } else {
                return await data
            }
        }
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