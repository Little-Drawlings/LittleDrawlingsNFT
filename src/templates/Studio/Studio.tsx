import React, { useEffect, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';
import CountDown from '../../components/CountDown';
import DrawPopup from '../../components/Popups/DrawPopup';
import SavePopup from '../../components/Popups/SavePopup';

import { FORMATS, HEADER_BG } from '../../constants/data';
import { SavePopupProps } from '../../redux/types/data';
import { RootState } from '../../redux/reducers';
import icons from '../../constants/icons';

import styles from './Studio.module.scss';

const Studio: React.FC = () => {
	const [drawing, setDrawing] = useState();
	const [brushColor, setBrushColor] = useState('#FCA5A5');
	const [brushRadius, setBrushRadius] = useState(5);
	const [format, setFormat] = useState(FORMATS.RECTANGLE);
	const [saveData, setSaveData] = useState<SavePopupProps>({
		title: '',
		desc: '',
		drawlName: '',
		isOpenPopup: false,
	});

	const pause = useSelector((state: RootState) => state?.mintReducer.mintPause);

	const over = useSelector((state: RootState) => state?.mintReducer.mintOver);

	const openedDrawPopup = useSelector((state: RootState) => state?.mintReducer.openedDrawPopup);

	const activeFormat = useSelector(
		(state: RootState) => state?.mintReducer.mintFormat
	);

	useEffect(() => {
		setFormat(activeFormat);
	}, [activeFormat]);

	useEffect(() => {
		if (over) {
			setSaveData({
				title: 'Time is up!',
				desc: 'Save your canvas or mint as...',
				drawlName: 'Drawl #1020',
				isOpenPopup: false
			});
		}
	}, [over]);

	const changeCanvasImage = (canvas: CanvasDraw | any) => {
		const base64Image = canvas?.canvasContainer.childNodes[1].toDataURL();
		setDrawing(base64Image);
	};

	const mintImage = () => {
		console.log(drawing);
		alert(drawing);
	};

	return (
		<>
			<Header background={HEADER_BG.WHITE} />
			{!openedDrawPopup && <DrawPopup />}
			<SavePopup {...saveData} />
			<div className={styles.content}>
				<div className={styles.breadcrumbs}>
					<img className={styles.arrow_img} src={icons.Arrow} alt='arrow' />
					<span className={styles.breadcrumbs_text}>Back to all canvases</span>
				</div>
				<div className={styles.canvas_wrap}>
					<h3 className={styles.canvas_title}>Untitled</h3>
					<div className={styles.settings}>
						<div>
							<span>Color</span>
							<input
								type='color'
								value={brushColor}
								onChange={(event) => {
									setBrushColor(event.target.value);
								}}
							/>
						</div>
						<div>
							<span>Radius</span>
							<input
								min='2'
								max='50'
								type='range'
								onChange={(event) => {
									setBrushRadius(+event.target.value);
								}}
							/>
						</div>
						<CountDown />
					</div>
					<CanvasDraw
						disabled={pause || over}
						className={styles.canvas}
						style={
							format === FORMATS.SQUARE
								? { width: '60%', height: '60vh' }
								: { width: '100%', height: '60vh' }
						}
						hideGrid={true}
						brushColor={brushColor}
						lazyRadius={0}
						brushRadius={brushRadius}
						onChange={(canvas) => changeCanvasImage(canvas)}
					/>
					<DefaultButton
						className='mint_button'
						title={'Mint'}
						onClick={mintImage}
					/>
				</div>
			</div>
		</>
	);
};

export default Studio;
