import icons from '../../constants/icons';
import HeaderLink from '../HeaderLink';

import styles from './Header.module.scss';

interface Props {}

const Header: React.FC<Props> = () => {
	return (
		<div className={styles.content}>
			<img className={styles.logo} src={icons.Logo} alt='logo' />
			<ul className={styles.nav_list}>
				<li className={styles.nav_list_item}>
					<HeaderLink to='/'>Mint</HeaderLink>
					<HeaderLink to='/studio'>Studio</HeaderLink>
				</li>
			</ul>
		</div>
	);
};

export default Header;
