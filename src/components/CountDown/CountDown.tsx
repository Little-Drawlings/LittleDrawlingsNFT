import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	setOverMint,
	setPauseMint,
	setTimeMint,
} from '../../redux/actions/mint';
import icons from '../../constants/icons';
import { RootState } from '../../redux/reducers';

import styles from './CountDown.module.scss';

interface Time {
	hours: number;
	minutes: number;
	seconds: number;
}

const CountDown: React.FC = () => {
	const dispatch = useDispatch();
	const [paused, setPaused] = React.useState(true);
	const [over, setOver] = React.useState(false);
	const mintTime = useSelector((state: RootState) => state?.mintReducer.time);

	const [time, setTime] = useState<Time>({
		hours: mintTime.hours,
		minutes: mintTime.minutes,
		seconds: mintTime.seconds,
	});

	const mintPause = useSelector(
		(state: RootState) => state?.mintReducer.mintPause
	);

	const mintOver = useSelector(
		(state: RootState) => state?.mintReducer.mintOver
	);

	useEffect(() => {
		setTime({
			hours: mintTime.hours,
			minutes: mintTime.minutes,
			seconds: mintTime.seconds,
		});
	}, [mintTime]);

	useEffect(() => {
		console.log({
			hours: time.hours,
			minutes: time.minutes,
			seconds: time.seconds,
		});
		dispatch(
			setTimeMint({
				hours: time.hours,
				minutes: time.minutes,
				seconds: time.seconds,
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paused, over]);

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
		if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
			dispatch(setOverMint(true));
		} else if (time.minutes === 0 && time.seconds === 0)
			setTime({
				hours: time.hours - 1,
				minutes: 59,
				seconds: 59,
			});
		else if (time.seconds === 0)
			setTime({
				hours: time.hours,
				minutes: time.minutes - 1,
				seconds: 59,
			});
		else
			setTime({
				hours: time.hours,
				minutes: time.minutes,
				seconds: time.seconds - 1,
			});
	};

	const goesTime = () => {
		if (over) {
			dispatch(setPauseMint(true));
		} else {
			dispatch(setPauseMint(!paused));
		}
	};

	return (
		<>
			{over ? (
				<div>{'00:00:00'}</div>
			) : (
				<p>{`${time.hours.toString().padStart(2, '0')}:${time.minutes
					.toString()
					.padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>
			)}
			<img
				src={paused || over ? icons.Start : icons.Pause}
				alt=''
				onClick={goesTime}
			/>
		</>
	);
};

export default CountDown;
