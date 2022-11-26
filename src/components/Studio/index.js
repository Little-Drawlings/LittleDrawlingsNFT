import React, {useContext, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import styles from './studio.module.scss'
import ItemApi from "../../utils/api/ItemApi";
import useHandleNft from "../../hooks/useHandleNFT";
import {Context} from "../../store";
import {Link, useNavigate} from "react-router-dom";
import {pathList} from "../../routes/path";
import ProvenanceModal from "../../common/modals/ProvenanceModal";
import {localStorageGet} from "../../utils/localStorage";

const Studio = () => {
    const [{user}, ACTION] = useContext(Context);
    const [galleryData, setGalleryData] = useState(null)
    const [isProvenanceOpen, setIsProvenanceOpen] = useState(false)
    const navigate = useNavigate()

    const handleNft = useHandleNft({})

    const getAll = () => {
        ACTION.SET_IS_LOADER(true);
        new ItemApi().getAll()
            .then(async (res) => {
                if (res?.status) {
                    const filtered = await handleNft.checkNFTsOwner(res?.data)
                        .then(res => res)
                        .catch(() => res?.data)
                    setGalleryData(filtered)
                }
                ACTION.SET_IS_LOADER(false);
            })
    }

    useEffect(() => {
        if (user) getAll()
    }, [user])

    const goToCanvas = (item) => {
        ACTION.SET_CURRENT_DRAWL(item)
        navigate(pathList.canvas.path)
    }

    const openProvenance = (item) => {
        ACTION.SET_CURRENT_DRAWL(item)
        setIsProvenanceOpen(true)
    }

    useEffect(() => {
        const token = localStorageGet("token", null)
        if (!token) navigate("/")
    }, [user])


    return (
        <div className={styles.studio}>
            <div className={styles.container}>
                <Link
                    to={pathList.canvas.path}
                    className={styles.studio_mint_btn}
                    onClick={() => ACTION.SET_CURRENT_DRAWL(null)}
                >Mint New</Link>

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
                callback={getAll}
            />
        </div>
    );
};

export default Studio;