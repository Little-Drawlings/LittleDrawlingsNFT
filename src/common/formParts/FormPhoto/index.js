import React from 'react';
import styles from "./styles.module.scss";
import watermarkIcon from "../../../assets/img/watermark.svg";

const FormPhoto = ({uploadedImage, item, imagePreview, isSwitcherOn, onSwitcherChange}) => {


    return (
        <div className={styles.upload_modal_content}>
            <div className={styles.upload_modal_content_watermark}>
                <div className={styles.upload_modal_content_watermark_icon}>
                    <img src={watermarkIcon} alt=""/>
                </div>
                <div className={`${styles.upload_modal_content_watermark_switcher} ${!!+isSwitcherOn ? styles.active : ""}`}
                     onClick={() => onSwitcherChange(!+isSwitcherOn)}
                />
            </div>
            <div className={`${styles.upload_modal_content_image} ${uploadedImage || item?.link ? styles.filled : ""}`}>
                {imagePreview && <img src={imagePreview} className={styles.upload_modal_content_image_img} alt=""/>}
                {item?.link && !imagePreview && <img src={item.link} className={styles.upload_modal_content_image_img} alt=""/>}
                {(imagePreview || item?.link) && !!+isSwitcherOn && <img src={watermarkIcon} className={styles.upload_modal_content_image_watermark} alt=""/>}
            </div>
            <div className={styles.upload_modal_content_empty}/>
        </div>
    );
};

export default FormPhoto;