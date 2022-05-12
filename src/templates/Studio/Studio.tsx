import React, { useEffect, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import Header from '../../components/Header';
import DefaultButton from '../../components/DefaultButton';
import CountDown from '../../components/CountDown';
import DrawPopup from '../../components/Popups/DrawPopup';
import SavePopup from '../../components/Popups/SavePopup';

import { COLORS, FORMATS } from '../../constants/data';
import { SavePopupProps } from '../../redux/types/data';
import { RootState } from '../../redux/reducers';
import icons from '../../constants/icons';

import styles from './Studio.module.scss';
import { setOpenSavePopup } from '../../redux/actions/mint';

const Studio: React.FC = () => {
	const dispatch = useDispatch();
	const [drawing, setDrawing] = useState();
	const [brushColor, setBrushColor] = useState(COLORS[0]);
	const [brushRadius, setBrushRadius] = useState(5);
	const [format, setFormat] = useState(FORMATS.RECTANGLE);
	const [nightMode, setNightMode] = useState<boolean>(false);
	const [saveData, setSaveData] = useState<SavePopupProps>({
		title: '',
		desc: '',
		drawlName: '',
	});

	const pause = useSelector((state: RootState) => state?.mintReducer.mintPause);

	const over = useSelector((state: RootState) => state?.mintReducer.mintOver);

	const openedDrawPopup = useSelector(
		(state: RootState) => state?.mintReducer.openedDrawPopup
	);

	const activeFormat = useSelector(
		(state: RootState) => state?.mintReducer.mintFormat
	);

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	useEffect(() => {
		setNightMode(nightModeMint);
	}, [nightModeMint]);

	useEffect(() => {
		setFormat(activeFormat);
	}, [activeFormat]);

	useEffect(() => {
		if (over) {
			setSaveData({
				title: 'Time is up!',
				desc: 'Save your canvas or mint as...',
				drawlName: 'Drawl #1020',
			});
			dispatch(setOpenSavePopup(true));
		}
		if (!openedDrawPopup) {
			dispatch(setOpenSavePopup(false));
		}
	}, [dispatch, over, openedDrawPopup]);

	const changeCanvasImage = (canvas: CanvasDraw | any) => {
		const base64Image = canvas?.canvasContainer.childNodes[1].toDataURL();
		setDrawing(base64Image);
	};

	const mintImage = () => {
		console.log(drawing);
		setSaveData({
			title: 'Mint canvas as...',
			desc: 'Let’s give your canvas a unique name or mint it with default.',
			drawlName: 'Drawl #1020',
		});
		dispatch(setOpenSavePopup(true));
	};

	return (
		<>
			<Header />
			{openedDrawPopup ? <SavePopup {...saveData} /> : <DrawPopup />}
			<div className={cn(styles.content, nightMode && styles.night)}>
				<div className={styles.wrapper}>
					<div className={styles.breadcrumbs}>
						<img className={styles.arrow_img} src={icons.Arrow} alt='arrow' />
						<span className={styles.breadcrumbs_text}>All canvases</span>
					</div>
					<div className={styles.canvas_wrap}>
						<h3 className={styles.canvas_title}>Untitled</h3>
						<ul className={styles.colors}>
							{COLORS.map((color) => {
								return (
									<li
										key={color}
										className={cn(
											styles.colors_item,
											brushColor === color && styles.active_color
										)}
										onClick={() => setBrushColor(color)}
									>
										<span
											className={styles.colors_item_value}
											style={{ background: color }}
										></span>
									</li>
								);
							})}
						</ul>
						<CountDown className={styles.time_wrap} />
						<CanvasDraw
							disabled={pause || over}
							className={styles.canvas}
							style={
								format === FORMATS.SQUARE
									? { width: '100%', height: 'auto', aspectRatio: '1/1' }
									: { width: '100%', height: 'auto', aspectRatio: '16/9' }
							}
							hideGrid={true}
							brushColor={brushColor}
							lazyRadius={0}
							brushRadius={brushRadius}
							onChange={(canvas) => changeCanvasImage(canvas)}
						/>
						<div className={styles.settings_wrap}>
							<div className={styles.settings}>
								{/* <div>
									<span>Radius</span>
									<input
										min='2'
										max='50'
										type='range'
										onChange={(event) => {
											setBrushRadius(+event.target.value);
										}}
									/>
								</div> */}
								<ul className={styles.settings_list}>
									<li className={styles.settings_list_item}></li>
									<li className={styles.settings_list_item}></li>
									<li className={styles.settings_list_item}></li>
									<li className={styles.settings_list_item}></li>
								</ul>
							</div>
							<DefaultButton
								className='no_wide_primary_small'
								title={'Mint'}
								onClick={mintImage}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Studio;
