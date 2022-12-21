import React from 'react';
import styles from './mainIntro.module.scss'
import girlImg from './img/girl.svg'
import {localStorageGet} from "../../../utils/localStorage";
import useAuthRLogin from "../../../hooks/auth/useAuthWallet";
import {Link, useNavigate} from "react-router-dom";
import {pathList} from "../../../routes/path";

const MainIntro = () => {
    const authRLogin1 = useAuthRLogin()
    const navigate = useNavigate()

    const checkLogin = async (event, page) => {
        const token = localStorageGet("token", null)
        if (!token) {
            event.preventDefault()
            await authRLogin1.login()
            navigate(page)
        }
    }

    return (
        <>
            <div className={styles.main_intro}>
                <div className={styles.main_intro_title}>Introducing</div>
                <div className={styles.main_intro_row}>
                    <div className={styles.main_intro_info}>
                        <div className={styles.main_intro_info_subtitle}>our MVP Alpha mint  </div>
                        <div className={styles.main_intro_info_text}>
                            <p>Patrons are invited to paint and mint an MVP Canvas NFT, touch-up their masterpieces in the artboard, collaborate with friends, and share with the community. The Little Drawlings team appreciates your support as we develop fun studio games to accompany the Little Drawlings character NFT mint.</p>
                            <p>All MVP donations accepted in <b>RBTC (rootstock bitcoin.)</b></p>
                            <p>Thank you for your patronage; see you in the studio!</p>
                        </div>
                        <div className={styles.main_intro_info_buttons}>
                            <Link
                                onClick={(event) => checkLogin(event, pathList.canvas.path)}
                                to={pathList.canvas.path}
                                className={styles.main_intro_info_buttons_mint}
                            >Paint + Mint</Link>
                            <a href="https://littledrawlings.gitbook.io/" target="_blank" className={styles.main_intro_info_buttons_more}>Learn More</a>
                        </div>
                    </div>
                    <div className={styles.main_intro_image}>
                        <img src={girlImg} alt=""/>
                    </div>
                </div>
            </div>
            <div className={styles.donation}>
                <div className={styles.donation_title}>Donation Schedule</div>
                <div className={styles.donation_content}>
                    <div className={styles.donation_content_row}>
                        <div className={styles.donation_content_item}>
                            <div className={styles.donation_content_item_value}><span>ṡ</span>21k</div>
                            <div className={styles.donation_content_item_text}>canvas mint</div>
                        </div>
                        <div className={styles.donation_content_item}>
                            <div className={styles.donation_content_item_value}><span>ṡ</span>625</div>
                            <div className={styles.donation_content_item_text}>to paint</div>
                        </div>
                        <div className={styles.donation_content_item}>
                            <div className={styles.donation_content_item_value}><span>ṡ</span>2500</div>
                            <div className={styles.donation_content_item_text}>record provenance</div>
                        </div>
                    </div>
                    <div className={styles.donation_info}>ṡ1 = ₿0.00000001</div>
                </div>
            </div>
        </>
    );
};

export default MainIntro;