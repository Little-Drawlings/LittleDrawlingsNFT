import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import icons from '../../constants/icons';
import DefaultButton from '../DefaultButton';
import HeaderLink from '../HeaderLink';

import { RootState } from '../../redux/reducers';
import { getBalance, setNightModeMint } from '../../redux/actions/mint';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';

import styles from './Header.module.scss';
import { signInMetamask } from '../../redux/actions/auth';

const Header: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [nightMode, setNightMode] = useState<boolean>(false);
	const [animateImage, setAnimateImage] = useState<boolean>(false);
	const [balance, setBalance] = useState<string>('')

	const connect = () => {
		dispatch(signInMetamask()).then(() => {
			dispatch(getBalance())
		})
	};

	const metaMaskData = useSelector(
		(state: RootState) => state?.authReducer.metaMaskData
	);
	const address = metaMaskData?.user?.publicAddress;



	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	useEffect(() => {
		dispatch(getBalance())
	}, [dispatch])

	const balanceMint = useSelector(
		(state: RootState) => state?.mintReducer.balance
	);

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
	

	const canvasPath = window.location.pathname.includes('/studio/');

	return (
		<div className={cn(styles.header)}>
			<Link to={'/'}>
				<img className={styles.logo} src={icons.Logo} alt='logo' />
			</Link>
			<ul className={styles.nav_list}>
				<li className={styles.nav_list_item}>
					<HeaderLink to='/'>Mint</HeaderLink>
				</li>
				<li
					className={cn(
						styles.nav_list_item,
						canvasPath && styles.nav_link_item_canvas
					)}
				>
					<HeaderLink to='/studio'>Studio</HeaderLink>
				</li>
				<li className={styles.nav_list_item}>
					<HeaderLink to='/gallery'>Gallery</HeaderLink>
				</li>
				<li className={styles.nav_list_item}>
					<HeaderLink to='/shop'>Shop</HeaderLink>
				</li>
				<li className={styles.nav_list_item}>
					<HeaderLink to='/whitepaper'>Whitepaper</HeaderLink>
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
			</div>
		</div>
	);
};

export default Header;
