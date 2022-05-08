import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setOpenedDrawPopup,
	setOpenSavePopup,
} from '../../../redux/actions/mint';
import { RootState } from '../../../redux/reducers';

import { SavePopupProps } from '../../../redux/types/data';
import DefaultButton from '../../DefaultButton';

import styles from './SavePopup.module.scss';

const SavePopup: React.FC<SavePopupProps> = ({
	title = '',
	desc = '',
	drawlName = '',
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isOpenPopup = useSelector(
		(state: RootState) => state?.mintReducer.openSavePopup
	);
	const [name, setName] = useState<string>(drawlName);
	const [openPopup, setOpenPopup] = useState<boolean>(isOpenPopup);

	useEffect(() => {
		setOpenPopup(isOpenPopup);
	}, [isOpenPopup]);

	const mint = () => {
		dispatch(setOpenedDrawPopup(false));
		dispatch(setOpenSavePopup(false));
		navigate('/');
	};

	return (
		<>
			{openPopup && (
				<div className={cn('popup-overlay')}>
					<div className={cn('popup-content', styles.popup)}>
						<h3 className={styles.popup_title}>{title}</h3>
						<p className={styles.popup_desc}>{desc}</p>
						<input
							className={styles.popup_input}
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<div className={styles.buttons_wrap}>
							<DefaultButton
								className='no_wide_text_small'
								title='Save & Close'
								onClick={() => navigate('/')}
							/>
							<DefaultButton
								className='no_wide_text_small'
								title='Mint'
								onClick={mint}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SavePopup;
