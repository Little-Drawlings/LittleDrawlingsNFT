import React, {useContext, useState} from 'react';
import styles from './styles.module.scss'
import useHandleNFT from "../../../../hooks/useHandleNFT";
import {Context} from "../../../../store";

const LoadNFT = ({callback, onRequestClose}) => {
    const [, ACTION] = useContext(Context);

    const [isError, setIsError] = useState(false)
    const errorHandler = () => {
        setIsError(true)
        setIsLoadDisabled(false)
        ACTION.SET_IS_LOADER(false);
    }

    const handleNFT = useHandleNFT({callback, onRequestClose, handleUploadError: errorHandler})

    const [id, setId] = useState("")
    const [isLoadDisabled, setIsLoadDisabled] = useState(false)

    const onFormSend = async (event) => {
        event.preventDefault()
        setIsLoadDisabled(true)
        setIsError(false)
        await handleNFT.loadNFT(+id)
        setIsLoadDisabled(false)
    }

    return (
        <div className={styles.load_nft}>
            <div className={styles.load_nft_head}>Load NFT</div>
            <form className={styles.load_nft_form}>
                <div className={styles.load_nft_title}>Enter ID:</div>
                <input type="text" className={styles.load_nft_input}
                       onChange={(event) => setId(event.target.value)}
                       value={id}
                />
                {
                    isError && <div className={styles.load_nft_error}>Something went wrong</div>
                }
                <div className={styles.load_nft_buttons}>
                    <button className={`${styles.load_nft_send_btn} ${isLoadDisabled ? styles.disabled : ""}`}
                        onClick={onFormSend}
                    >
                        <span>Load NFT</span>
                    </button>
                    <button type={"button"} className={styles.load_nft_cancel_btn}
                            onClick={onRequestClose}
                    >Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default LoadNFT;