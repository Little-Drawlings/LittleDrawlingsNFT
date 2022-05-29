import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import { RootState } from '../../redux/reducers';
import icons from '../../constants/icons';
import { getDrawl } from '../../redux/actions/drawl';
import { AppDispatch } from '../../redux/store';

import styles from './Mint.module.scss';

const Mint: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [nightMode, setNightMode] = useState<boolean>(false);

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	const mintCanvas = () => {
		dispatch(getDrawl(''));
		navigate('/studio/canvas')
	}

	return (
		<>
			<Header />
			<div className={cn('content', nightMode && 'night')}>
				<div className={styles.title_wrap}>
					<div className={cn(styles.animated, nightMode && styles.fade_in)}>
						<h3 className={styles.title}>Paint & Claim</h3>
						<p className={styles.text}>Collectable NFT trading game</p>
					</div>
					<DefaultButton
						className='no_wide_primary_large'
						title='Mint Canvas'
						onClick={mintCanvas}
					/>
				</div>
				<div className={cn(styles.left_images, styles.fade_in, nightMode && styles.active)}>
					<img className={styles.left_img} src={icons.AdamImg} alt='Adam' />
				</div>
				<div className={cn(styles.right_images, styles.fade_in, nightMode && styles.active)}>
					<img
						className={styles.right_img}
						src={icons.GodImg}
						alt='God'
					/>
				</div>
			</div>
		</>
	);
};

export default Mint;
