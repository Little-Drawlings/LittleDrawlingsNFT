import React, {useContext, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import styles from './studio.module.scss'
import useHandleNft from "../../hooks/useHandleNFT";
import {Context} from "../../store";
import {Link, useNavigate} from "react-router-dom";
import {pathList} from "../../routes/path";
import ProvenanceModal from "../../common/modals/ProvenanceModal";
import LoadNFTModal from "../../common/modals/LoadNFTModal";
import {localStorageGet} from "../../utils/localStorage";

const Studio = () => {
    const [{user}, ACTION] = useContext(Context);
    const [galleryData, setGalleryData] = useState(null)
    const [isProvenanceOpen, setIsProvenanceOpen] = useState(false)
    const [isLoadNFTModalOpen, setIsLoadNFTModalOpen] = useState(false)
    const navigate = useNavigate()

    const handleNft = useHandleNft({})

    useEffect(() => {
        const init = async () => {
            if (user) setGalleryData(await handleNft.getAll())
        }

        init()
    }, [user])

    const openLoadNFTModal = () => setIsLoadNFTModalOpen(true)
    const closeLoadNFTModal = () => setIsLoadNFTModalOpen(false)

    const goToCanvas = (item) => {
        ACTION.SET_CURRENT_DRAWL(item)
        navigate(pathList.canvas.path)
    }

    const openProvenance = (item) => {
        ACTION.SET_CURRENT_DRAWL(item)
        setIsProvenanceOpen(true)
    }

    const onTokenLoaded = async () => {
        setGalleryData(await handleNft.getAll())
        closeLoadNFTModal()
    }

    useEffect(() => {
        const token = localStorageGet("token", null)
        if (!token) navigate("/")
    }, [user])


    return (
        <div className={styles.studio}>
            <div className={styles.container}>
                <div className={styles.studio_buttons}>
                    <div className={styles.studio_load_btn}
                         onClick={openLoadNFTModal}
                    >Load NFT</div>
                    <Link
                        to={pathList.canvas.path}
                        className={styles.studio_mint_btn}
                        onClick={() => ACTION.SET_CURRENT_DRAWL(null)}
                    >Mint New</Link>
                </div>

                <div className={styles.studio_grid}>
                    {
                        galleryData && galleryData?.map((item, idx) => {
                            return (
                                <div className={styles.studio_grid_item} key={idx}>
                                    <div className={styles.studio_grid_item_image}>
                                        <img src={item?.image} alt=""/>
                                    </div>
                                    <div className={styles.studio_grid_item_info}>
                                        <div className={styles.studio_grid_item_info_row}>
                                            <span>Drawl #{parseInt(item.tokenId, 16)}</span>
                                            <span>16:9</span>
                                        </div>
                                        <div className={styles.studio_grid_item_info_row}>
                                            <span>Edited {dayjs(item.updatedAt).format('MM-DD HH:mm')}</span>
                                            <span>0 min</span>
                                        </div>
                                    </div>
                                    <div className={styles.studio_grid_item_buttons}>
                                        <div className={styles.studio_grid_item_buttons_paint}
                                            onClick={() => goToCanvas(item)}
                                        >Paint</div>
                                        <div className={styles.studio_grid_item_buttons_provenance}
                                             onClick={() => openProvenance(item)}
                                        >Provenance</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <ProvenanceModal
                onRequestClose={() => setIsProvenanceOpen(false)}
                isOpen={isProvenanceOpen}
                callback={handleNft.getAll}
            />
            <LoadNFTModal
                onRequestClose={closeLoadNFTModal}
                isOpen={isLoadNFTModalOpen}
                callback={onTokenLoaded}
            />
        </div>
    );
};

export default Studio;