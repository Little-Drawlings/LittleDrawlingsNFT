import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { create, IPFSHTTPClient } from 'ipfs-http-client';

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
import { dataUrlToFile } from '../../../constants/data';
import { IDrawl } from '../../../redux/types/reducers';

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
	const activeDrawl = useSelector((state: RootState) => state?.drawlReducer.activeDrawl);
	const isOpenPopup = useSelector(
		(state: RootState) => state?.mintReducer.openSavePopup
	);
	const [name, setName] = useState<string>(drawlName);
	const [openPopup, setOpenPopup] = useState<boolean>(isOpenPopup);

	useEffect(() => {
		setOpenPopup(isOpenPopup);
	}, [isOpenPopup]);

	const mint = async () => {
		const imgFile: File = await dataUrlToFile(drawl, 'Drawl', 'image/png');
		return await (ipfs as IPFSHTTPClient).add(imgFile).then((res) => {
			let drawlData: IDrawl = { name: drawlName, image: drawl, format, time }
			if(activeDrawl?._id) {
				drawlData = {...drawlData, id: activeDrawl?._id}
			}
			dispatch(setDrawl(drawlData, res?.path))
			dispatch(setOpenedDrawPopup(false));
			dispatch(setOpenSavePopup(false));
		}).then(() => {
			navigate('/');
		});

	};

	let ipfs: IPFSHTTPClient | undefined;
	try {
		ipfs = create({
			url: "https://ipfs.infura.io:5001/api/v0",
		});
	} catch (error) {
		console.error("IPFS error ", error);
		ipfs = undefined;
	}

	return (
		<>
			{openPopup && ipfs && (
				<div className={cn('popup-overlay')} >
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
			{openPopup && !ipfs && (
				<div className={cn('popup-overlay')} >
					<p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
				</div>
			)}
		</>
	);
};

export default SavePopup;
