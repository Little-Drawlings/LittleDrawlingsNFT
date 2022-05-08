import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import icons from '../../constants/icons';
import DefaultButton from '../DefaultButton';
import HeaderLink from '../HeaderLink';

import { HEADER_BG } from '../../constants/data';

import styles from './Header.module.scss';
import { RootState } from '../../redux/reducers';
import { setNightModeMint } from '../../redux/actions/mint';

interface Props {
	background?: string;
}

const Header: React.FC<Props> = ({ background }) => {
	const dispatch = useDispatch();
	const [connected, setConnected] = useState<boolean>(false);
	const [nightMode, setNightMode] = useState<boolean>(false);
	const [animateImage, setAnimateImage] = useState<boolean>(false);

	const connect = () => {
		setConnected(!connected);
	};

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	const headerClass = () => {
		return background === HEADER_BG.PINK
			? styles.header_pink
			: styles.header_white;
	};

	const animate = () => {
		dispatch(setNightModeMint(!nightMode));
		setAnimateImage(true);
		setTimeout(() => {
			setAnimateImage(false);
		}, 1000);
	};

	return (
		<div className={cn(styles.header, headerClass())}>
			<img className={styles.logo} src={icons.Logo} alt='logo' />
			<ul className={styles.nav_list}>
				<li className={styles.nav_list_item}>
					<HeaderLink to='/'>Mint</HeaderLink>
				</li>
				<li className={styles.nav_list_item}>
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
				{connected ? (
					<div className={styles.connect}>
						<span className={styles.connect_value}>7.00698 ETH</span>
						<div className={styles.connect_eth}>
							{' '}
							<span className={styles.connect_circle}></span> OxE786...C41c ETH
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
