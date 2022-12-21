import React from 'react';
import styles from "./footer.module.scss"
import logo from '../../../assets/img/logo_footer.svg'
import discordLogo from '../../../assets/img/discord.svg'
import twitterLogo from '../../../assets/img/twitter.svg'
import {Link} from "react-router-dom";
import {pathList} from "../../../routes/path";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.footer_content_row}>
                    <img className={styles.footer_content_logo} src={logo} alt=""/>
                    <ul className={styles.footer_content_legal}>
                        <li>
                            <Link to={pathList.terms.path}>Term and Conditions</Link>
                        </li>
                        <li>
                            <Link to={pathList.cookies.path}>Cookies Policy</Link>
                        </li>
                        <li>
                            <Link to={pathList.privacy.path}>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to={pathList.disclaimer.path}>Disclaimer</Link>
                        </li>
                    </ul>
                    <a href="https://discord.gg/SeUVMkuFDS" target="_blank" className={styles.footer_content_social}>
                        <img src={discordLogo} alt=""/>
                    </a>
                    <a href="https://twitter.com/littledrawlings" target="_blank" className={styles.footer_content_social}>
                        <img src={twitterLogo} alt=""/>
                    </a>
                </div>
                <div className={styles.footer_content_copy}>Copyright © 2022 Little Drawlings. All rights reserved</div>
            </div>
        </div>
    );
};

export default Footer;