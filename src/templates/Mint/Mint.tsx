import DefaultButton from '../../components/Buttons/DefaultButton';
import Header from '../../components/Header';
import icons from '../../constants/icons';

import styles from './Mint.module.scss';

const Mint: React.FC = () => {
	return (
		<>
			<Header />
			<div className={styles.content}>
				<img
					className={styles.bg_image}
					src={icons.BackgroundLogo}
					alt='logo'
				/>
				<div className={styles.title_wrap}>
					<h3 className={styles.title}>Paint & Claim</h3>
					<p className={styles.text}>Collectable NFT trading game</p>
				</div>
				<div className={styles.btn_wrap}>
					<img
						className={styles.bg_image}
						src={icons.MintGirl}
						alt='MintGirl'
					/>
					<DefaultButton title='Mint' />
					<img className={styles.bg_image} src={icons.MintBoy} alt='MintBoy' />
				</div>
			</div>
		</>
	);
};

export default Mint;
