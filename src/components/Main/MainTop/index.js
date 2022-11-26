import React from 'react';
import styles from './mainTop.module.scss'
import sticker from './img/main_top_sticker.svg'

const MainTop = () => {
    return (
        <div className={styles.main_top}>
            <img src={sticker} alt=""/>
        </div>
    );
};

export default MainTop;