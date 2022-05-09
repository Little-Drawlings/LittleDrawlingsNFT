import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import {
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

interface Time {
	hours: number;
	minutes: number;
	seconds: number;
}

const CountDown: React.FC<Props> = ({ className }) => {
	const dispatch = useDispatch();
	const [paused, setPaused] = React.useState(false);
	const [over, setOver] = React.useState(false);
	const mintTime = useSelector((state: RootState) => state?.mintReducer.time);

	const [time, setTime] = useState<Time>({
		hours: mintTime?.hours || 0,
		minutes: mintTime?.minutes || 0,
		seconds: mintTime?.seconds || 0,
	});

	const mintPause = useSelector(
		(state: RootState) => state?.mintReducer.mintPause
	);

	const mintOver = useSelector(
		(state: RootState) => state?.mintReducer.mintOver
	);

	const openedDrawPopup = useSelector(
		(state: RootState) => state?.mintReducer.openedDrawPopup
	);

	useEffect(() => {
		if (mintTime) {
			setTime({
				hours: mintTime?.hours,
				minutes: mintTime?.minutes,
				seconds: mintTime?.seconds,
			});
		}
	}, [mintTime]);

	useEffect(() => {
		dispatch(
			setTimeMint({
				hours: time.hours,
				minutes: time.minutes,
				seconds: time.seconds,
			})
		);
	}, [paused, over, time.hours, time.minutes, time.seconds, dispatch]);

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
			time.hours === 0 &&
			time.minutes === 0 &&
			time.seconds === 0 &&
			openedDrawPopup
		) {
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
		<div className={cn(className)}>
			{over ? (
				<div className={styles.time_over}>{'00:00:00'}</div>
			) : (
				<div className={styles.time_value}>{`${time.hours
					.toString()
					.padStart(2, '0')}:${time.minutes
					.toString()
					.padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</div>
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
