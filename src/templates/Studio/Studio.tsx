import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Option } from 'react-dropdown';
import cn from 'classnames';

import Header from '../../components/Header';
import Drawl from '../../components/Drawl';
import DefaultDropdown from '../../components/DefaultDropdown';
import DefaultButton from '../../components/DefaultButton';
import { RootState } from '../../redux/reducers';
import { getAllDrawls, getDrawl } from '../../redux/actions/drawl';
import { AppDispatch } from '../../redux/store';
import { IDrawl } from '../../redux/types/reducers';
import { DRAWLS_SORT_VALUES } from '../../constants/data';

import styles from './Studio.module.scss';
import { setOpenDrawPopup, setOverMint } from '../../redux/actions/mint';

const Studio: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [nightMode, setNightMode] = useState<boolean>(false);
	const [drawls, setDrawls] = useState<IDrawl[]>([])
	const [, setDropdown] = useState<string>('')

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);
	const drawlsList = useSelector(
		(state: RootState) => state?.drawlReducer.drawls
	);

	useEffect(() => {
		dispatch(getAllDrawls())
	}, [dispatch])

	useEffect(() => {
		setDrawls(drawlsList)
	}, [drawlsList])

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	const sortDrawls = (option: Option) => {
		setDropdown(option.value);
		drawls.sort((a, b) => {
			const d1 = new Date(a.updatedAt || '').getTime()
			const d2 = new Date(b.updatedAt || '').getTime()
			return option.value === 'old' ? d1 - d2 : d2 - d1
		});
	}

	const openCanvas = (id?: string) => {
		if (id) {
			dispatch(setOverMint(false))
			dispatch(getDrawl(id)).then(() => {
				navigate('/studio/canvas')
			})
		}
	}

	const openNewCanvas = () => {
		dispatch(getDrawl(''));
		dispatch(setOpenDrawPopup(true))
		navigate('/studio/canvas')
	}

	return (
		<>
			<Header />
			<div className={cn('content', nightMode && 'night')}>
				<div className={styles.filters_wrap}>
					<DefaultDropdown
						options={DRAWLS_SORT_VALUES}
						placeholder='Sort by'
						onChange={(e) => sortDrawls(e)}

					/>
					<DefaultButton
						className='wide_primary_small'
						title='Mint new canvas'
						onClick={openNewCanvas}
					/>
				</div>
				<div className={styles.nft_list}>
					{drawls?.length ? drawls.map((drawl, key) =>
						<Drawl
							key={key}
							image={drawl.image}
							title={drawl.name || ''}
							size={drawl.format}
							edited={drawl.updatedAt || ''}
							time={drawl.time}
							onClick={() => openCanvas(drawl._id)}
						/>
					) : null}

				</div>
			</div>
		</>
	);
};
export default Studio;
