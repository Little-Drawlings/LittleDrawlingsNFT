import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import { RootState } from '../../redux/reducers';
import icons from '../../constants/icons';

import styles from './Mint.module.scss';

const Mint: React.FC = () => {
	const navigate = useNavigate();
	const [nightMode, setNightMode] = useState<boolean>(false);

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	return (
		<>
			<Header />
			<div className={cn(styles.content, nightMode && styles.night)}>
				<div className={styles.title_wrap}>
					<div className={cn(styles.animated, nightMode && styles.fade_in)}>
						<h3 className={styles.title}>Paint & Claim</h3>
						<p className={styles.text}>Collectable NFT trading game</p>
					</div>
					<DefaultButton
						className='no_wide_primary_large'
						title='Mint Canvas'
						onClick={() => navigate('/studio')}
					/>
				</div>
				<div className={cn(styles.left_images, nightMode && styles.active)}>
					<img className={styles.left_img} src={nightMode ? icons.LeftImageActive : icons.LeftImage} alt='Ground' />
				</div>
				<div className={cn(styles.right_images, styles.swipe_down, nightMode && styles.active)}>
					<img
						className={styles.right_img}
						src={nightMode ? icons.RightImageActive : icons.RightImage}
						alt='RightImage'
					/>
				</div>
			</div>
		</>
	);
};

export default Mint;
