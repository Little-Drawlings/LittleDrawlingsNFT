import cn from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { RootState } from '../../../redux/reducers';
import { AppDispatch } from '../../../redux/store';
import { contractDrawl, setDrawl } from '../../../redux/actions/drawl';
import { SavePopupProps } from '../../../redux/types/data';
import DefaultButton from '../../DefaultButton';
import DefaultInput from '../../DefaultInput';

import { dataUrlToFile } from '../../../constants/data';
import { IDrawl } from '../../../redux/types/reducers';
import { setOpenSavePopup } from '../../../redux/actions/mint';

import styles from './SavePopup.module.scss';

const SavePopup: React.FC<SavePopupProps> = ({
	title = '',
	drawlName = '',
	drawl = '',
	format = '',
	time = 0,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const activeDrawl = useSelector(
		(state: RootState) => state?.drawlReducer.activeDrawl
	);
	const [name, setName] = useState<string>(drawlName);

	const exit = () => {
		dispatch(setOpenSavePopup(false));
		navigate('/');
	};

	const save = async () => {
		const imgFile: File = await dataUrlToFile(drawl, name, 'image/png');
		let drawlData: any = { name: name, image: imgFile, format, time };
		drawlData = { ...drawlData, id: activeDrawl?._id };
		dispatch(setDrawl(drawlData))
			.then((res: IDrawl) => {
				if (res.ipnsLink) {
					contractDrawl(res.ipnsLink);
				}
			})
			.finally(() => {
				exit();
			});
	};

	const mint = () => {
		dispatch(setOpenSavePopup(false));
	};

	return (
		<>
			<div className={cn('overlay')} onClick={mint}>
				<div className={cn('popup-content', styles.popup)} onClick={e => e.stopPropagation()}>
					<h3 className={styles.popup_title}>{title}</h3>
					<p className={styles.popup_desc}>Save your canvas or mint as...</p>
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
							onClick={save}
						/>
						<DefaultButton
							className='no_wide_text_small'
							title='Mint'
							onClick={mint}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SavePopup;
