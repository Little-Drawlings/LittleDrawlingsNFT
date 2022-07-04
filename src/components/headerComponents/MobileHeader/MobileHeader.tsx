import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';

import { deleteToken } from "../../../api";
import { signInMetamask } from "../../../redux/actions/auth";
import { getBalance } from "../../../redux/actions/mint";
import { RootState } from "../../../redux/reducers";
import { AppDispatch } from "../../../redux/store";
import DefaultButton from "../../DefaultButton";
import HeaderLink from "../HeaderLink";

import styles from './MobileHeader.module.scss';

const MobileHeader: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const metaMaskData = useSelector(
        (state: RootState) => state?.authReducer.metaMaskData
    );
    const balanceMint = useSelector(
        (state: RootState) => state?.mintReducer.balance
    );
    const [address, setAddress] = useState<string>('');
    const [balance, setBalance] = useState<string>('');

    useEffect(() => {
        setBalance(balanceMint);
    }, [balanceMint]);

    useEffect(() => {
        if (metaMaskData) {
            setAddress(metaMaskData.user?.publicAddress);
        }
        else {
            deleteToken();
        }
    }, [metaMaskData])

    const connect = () => {
        dispatch(signInMetamask()).then(() => {
            dispatch(getBalance())
        })
    };

    return (
        <div className={styles.mobile_header}>
            <ul className={styles.nav_list}>
                <li className={styles.nav_list_item}>
                    <HeaderLink className='mobile_link' to='/'>Mint</HeaderLink>
                </li>
                <li
                    className={styles.nav_list_item}
                >
                    <HeaderLink className='mobile_link' to='/studio'>Studio</HeaderLink>
                </li>
                <li className={styles.nav_list_item}>
                    <HeaderLink className='mobile_link' to='/gallery'>Gallery</HeaderLink>
                </li>
                <li className={styles.nav_list_item}>
                    <HeaderLink className='mobile_link' to='/shop'>Shop</HeaderLink>
                </li>
                <li className={styles.nav_list_item}>
                    <HeaderLink className='mobile_link' to='/whitepaper'>Whitepaper</HeaderLink>
                </li>
            </ul>
            <div className={styles.info_wrap}>
                {metaMaskData?.user ? (
                    <div className={styles.connect}>
                        <span className={styles.connect_value}>{balance.substring(0, 7)} ETH</span>
                        <div className={styles.connect_eth}>
                            {' '}
                            <span className={styles.connect_circle}></span> {`${address.substring(0, 5)}...${address.slice(-4)} ETH`}
                        </div>
                    </div>
                ) : (
                    <DefaultButton
                        className='wide_secondary_small'
                        onClick={connect}
                        title={'Connect to wallet'}
                    />
                )}
                <p className={styles.copyright}>{`Copyright ©  ${dayjs().year()} Little Drawlings. All rights reserved`}</p>
            </div>
        </div>
    )
}

export default MobileHeader;