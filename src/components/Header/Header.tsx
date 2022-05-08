import React, { useState } from 'react';
import cn from 'classnames';

import icons from '../../constants/icons';
import DefaultButton from '../Buttons/DefaultButton';
import HeaderLink from '../HeaderLink';

import { HEADER_BG } from '../../constants/data';

import styles from './Header.module.scss';

interface Props {
	background?: string;
}

const Header: React.FC<Props> = ({ background }) => {
	const [connected, setConnected] = useState(false);

	const connect = () => {
		setConnected(!connected);
	};

	const headerClass = () => {
		return background === HEADER_BG.PINK
			? styles.header_pink
			: styles.header_white;
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
				<img className={styles.connect_wrap_image} src={icons.SunIcon} alt='sun' />
				{connected ? (
					<div className={styles.connect}>
						<span className={styles.connect_value}>7.00698 ETH</span>
						<div className={styles.connect_eth}>
							{' '}
							<span className={styles.connect_circle}></span> OxE786...C41c ETH
						</div>
					</div>
				) : (
					<DefaultButton className='wide_secondary_small' onClick={connect} title={'Connect to wallet'} />
				)}
			</div>
		</div>
	);
};

export default Header;
