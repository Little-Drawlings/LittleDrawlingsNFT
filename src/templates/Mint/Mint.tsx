import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Header from '../../components/Header';
import { RootState } from '../../redux/reducers';

import Welcome from '../../components/mintComponents/Welcome';
import MasterStudio from '../../components/mintComponents/MasterStudio';
import MintStudio from '../../components/mintComponents/MintStudio';
import LetsDraw from '../../components/mintComponents/LetsDraw';
import RoadMap from '../../components/mintComponents/RoadMap';
import MintFooter from '../../components/mintComponents/MintFooter';

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
				<MasterStudio />
				<MintStudio />
				<LetsDraw/>
				<RoadMap />
				<MintFooter/>
			</div>
		</>
	);
};

export default Mint;