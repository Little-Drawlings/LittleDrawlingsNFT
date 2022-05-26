import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import Header from '../../components/Header';
import Drawl from '../../components/Drawl';
import DefaultDropdown from '../../components/DefaultDropdown';
import DefaultButton from '../../components/DefaultButton';
import { RootState } from '../../redux/reducers';
import { getAllDrawls } from '../../redux/actions/drawl';
import { AppDispatch } from '../../redux/store';
import { IDrawl } from '../../redux/types/reducers';

import styles from './Studio.module.scss';

const Studio: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [nightMode, setNightMode] = useState<boolean>(false);
	const [drawls, setDrawls] = useState<IDrawl[]>([])

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
	return (
		<>
			<Header />
			<div className={cn('content', nightMode && 'night')}>
				<div className={styles.filters_wrap}>
					<DefaultDropdown
						options={['Newest first', 'Oldest first']}
						placeholder='Sort by'
					/>
					<DefaultButton
						className='wide_primary_small'
						title='Mint new canvas'
						onClick={() => navigate('/studio/canvas')}
					/>
				</div>
				<div className={styles.nft_list}>
					{drawls?.length ? drawls.map((drawl, key) =>
						<Drawl
							key={key}
							image={drawl.image}
							title={drawl.name || ''}
							size={drawl.format}
							edited={'3 days ago'}
							time={drawl.time}
						/>
					) : null}

				</div>
			</div>
		</>
	);
};
export default Studio;
