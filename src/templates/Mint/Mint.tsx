import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Header from '../../components/Header';
import { RootState } from '../../redux/reducers';
import Welcome from '../../components/mintComponents/Welcome';

import styles from './Mint.module.scss';

const Mint: React.FC = () => {
	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);
	const [nightMode, setNightMode] = useState<boolean>(false);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	return (
		<>
			<Header />
			<div className={cn('content', nightMode && 'night')}>
				<Welcome />
			</div>
		</>
	);
};

export default Mint;