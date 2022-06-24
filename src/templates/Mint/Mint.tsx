import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import { RootState } from '../../redux/reducers';
import icons from '../../constants/icons';
import { getDrawl } from '../../redux/actions/drawl';
import { AppDispatch } from '../../redux/store';
import { setOpenDrawPopup } from '../../redux/actions/mint';

import styles from './Mint.module.scss';

const Mint: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [nightMode, setNightMode] = useState<boolean>(false);

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	const mintCanvas = () => {
		dispatch(getDrawl(''));
		dispatch(setOpenDrawPopup(true));
		navigate('/studio/canvas')
	}
	return (
		<>
			<div>
				<p>
					Style for every woman, now in regular sizes 02-28.
					<label htmlFor="modalPDP-1" onClick={(e) => console.log(e.target)}>Learn More <input type="checkbox" id="modalPDP-1" name="test" /></label>
				</p>


				<label htmlFor="modalPDP-1">Last Name 2: </label>
			</div>
		</>
	);
};

export default Mint;
