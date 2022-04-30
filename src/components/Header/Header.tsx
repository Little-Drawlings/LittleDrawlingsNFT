import React from 'react';

import icons from '../../constants/icons';
import ConnectButton from '../Buttons/ConnectButton';
import HeaderLink from '../HeaderLink';

import styles from './Header.module.scss';

const Header: React.FC = () => {
	const [connected, setConnected] = React.useState(false);

	const connect = () => {
		setConnected(!connected);
	};

	return (
		<div className={styles.header}>
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
			{connected ? <div className={styles.connect_wrap}>
				<span className={styles.connect_value}>7.00698 ETH</span>
				<div className={styles.connect}> <span className={styles.connect_circle}></span> OxE786...C41c ETH</div>
			</div> : <ConnectButton onClick={connect} />}
		</div>
	);
};

export default Header;
