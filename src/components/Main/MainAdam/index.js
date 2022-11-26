import React from 'react';
import styles from './mainAdam.module.scss'
import securityIcon from './img/security.svg'
import ipfsIcon from './img/ipfs.svg'
import storageIcon from './img/storage.svg'

const MainAdam = () => {
    return (
        <div className={styles.main_adam}>
            <div className={styles.main_adam_info}>
                <div className={styles.main_adam_info_item}>
                    <div className={styles.main_adam_info_item_inner}>
                        <div className={styles.main_adam_info_item_icon}>
                            <img src={securityIcon} alt=""/>
                        </div>
                        <div className={styles.main_adam_info_item_content}>
                            <div className={styles.main_adam_info_item_content_title}>Contract Security <br/>with RootStock</div>
                            <div className={styles.main_adam_info_item_content_text}>Merge-mined with the Bitcoin network, the Rootstock sidechain provides sophisticated built-in scaling solution while maintaining a degree of network decentralization unmatched by any other smart contract platform.</div>
                        </div>
                    </div>
                </div>
                <div className={styles.main_adam_info_item}>
                    <div className={styles.main_adam_info_item_inner}>
                        <div className={styles.main_adam_info_item_icon}>
                            <img src={ipfsIcon} alt=""/>
                        </div>
                        <div className={styles.main_adam_info_item_content}>
                            <div className={styles.main_adam_info_item_content_title}>Mutable metadata <br/>secured with IPFS</div>
                            <div className={styles.main_adam_info_item_content_text}>IPFS builds on the principles of peer-to-peer networking ang content-based addressing to create a decentralized, distributed, and trustless data storage and delivery network. Our mutable NFTs use IPNS, a content naming protocol whitin IPFS.</div>
                        </div>
                    </div>
                </div>
                <div className={styles.main_adam_info_item}>
                    <div className={styles.main_adam_info_item_inner}>
                        <div className={styles.main_adam_info_item_icon}>
                            <img src={storageIcon} alt=""/>
                        </div>
                        <div className={styles.main_adam_info_item_content}>
                            <div className={styles.main_adam_info_item_content_title}>Web3.Storage + Filecoin <br/>Decentralized file sharing</div>
                            <div className={styles.main_adam_info_item_content_text}>Web3.storage is a service by Protocol Labs that allows scalable IPFS uploads and ensures data redundancy of user content with Filecoin. W3name allows users to update their IPNS records for painting and provenance records.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main_adam_qoute}>
                <div className={styles.main_adam_qoute_text}>“In spite of everything, I shall rise again; I will take up my pencil, which I have forsaken in my great discouragement, and I will go on with my drawing.”</div>
                <div className={styles.main_adam_qoute_author}>Vincent Van Gogh</div>
            </div>
        </div>
    );
};

export default MainAdam;