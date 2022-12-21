import React, {useContext, useEffect} from 'react';
import { Rings } from 'react-loader-spinner';
import styles from './styles.module.scss';
import {Context} from "../../store";

const Loader = () => {
    const [{isLoader}] = useContext(Context);

    return (
        <>
            {isLoader && (
                <div className={`${styles.overlay} overlay`}>
                    <Rings
                        wrapperClass={styles.spinner}
                        height='100'
                        width='100'
                        color='#6B6DB1'
                        ariaLabel='loading'
                    />
                </div>
            )}
        </>
    )
};

export default Loader;