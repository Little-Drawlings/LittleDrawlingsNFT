import React, {useEffect, useState} from 'react';
import cn from "classnames";
import styles from './ProvenancePopup.module.scss'
import {setLoading, setOpenProvenancePopup} from "../../../redux/actions/mint";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import DefaultButton from "../../DefaultButton";
import {RootState} from "../../../redux/reducers";
import Api from "../../../api";
import {updateInfo} from "../../../redux/actions/drawl";

const ProvenancePopup = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeDrawl = useSelector((state: RootState) => state?.drawlReducer.activeDrawl);

    const defaultFormData = {
        title: activeDrawl?.title ?? "",
        artist: activeDrawl?.artist ?? "",
        description: activeDrawl?.description ?? "",
    }

    const [formData, setFormData] = useState(defaultFormData)
    const [tempDesc, setTempDesc] = useState(`${activeDrawl?.title ?? "Untitled"} Canvas by ${activeDrawl?.artist ?? "Anonymous"}`)

    const onFormChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trimStart()
        })
    }

    useEffect(() => {
        setTempDesc(`${formData?.title?.length ? formData?.title?.trim() : "Untitled"} Canvas by ${formData?.artist?.length ? formData?.artist?.trim() : "Anonymous"}`)
    }, [formData])

    const close = () => {
        dispatch(setOpenProvenancePopup(false));
    };

    const onFormSubmit = async (event: any) => {
        dispatch(setLoading(true));
        event.preventDefault()
        const data = {
            title: formData.title.trim().length > 0 ? formData.title.trim() : "Untitled",
            artist: formData.artist.trim().length > 0 ? formData.artist.trim() : "Anonymous",
            description: formData.description.trim().length > 0 ? formData.description.trim() : tempDesc,
            drawlId: activeDrawl?._id
        }

        dispatch(updateInfo(activeDrawl)).then(async (res: any) => {
            if(!res) dispatch(setLoading(false));

            Api.post("drawl/updateInfo", data)
                .then(res => {
                    close()
                    dispatch(setLoading(false));
                })
        })
    }

    return (
        <div className={cn('overlay')}>
            <div className={cn('popup-content', styles.provenance_popup)}>
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
                        <DefaultButton title={"Cancel"} onClick={close}
                            className={"no_wide_secondary_small provenance_form"}
                        />
                        <DefaultButton title={"Save"} onClick={() => {}}
                            className={"no_wide_primary_small provenance_form"}
                                       bType={"submit"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProvenancePopup;