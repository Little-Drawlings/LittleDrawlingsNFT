import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { motion } from 'framer-motion';

import icons from '../../../constants/icons';
import DefaultButton from '../../DefaultButton';
import NavLink from '../../NavLink';

import { RootState } from '../../../redux/reducers';
import { getBalance, setNightModeMint } from '../../../redux/actions/mint';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { deleteToken } from '../../../api';
import MobileHeader from '../MobileHeader';
import CautionPopup from '../../popupsComponents/CautionPopup';
import { signInMetamask } from '../../../redux/actions/auth';

import styles from './Header.module.scss';

const Header: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const canvasPath = window.location.pathname.includes('/studio/');
	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);
	const metaMaskData = useSelector(
		(state: RootState) => state?.authReducer.metaMaskData
	);
	const balanceMint = useSelector(
		(state: RootState) => state?.mintReducer.balance
	);

	const [nightMode, setNightMode] = useState<boolean>(false);
	const [animateImage, setAnimateImage] = useState<boolean>(false);
	const [balance, setBalance] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [viewPopup, setViewPopup] = useState<boolean>(false);
	const [popupOpened, setPopupOpened] = useState<boolean>(false);

	const variants = {
		open: { opacity: 1, x: 0 },
		closed: { opacity: 0, x: '-100%' },
	};

	useEffect(() => {
		if (metaMaskData) {
			setAddress(metaMaskData.user?.publicAddress);
		} else {
			deleteToken();
		}
	}, [metaMaskData]);

	useEffect(() => {
		dispatch(getBalance());
	}, [dispatch]);

	useEffect(() => {
		setBalance(balanceMint);
	}, [balanceMint]);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	const animate = () => {
		dispatch(setNightModeMint(!nightMode));
		setAnimateImage(true);
		setTimeout(() => {
			setAnimateImage(false);
		}, 1000);
	};

	useEffect(() => {
		const openedPopup = !!localStorage.getItem('@caution-viewed');
		setPopupOpened(openedPopup);
	}, []);

	const connect = () => {
		setViewPopup(true);
		if (popupOpened) {
			dispatch(signInMetamask()).then(() => {
				dispatch(getBalance());
			});
		}
	};

	return (
		<header className={styles.header_wrap}>
			<div className={cn(styles.header, openMenu && styles.open_mobile_header, nightMode && styles.header_night_mode)}>
				<Link to={'/'}>
					<img className={styles.logo} src={icons.Logo} alt='logo' />
				</Link>
				<ul className={styles.nav_list}>
					<li className={styles.nav_list_item}>
						<NavLink to='/'>Mint</NavLink>
					</li>
					<li
						className={cn(
							styles.nav_list_item,
							canvasPath && styles.nav_link_item_canvas
						)}>
						<NavLink to='/studio'>Studio</NavLink>
					</li>
					<li className={styles.nav_list_item}>
						<a className={styles.nav_list_item_link} href='https://littledrawlings.gitbook.io' target='_blank' rel='noreferrer'>Whitepaper</a>
					</li>
				</ul>
				<div className={styles.connect_wrap}>
					<img
						className={cn(
							styles.connect_wrap_image,
							animateImage && nightMode && styles.swipe_down,
							animateImage && !nightMode && styles.swipe_up
						)}
						src={nightMode ? icons.MoonIcon : icons.SunIcon}
						alt='sun-moon'
						onClick={animate}
					/>
					{metaMaskData?.user ? (
						<div className={styles.connect}>
							<span className={styles.connect_value}>
								{balance.substring(0, 7)} RBTC
							</span>
							<div className={styles.connect_eth}>
								{' '}
								<span className={styles.connect_circle}></span>{' '}
								{`${address.substring(0, 5)}...${address.slice(-4)}`}
							</div>
						</div>
					) : (
						<DefaultButton
							className='wide_secondary_small desktop'
							onClick={connect}
							title={'Connect to wallet'}
						/>
					)}
					{!openMenu && (
						<img
							className={styles.burger_icon}
							src={icons.BurgerIcon}
							alt='BurgerIcon'
							onClick={() => setOpenMenu(!openMenu)}
						/>
					)}
					{openMenu && (
						<img
							className={styles.burger_icon}
							src={nightMode ? icons.BurgerArrowNight : icons.BurgerArrow}
							alt='BurgerArrow'
							onClick={() => setOpenMenu(!openMenu)}
						/>
					)}
				</div>
			</div>
			<motion.div animate={openMenu ? 'open' : 'closed'} variants={variants}>
				{openMenu && <MobileHeader nightModeProp={nightMode} />}
			</motion.div>
			{viewPopup && <CautionPopup />}
		</header>
	);
};

export default Header;
