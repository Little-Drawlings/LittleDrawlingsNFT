import cn from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { Rings } from 'react-loader-spinner';

import { RootState } from '../../../redux/reducers';
import { AppDispatch } from '../../../redux/store';
import { contractDrawl, setDrawl } from '../../../redux/actions/drawl';
import { SavePopupProps } from '../../../redux/types/data';
import DefaultButton from '../../DefaultButton';
import DefaultInput from '../../DefaultInput';

import ipfs from '../../../api/ipfs';

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
	const [loading, setLoading] = useState<boolean>(false);

	const exit = () => {
		dispatch(setOpenSavePopup(false));
		navigate('/');
	};

	const save = async () => {
		setLoading(true);
		let drawlData: IDrawl = { name: name, image: drawl, format, time };
		const imgFile: File = await dataUrlToFile(drawl, 'Drawl', 'image/png');
		const fileHash = await (ipfs as IPFSHTTPClient)
			.add(imgFile)
			.then((res) => res.path);
		if (activeDrawl?._id) {
			drawlData = { ...drawlData, id: activeDrawl?._id };
			dispatch(setDrawl(drawlData))
				.then(async () => {
					const ipnsLink = await (ipfs as IPFSHTTPClient).name
						.publish(fileHash, { key: activeDrawl?._id })
						.then((res) => res.name);
					contractDrawl(ipnsLink);
				})
				.finally(() => {
					exit();
				});
		} else {
			dispatch(setDrawl(drawlData)).then(async (res: IDrawl) => {
				if (res._id) {
					await (ipfs as IPFSHTTPClient).key.gen(res._id);
					const ipnsLink = await (ipfs as IPFSHTTPClient).name
						.publish(fileHash, { key: res?._id })
						.then((res) => res.name);
					contractDrawl(ipnsLink).finally(() => {
						exit();
					});
				} else {
					exit();
				}
			});
		}
	};

	const mint = () => {
		dispatch(setOpenSavePopup(false));
	};

	return (
		<>
			{ipfs ? (
				<div className={cn('popup-overlay')} onClick={mint}>
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
			) : (
				<div className={cn('popup-overlay')}>
					<p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
				</div>
			)}
			{loading && (
				<Rings
					wrapperClass={styles.spinner}
					height='100'
					width='100'
					color='#6B6DB1'
					ariaLabel='loading'
				/>
			)}
		</>
	);
};

export default SavePopup;
