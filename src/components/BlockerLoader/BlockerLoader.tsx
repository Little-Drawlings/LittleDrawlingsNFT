import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Rings } from 'react-loader-spinner';

import { RootState } from "../../redux/reducers";

import styles from './BlockerLoader.module.scss';


const BlockerLoader: React.FC = () => {
    const loadingMint = useSelector((state: RootState) => state.mintReducer?.loading);
    const [loading, setLoading] = useState<boolean>(loadingMint)

    useEffect(() => {
        setLoading(loadingMint)
    }, [loadingMint])

    return (
        <>
            {loading && (
                <div className='overlay'>
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
}

export default BlockerLoader;