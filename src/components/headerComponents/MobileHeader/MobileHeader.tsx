import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import cn from "classnames";

import { deleteToken } from "../../../api";
import { signInMetamask } from "../../../redux/actions/auth";
import { getBalance } from "../../../redux/actions/mint";
import { RootState } from "../../../redux/reducers";
import { AppDispatch } from "../../../redux/store";
import DefaultButton from "../../DefaultButton";
import NavLink from "../../NavLink";

import styles from "./MobileHeader.module.scss";

interface Props {
    nightModeProp: boolean;
}

const MobileHeader: React.FC<Props> = ({ nightModeProp }) => {
    const dispatch = useDispatch<AppDispatch>();
    const metaMaskData = useSelector(
        (state: RootState) => state?.authReducer.metaMaskData
    );
    const balanceMint = useSelector(
        (state: RootState) => state?.mintReducer.balance
    );
    const [address, setAddress] = useState<string>("");
    const [balance, setBalance] = useState<string>("");
    const [nightMode, setNightMode] = useState<boolean>(nightModeProp);

    useEffect(() => {
        setBalance(balanceMint);
    }, [balanceMint]);

    useEffect(() => {
        setNightMode(nightModeProp);
    }, [nightModeProp]);

    useEffect(() => {
        if (metaMaskData) {
            setAddress(metaMaskData.user?.publicAddress);
        } else {
            deleteToken();
        }
    }, [metaMaskData]);

    const connect = () => {
        dispatch(signInMetamask()).then(() => {
            dispatch(getBalance());
        });
    };

    return (
        <div
            className={cn(
                styles.mobile_header,
                nightMode && styles.mobile_header_night
            )}
        >
            <ul className={styles.nav_list}>
                <li className={styles.nav_list_item}>
                    <NavLink
                        className={cn("mobile_link", nightMode && "white_link")}
                        to="/"
                    >
                        Mint
                    </NavLink>
                </li>
                <li className={styles.nav_list_item}>
                    <NavLink
                        className={cn("mobile_link", nightMode && "white_link")}
                        to="/studio"
                    >
                        Studio
                    </NavLink>
                </li>
                <li className={styles.nav_list_item}>
                    <a
                        className={styles.nav_list_item_link}
                        href="https://littledrawlings.gitbook.io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Whitepaper
                    </a>
                </li>
            </ul>
            <div className={styles.info_wrap}>
                {metaMaskData?.user ? (
                    <div className={styles.connect}>
                        <span
                            className={cn(
                                styles.connect_value,
                                nightMode && styles.connect_value_night
                            )}
                        >
                            {balance.substring(0, 7)} RBTC
                        </span>
                        <div
                            className={cn(
                                styles.connect_eth,
                                nightMode && styles.connect_eth_night
                            )}
                        >
                            {" "}
                            <span className={styles.connect_circle}></span>{" "}
                            {`${address.substring(0, 5)}...${address.slice(-4)} RBTC`}
                        </div>
                    </div>
                ) : (
                    <DefaultButton
                        className="wide_secondary_small"
                        onClick={connect}
                        title={"Connect to wallet"}
                    />
                )}
                <p
                    className={styles.copyright}
                >{`Copyright ©  ${dayjs().year()} Little Drawlings. All rights reserved`}</p>
            </div>
        </div>
    );
};

export default MobileHeader;
