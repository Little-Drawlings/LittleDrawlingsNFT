import React from 'react';
import cn from 'classnames';

import icons from '../../constants/icons';
import ConnectButton from '../Buttons/ConnectButton';
import HeaderLink from '../HeaderLink';

import { HEADER_BG } from '../../constants/data';

import styles from './Header.module.scss';

interface Props {
	background?: string;
}

const Header: React.FC<Props> = ({ background }) => {
	const [connected, setConnected] = React.useState(false);

	const connect = () => {
		setConnected(!connected);
	};

	const headerClass = () => {
		return background === HEADER_BG.BLUE
			? styles.header_blue
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
			{connected ? (
				<div className={styles.connect_wrap}>
					<span className={styles.connect_value}>7.00698 ETH</span>
					<div className={styles.connect}>
						{' '}
						<span className={styles.connect_circle}></span> OxE786...C41c ETH
					</div>
				</div>
			) : (
				<ConnectButton onClick={connect} />
			)}
		</div>
	);
};

export default Header;
