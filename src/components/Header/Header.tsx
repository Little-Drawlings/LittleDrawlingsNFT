import styles from './Header.module.scss';

interface Props {}

const Header: React.FC<Props> = () => {
	return <div className={styles.content}>Header</div>;
};

export default Header;
