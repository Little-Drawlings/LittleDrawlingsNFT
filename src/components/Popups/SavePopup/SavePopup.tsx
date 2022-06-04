import cn from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { create, IPFSHTTPClient } from 'ipfs-http-client';

import { setDrawl } from '../../../redux/actions/drawl';
import { RootState } from '../../../redux/reducers';
import { AppDispatch } from '../../../redux/store';

import { SavePopupProps } from '../../../redux/types/data';
import DefaultButton from '../../DefaultButton';
import DefaultInput from '../../DefaultInput';

import styles from './SavePopup.module.scss';
import { dataUrlToFile } from '../../../constants/data';
import { IDrawl } from '../../../redux/types/reducers';
import { setOpenSavePopup } from '../../../redux/actions/mint';

const SavePopup: React.FC<SavePopupProps> = ({
	title = '',
	drawlName = '',
	drawl = '',
	format = '',
	time = 0
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const activeDrawl = useSelector((state: RootState) => state?.drawlReducer.activeDrawl);
	const [name, setName] = useState<string>(drawlName);

	const save = async () => {
		const imgFile: File = await dataUrlToFile(drawl, 'Drawl', 'image/png');
		return await (ipfs as IPFSHTTPClient).add(imgFile).then((res) => {
			let drawlData: IDrawl = { name: name, image: drawl, format, time }
			if (activeDrawl?._id) {
				drawlData = { ...drawlData, id: activeDrawl?._id }
			}
			dispatch(setDrawl(drawlData, res?.path))
		}).then(() => {
			dispatch(setOpenSavePopup(false))
			navigate('/');
		});

	};

	const mint = () => {
		dispatch(setOpenSavePopup(false))
	}

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
			{ipfs ? (
				<div className={cn('popup-overlay')} >
					<div className={cn('popup-content', styles.popup)}>
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
			) : (
				<div className={cn('popup-overlay')} >
					<p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
				</div>
			)}
		</>
	);
};

export default SavePopup;
