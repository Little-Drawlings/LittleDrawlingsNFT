import Header from '../../components/Header';
import icons from '../../constants/icons';

import styles from './Mint.module.scss';

const Mint: React.FC= () => {
	return (
		<>
			<Header />
			<div className={styles.content}>
                <img className={styles.bg_image} src={icons.BackgroundLogo} alt="logo"/>
            </div>
		</>
	);
};

export default Mint;
