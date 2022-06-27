import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Header from '../../components/Header';
import { RootState } from '../../redux/reducers';
import Welcome from '../../components/MintComponents/Welcome';
import MasterStudio from '../../components/MintComponents/MasterStudio';
import MintStudio from '../../components/MintComponents/MintStudio';
import LetsDraw from '../../components/MintComponents/LetsDraw';
import RoadMap from '../../components/MintComponents/RoadMap';
import MintFooter from '../../components/MintComponents/MintFooter';


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