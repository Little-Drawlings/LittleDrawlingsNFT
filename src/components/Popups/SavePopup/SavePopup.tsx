import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDrawl } from '../../../redux/actions/drawl';
import {
	setOpenedDrawPopup,
	setOpenSavePopup,
} from '../../../redux/actions/mint';
import { RootState } from '../../../redux/reducers';
import { AppDispatch } from '../../../redux/store';

import { SavePopupProps } from '../../../redux/types/data';
import DefaultButton from '../../DefaultButton';
import DefaultInput from '../../DefaultInput';

import styles from './SavePopup.module.scss';

const SavePopup: React.FC<SavePopupProps> = ({
	title = '',
	desc = '',
	drawlName = '',
	drawl = '',
	format,
	time
}) => {
	const dispatch = useDispatch<AppDispatch>();
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
		dispatch(setDrawl({name: drawlName, image: drawl, format, time}))
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
						<DefaultInput
							placeholder='Name'
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
