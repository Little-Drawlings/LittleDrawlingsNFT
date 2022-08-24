import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import icons from '../../../constants/icons';
import NavLink from '../../NavLink';

import styles from './MintFooter.module.scss';
import { useNavigate } from 'react-router-dom';

const MintFooter: React.FC = () => {
    const navigate = useNavigate();
    const [ref, view] = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });

    const variants = {
        visible: { top: '-82%' },
        hidden: { top: '-90%' },
    };

    return (
        <footer
            className={cn('mint-wrapper', 'mint-height_auto', styles.mint_footer)}>
            <motion.img
                className={styles.parallax_bg}
                src={icons.ParallaxPlan2}
                alt='Parallax2'
                animate={view ? 'visible' : 'hidden'}
                transition={{ duration: 2, ease: 'easeOut' }}
                variants={variants}
            />
            <motion.div ref={ref} className={styles.footer_content}>
                <img
                    className={styles.footer_bg}
                    src={icons.ParallaxPlan1}
                    alt='Parallax1'
                />
                <div className={styles.footer_text}>
                    <div className={styles.footer_nav_wrap}>
                        <img
                            className={styles.footer_logo}
                            src={icons.Logo}
                            alt='FooterLogo'
                        />
                        <ul className={styles.footer_nav}>
                            <li className={styles.nav_list_item}>
                                <NavLink className='footer_nav' to='/studio/canvas'>Mint</NavLink>
                            </li>
                            <li className={styles.nav_list_item}>
                                <a className={styles.nav_list_item_link} href='https://littledrawlings.gitbook.io' target='_blank' rel='noreferrer'>Whitepaper</a>
                            </li>
                            <li className={styles.nav_list_item}>
                                <button className={cn(styles.nav_list_item_link, styles.button)} onClick={() => navigate('/terms')}>Term and Conditions</button>
                            </li>
                            <li className={styles.nav_list_item}>
                                <button className={cn(styles.nav_list_item_link, styles.button)} onClick={() => navigate('/privacy')}>Privacy Policy</button>
                            </li>
                            <li className={styles.nav_list_item}>
                                <button className={cn(styles.nav_list_item_link, styles.button)} onClick={() => navigate('/disclaimer')}>Disclaimer</button>
                            </li>
                            <li className={styles.nav_list_item}>
                                <button className={cn(styles.nav_list_item_link, styles.button)} onClick={() => navigate('/cookies')}>Cookies Policy</button>
                            </li>
                        </ul>
                    </div>
                    <p className={styles.footer_copyright}>Copyright © ${dayjs().year()} Little Drawlings. All rights reserved</p>
                </div>
            </motion.div>
        </footer>
    );
};

export default MintFooter;
