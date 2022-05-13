import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import Header from '../../components/Header';
import Drawl from '../../components/Drawl';
import DefaultDropdown from '../../components/DefaultDropdown';
import DefaultButton from '../../components/DefaultButton';
import { RootState } from '../../redux/reducers';

import styles from './Studio.module.scss';

const Studio: React.FC = () => {
	const navigate = useNavigate();
	const [nightMode, setNightMode] = useState<boolean>(false);

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);
	return (
		<>
			<Header />
			<div className={cn('content', nightMode && 'night')}>
				<div className={styles.filters_wrap}>
					<div className={styles.filters}>
						<DefaultDropdown />
					</div>
					<DefaultButton
						className='wide_primary_small'
						title='Mint new canvas'
						onClick={() => navigate('/studio/canvas')}
					/>
				</div>
				<div className={styles.nft_list}>
					<Drawl
						image={null}
						title={'Drawl #1'}
						size={'16:9'}
						edited={'3 days ago'}
						time={0}
					/>
					<Drawl
						image={null}
						title={'Drawl #1'}
						size={'16:9'}
						edited={'3 days ago'}
						time={0}
					/>
					<Drawl
						image={null}
						title={'Drawl #1'}
						size={'16:9'}
						edited={'3 days ago'}
						time={0}
					/>
					<Drawl
						image={null}
						title={'Drawl #1'}
						size={'16:9'}
						edited={'3 days ago'}
						time={0}
					/>
				</div>
			</div>
		</>
	);
};
export default Studio;
