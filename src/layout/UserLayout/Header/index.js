import React, {useContext, useEffect, useState} from 'react';
import styles from './header.module.scss'
import {Link, NavLink} from "react-router-dom";
import {pathList} from "../../../routes/path";
import {Context} from "../../../store";
import useAuthRLogin from "../../../hooks/auth/useAuthWallet";
import useCommon from "../../../hooks/useCommon";
import useAuth from "../../../hooks/auth/useAuth";

import logo from '../../../assets/img/logo_header.svg'
import logoAlpha from '../../../assets/img/logo_alpha.svg'
import rskLogo from '../../../assets/img/rsk_logo.svg'

const Header = () => {
    const [{user}, ACTION] = useContext(Context);
    const [userBalance, setUserBalance] = useState(null)

    const authRLogin = useAuthRLogin()
    const {customAddress, getBalance} = useCommon()
    const auth = useAuth()

    useEffect(() => {
        if (user) {
            getBalance()
                .then(res => setUserBalance(res))
        }
    }, [user])

    const clearCurrentDrawl = () => ACTION.SET_CURRENT_DRAWL(null)

    return (
        <div className={styles.header}>
            <Link to={"/"} className={styles.header_logo}>
                <img src={logo} alt=""/>
                <img src={logoAlpha} className={styles.header_logo_alpha} alt=""/>
            </Link>
            <nav className={styles.header_nav}>
                <NavLink
                    onClick={clearCurrentDrawl}
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }
                    to={pathList.canvas.path}>Mint</NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }
                    to={pathList.studio.path}>Studio</NavLink>
                <a href={"https://littledrawlings.gitbook.io/little-drawlings/"} target="_blank">Whitepaper</a>
            </nav>
            <div className={styles.header_user}>
                {
                    user?.publicAddress && userBalance ?
                        <>
                        { <div className={styles.header_user_balance}>{userBalance} RBTC</div>}
                            <div className={styles.header_user_account}
                                 onClick={auth.logout}
                            >
                                <img src={rskLogo} alt=""/>
                                {customAddress(user?.publicAddress)} <span>RBTC</span>
                            </div>
                            
                        </>
                        : <div className={styles.header_user_login_btn}
                             onClick={authRLogin.login}
                        >Connect to wallet</div>
                }
            </div>
            
        </div>
    );
};

export default Header;