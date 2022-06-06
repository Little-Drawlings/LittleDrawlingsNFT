import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import {
	setOpenSavePopup,
	setOverMint,
	setPauseMint,
	setTimeMint,
} from '../../redux/actions/mint';
import icons from '../../constants/icons';
import { RootState } from '../../redux/reducers';

import styles from './CountDown.module.scss';

interface Props {
	className?: string;
}

const CountDown: React.FC<Props> = ({ className }) => {
	const dispatch = useDispatch();
	const mintTime = useSelector((state: RootState) => state?.mintReducer.time);
	const mintPause = useSelector(
		(state: RootState) => state?.mintReducer.mintPause
	);
	const mintOver = useSelector(
		(state: RootState) => state?.mintReducer.mintOver
	);
	const [paused, setPaused] = React.useState(false);
	const [over, setOver] = React.useState(false);
	const [time, setTime] = useState<number>(mintTime);

	

	useEffect(() => {
		setTime(mintTime);
	}, [mintTime]);

	useEffect(() => {
		dispatch(
			setTimeMint(mintTime)
		);
	}, [paused, over, time, dispatch, mintTime]);

	useEffect(() => {
		setPaused(mintPause);
		setOver(mintOver);
	}, [mintPause, mintOver]);

	useEffect(() => {
		let timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	const tick = () => {
		if (paused || over) return;
		if (
			time === 0
		) {
			dispatch(setOpenSavePopup(true))
			dispatch(setOverMint(true));
		}
		else {
			dispatch(setTimeMint(time - 1));
		}

	};

	const goesTime = () => {
		if (over) {
			dispatch(setPauseMint(true));
		} else {
			dispatch(setPauseMint(!paused));
		}
	};

	const hours = Math.floor(time / 3600);
	const minutes = Math.floor(time % 3600 / 60);
	const seconds = Math.floor(time % 3600 % 60);

	return (
		<div className={cn(className)}>
			{over ? (
				<div className={styles.time_over}>{'00:00:00'}</div>
			) : (
				<div className={styles.time_value}>{`${hours
					.toString()
					.padStart(2, '0')}:${minutes
						.toString()
						.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>
			)}
			<img
				className={styles.time_btn}
				src={paused || over ? icons.Start : icons.Pause}
				alt=''
				onClick={goesTime}
			/>
		</div>
	);
};

export default CountDown;
