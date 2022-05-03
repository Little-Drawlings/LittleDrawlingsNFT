import React, { useEffect, useState } from 'react';
import icons from '../../constants/icons';

import styles from './CountDown.module.scss';

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
	const [paused, setPaused] = React.useState(false);
	const [over, setOver] = React.useState(false);
	const [time, setTime] = useState({
		hours: parseInt(hours),
		minutes: parseInt(minutes),
		seconds: parseInt(seconds),
	});

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

	return (
		<div>
			<p>{`${time.hours.toString().padStart(2, '0')}:${time.minutes
				.toString()
				.padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>
			<div>{over ? '00:00:00' : ''}</div>
			<img
				src={paused ? icons.Start : icons.Pause}
				alt=''
				onClick={() => setPaused(!paused)}
			/>
		</div>
	);
};

export default CountDown;
