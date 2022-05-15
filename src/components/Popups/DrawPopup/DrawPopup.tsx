import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { FORMATS } from '../../../constants/data';

import DefaultButton from '../../DefaultButton';
import {
	setFormatMint,
	setOpenedDrawPopup,
	setOverMint,
	setPauseMint,
	setTimeMint,
} from '../../../redux/actions/mint';

import styles from './DrawPopup.module.scss';

const DrawPopup: React.FC = () => {
	const [openPopup, setOpenPopup] = useState(true);
	const [format, setFormat] = useState(FORMATS.RECTANGLE);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const changeFormat = (activeFormat: string) => {
		setFormat(activeFormat);
	};

	const startMint = () => {
		setOpenPopup(false);
		dispatch(setFormatMint(format));
		dispatch(setPauseMint(false));
		dispatch(setOverMint(false));
		dispatch(setOpenedDrawPopup(true));
		dispatch(
			setTimeMint({
				hours: 0,
				minutes: 0,
				seconds: 5,
			})
		);
	};

	return (
		<>
			{openPopup && (
				<div className={cn('popup-overlay')}>
					<div className={cn('popup-content', styles.popup)}>
						<h3 className={styles.popup_title}>Let’s drawl</h3>
						<h5 className={styles.format_title}>Select format</h5>
						<div className={styles.format_wrap}>
							<button
								className={cn(
									styles.format,
									styles.rectangle,
									format === FORMATS.RECTANGLE && styles.active
								)}
								value={FORMATS.RECTANGLE}
								onClick={() => changeFormat(FORMATS.RECTANGLE)}
							>
								{FORMATS.RECTANGLE}
							</button>
							<button
								className={cn(
									styles.format,
									styles.square,
									format === FORMATS.SQUARE && styles.active
								)}
								value={FORMATS.SQUARE}
								onClick={() => changeFormat(FORMATS.SQUARE)}
							>
								{FORMATS.SQUARE}
							</button>
							<button
								className={cn(
									styles.format,
									styles.small_rectangle,
									styles.disabled,
									format === FORMATS.SMALL_RECTANGLE && styles.active
								)}
								value={FORMATS.SMALL_RECTANGLE}
								onClick={() => changeFormat(format)}
							>
								{FORMATS.SMALL_RECTANGLE}
							</button>
							<button
								className={cn(
									styles.format,
									styles.flipped_rectangle,
									styles.disabled,
									format === FORMATS.FLIPPED_RECTANGLE && styles.active
								)}
								value={FORMATS.FLIPPED_RECTANGLE}
								onClick={() => changeFormat(format)}
							>
								{FORMATS.FLIPPED_RECTANGLE}
							</button>
						</div>
						<div className={styles.buttons_wrap}>
							<DefaultButton
								className='no_wide_secondary_small'
								title='Cancel'
								onClick={() => navigate('/')}
							/>
							<DefaultButton
								className='no_wide_primary_small'
								title='Mint'
								onClick={startMint}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DrawPopup;
