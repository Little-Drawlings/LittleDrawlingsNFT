import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import { HEADER_BG } from '../../constants/data';
import icons from '../../constants/icons';

import styles from './Mint.module.scss';

const Mint: React.FC = () => {
	return (
		<>
			<Header background={HEADER_BG.PINK}/>
			<div className={styles.content}>
				<div className={styles.title_wrap}>
					<h3 className={styles.title}>Paint & Claim</h3>
					<p className={styles.text}>Collectable NFT trading game</p>
					<DefaultButton className='no_wide_primary_large' title='Mint Canvas' onClick={() => null} />
				</div>
			</div>
		</>
	);
};

export default Mint;
