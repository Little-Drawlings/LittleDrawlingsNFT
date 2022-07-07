import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import {
	Animator,
	ScrollContainer,
	ScrollPage,
	batch,
	Fade,
	FadeIn,
	Move,
	MoveIn,
	MoveOut,
	Sticky,
	StickyIn,
	ZoomIn
} from "react-scroll-motion";

import Header from '../../components/headerComponents/Header';
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

	const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
	const FadeUp = batch(Fade(), Move(), Sticky());

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	return (
		<>
			<Header />
			<div className={cn('content', nightMode && 'night')}>
				<ScrollContainer>
					<Welcome />
					<ScrollPage page={0}>
						<Animator animation={FadeUp}>
							<MasterStudio />
						</Animator>
					</ScrollPage>
					<ScrollPage page={3}>
						<Animator animation={batch(Fade(), Sticky(), MoveOut(0, -50))}>
							<MintStudio />
						</Animator>
					</ScrollPage>
					<LetsDraw />
					<RoadMap />
					<MintFooter />
				</ScrollContainer>
			</div>
		</>
	);
};

export default Mint;