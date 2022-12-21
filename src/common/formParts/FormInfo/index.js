import React from 'react';
import styles from './styles.module.scss'
import watermarkIcon from "../../../assets/img/watermark.svg";

const FormInfo = ({isUpdate = false, formData, onLinksChange, onInfoChange}) => {

    return (
        <div className={`${styles.form_info} ${isUpdate ? styles.replace : ""}`}>
            <div className={styles.form_info_main_data}>
                <div className={`${styles.form_info_item} ${isUpdate ? styles.replace : ""}`}>
                    <span>
                        {
                            isUpdate && <img src={watermarkIcon} className={styles.form_info_item_watermark} alt=""/>
                        }
                        Profile Name:
                    </span>
                    <input type="text" name="profileName" value={formData.profileName} onChange={event => onInfoChange(event)}/>
                </div>
                <div className={`${styles.form_info_item} ${styles.form_info_item_desc} ${isUpdate ? styles.replace : ""}`}>
                    <span>About Me:</span>
                    <textarea name="aboutMe" value={formData.aboutMe} onChange={event => onInfoChange(event)}/>
                </div>
            </div>
            <div className={`${styles.form_info_item}`}>
                <span>Public Links:</span>
            </div>
            <div className={styles.form_info_public_links}>
                {
                    formData?.links?.map((el, idx) => {
                        return (
                            <div className={styles.form_info_items_group} key={idx}>
                                <div className={`${styles.form_info_item}`}>
                                    <span>platform:</span>
                                    <input
                                        value={el?.trait_type}
                                        onChange={event => onLinksChange(event, idx)}
                                        type="text"
                                        name="trait_type"
                                    />
                                </div>
                                <div className={`${styles.form_info_item}`}>
                                    <span>handle:</span>
                                    <input
                                        value={el?.value}
                                        onChange={event => onLinksChange(event, idx)}
                                        name="value"
                                        type="text"
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default FormInfo;