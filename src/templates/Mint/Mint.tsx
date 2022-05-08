import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import { HEADER_BG } from '../../constants/data';
import { RootState } from '../../redux/reducers';
import icons from '../../constants/icons';

import styles from './Mint.module.scss';

const Mint: React.FC = () => {
	const [nightMode, setNightMode] = useState<boolean>(false);

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	return (
		<>
			<Header background={HEADER_BG.PINK} />
			<div className={cn(styles.content, nightMode && styles.night)}>
				<div className={styles.title_wrap}>
					<div className={cn(styles.animated, nightMode && styles.fade_in)}>
						<h3 className={styles.title}>Paint & Claim</h3>
						<p className={styles.text}>Collectable NFT trading game</p>
					</div>
					<DefaultButton
						className='no_wide_primary_large'
						title='Mint Canvas'
						onClick={() => null}
					/>
				</div>
				<div className={cn(styles.left_images, nightMode && styles.active)}>
					<img className={styles.left_img} src={icons.Ground} alt="Ground" />
				</div>
				<div className={cn(styles.right_images, nightMode && styles.active)}>
				<img className={styles.right_img} src={icons.Bubbles} alt="BodyMint" />
				</div>
			</div>
		</>
	);
};

export default Mint;
