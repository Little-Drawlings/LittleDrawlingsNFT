import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTimeMint } from '../../redux/actions/mint';
import icons from '../../constants/icons';

import styles from './CountDown.module.scss';
import { RootState } from '../../redux/reducers';

interface Props {
	hours?: string;
	minutes?: string;
	seconds?: string;
}

const CountDown: React.FC<Props> = ({
	hours = '0',
	minutes = '0',
	seconds = '0',
}) => {
	const dispatch = useDispatch();
	const [paused, setPaused] = React.useState(true);
	const [over, setOver] = React.useState(false);
	const [time, setTime] = useState({
		hours: parseInt(hours),
		minutes: parseInt(minutes),
		seconds: parseInt(seconds),
	});

	const format = useSelector(
		(state: RootState) => state?.mintReducer.mintFormat
	);

	useEffect(() => {
		let timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	const tick = () => {
		if (paused || over) return;
		if (time.hours === 0 && time.minutes === 0 && time.seconds === 0)
			setOver(true);
		else if (time.minutes === 0 && time.seconds === 0)
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
			dispatch(setTimeMint(true));
		} else {
			setPaused(!paused);
			dispatch(setTimeMint(!paused));
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
