import React, {useContext, useEffect, useState} from 'react';
import styles from './styles.module.scss'
import ItemApi from "../../../../utils/api/ItemApi";
import useHandleWeb3 from "../../../../hooks/web3/useHandleWeb3";
import {Context} from "../../../../store";

const Provenance = ({onRequestClose, callback}) => {

    const [{currentDrawl: activeDrawl}, ACTION] = useContext(Context);

    const handleWeb3 = useHandleWeb3()

    const defaultFormData = {
        title: activeDrawl?.title ?? "",
        artist: activeDrawl?.artist ?? "",
        description: activeDrawl?.description ?? "",
    }

    const [formData, setFormData] = useState(defaultFormData)
    const [tempDesc, setTempDesc] = useState(`${activeDrawl?.title ?? "Untitled"} Canvas by ${activeDrawl?.artist ?? "Anonymous"}`)

    const onFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trimStart()
        })
    }

    useEffect(() => {
        setTempDesc(`${formData?.title?.length ? formData?.title?.trim() : "Untitled"} Canvas by ${formData?.artist?.length ? formData?.artist?.trim() : "Anonymous"}`)
    }, [formData])

    const close = () => {
        onRequestClose();
    };

    const onFormSubmit = async (event) => {
        event.preventDefault()
        ACTION.SET_IS_LOADER(true);
        const data = {
            title: formData.title.trim().length > 0 ? formData.title.trim() : "Untitled",
            artist: formData.artist.trim().length > 0 ? formData.artist.trim() : "Anonymous",
            description: formData.description.trim().length > 0 ? formData.description.trim() : tempDesc,
            drawlId: activeDrawl?._id
        }

        const res = await handleWeb3.updateNFTInfo(activeDrawl)
        if(!res) {
            ACTION.SET_IS_LOADER(false);
            return
        }

        new ItemApi()
            .updateInfo(data)
            .then(() => {
                close()
                ACTION.SET_IS_LOADER(false);
                callback()
            })
    }

    return (
        <div>
            <div className={`popup-content ${styles.provenance_popup}`}>
                <div className={styles.provenance_popup_title}>Provenance</div>
                <div className={styles.provenance_popup_desc}>Our provenance form will update your Canvas’ metadata</div>
                <form className={styles.provenance_popup_form}
                      onSubmit={event => onFormSubmit(event)}
                >
                    <div className={styles.provenance_popup_form_item}>
                        <label htmlFor="">Title</label>
                        <input
                            value={formData?.title}
                            onChange={event => onFormChange(event)}
                            name="title" type="text" placeholder="Untitled"/>
                    </div>
                    <div className={styles.provenance_popup_form_item}>
                        <label htmlFor="">Artist</label>
                        <input
                            value={formData?.artist}
                            onChange={event => onFormChange(event)}
                            name="artist" type="text" placeholder="Anonymous"/>
                    </div>
                    <div className={styles.provenance_popup_form_item}>
                        <label htmlFor="">Description</label>
                        <textarea
                            value={formData?.description}
                            onChange={event => onFormChange(event)}
                            name="description" placeholder={tempDesc}/>
                    </div>
                    <div className={styles.provenance_popup_form_buttons}>
                        <div
                            onClick={close}
                            className={styles.provenance_popup_form_buttons_cancel}
                        >Cancel</div>
                        <button
                             className={styles.provenance_popup_form_buttons_save}
                        >Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Provenance;