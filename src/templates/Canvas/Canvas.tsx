import React, { useEffect, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import Header from '../../components/Header';
import DefaultButton from '../../components/DefaultButton';
import CountDown from '../../components/CountDown';
import DrawPopup from '../../components/Popups/DrawPopup';
import SavePopup from '../../components/Popups/SavePopup';

import { COLORS, dataUrlToFile, FORMATS, INSTRUMENTS } from '../../constants/data';
import { SavePopupProps } from '../../redux/types/data';
import { RootState } from '../../redux/reducers';
import icons from '../../constants/icons';
import { setOpenSavePopup } from '../../redux/actions/mint';

import styles from './Canvas.module.scss';
import { create, IPFSHTTPClient } from 'ipfs-http-client';


const Canvas: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [drawing, setDrawing] = useState<string>('');
	const [brushColor, setBrushColor] = useState<string>(COLORS[0]);
	const [brushRadius, setBrushRadius] = useState<number>(5);
	const [format, setFormat] = useState<string>(FORMATS.RECTANGLE);
	const [nightMode, setNightMode] = useState<boolean>(false);
	const [saveData, setSaveData] = useState<SavePopupProps | null>(null);
	const [instrument, setInstrument] = useState(INSTRUMENTS.PENCIL);
	const mintTime = useSelector((state: RootState) => state?.mintReducer.time);
	const activeDrawl = useSelector((state: RootState) => state?.drawlReducer.activeDrawl);
	const [time, setTime] = useState<number>(0);
	const openedDrawPopup = useSelector(
		(state: RootState) => state?.mintReducer.openedDrawPopup
	);
	const [drawPopup, setDrawPopup] = useState<boolean>(openedDrawPopup);

	let ipfs: IPFSHTTPClient | undefined;
	try {
		ipfs = create({
			url: "https://ipfs.infura.io:5001/",
		});
	} catch (error) {
		console.error("IPFS error ", error);
		ipfs = undefined;
	}

	useEffect(() => {
		if (mintTime) {
			setTime(mintTime);
		}
	}, [mintTime]);

	useEffect(() => {
		if (activeDrawl) {
			setDrawPopup(true)
			setDrawing(activeDrawl?.image)
			setTime(activeDrawl.time)
		}

	}, [activeDrawl])

	const pause = useSelector((state: RootState) => state?.mintReducer.mintPause);

	const over = useSelector((state: RootState) => state?.mintReducer.mintOver);

	const activeFormat = useSelector(
		(state: RootState) => state?.mintReducer.mintFormat
	);

	const nightModeMint = useSelector(
		(state: RootState) => state?.mintReducer.nightMode
	);

	let modify: CanvasDraw | null;

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
				drawl: drawing,
				format: format,
				time: time
			});
			dispatch(setOpenSavePopup(true));
		}
		if (!drawPopup) {
			dispatch(setOpenSavePopup(false));
		}
	}, [dispatch, over, drawPopup, drawing, format, time]);

	const changeCanvasImage = (canvas: CanvasDraw | any) => {
		const base64Image = canvas?.canvasContainer.childNodes[1].toDataURL();
		setDrawing(base64Image);
	};

	const mintImage = async () => {
		setDrawPopup(true)
		setSaveData({
			title: 'Mint canvas as...',
			desc: 'Let’s give your canvas a unique name or mint it with default.',
			drawlName: 'Drawl #1020',
			drawl: drawing,
			format: format,
			time: time
		});
		dispatch(setOpenSavePopup(true));
		const imgFile: File = await dataUrlToFile(drawing, 'Drawl', 'image/png');
		console.log(imgFile);
		const result = await (ipfs as IPFSHTTPClient).add(imgFile);
		console.log(result);
		console.log(drawPopup, saveData);
		

	};

	const squareFormat = format === FORMATS.SQUARE;

	const pencil = () => {
		setInstrument(INSTRUMENTS.PENCIL);
		brushColor === '#fff'
			? setBrushColor(COLORS[0])
			: setBrushColor(brushColor.slice(0, -2));
	};

	const pencilBrush = () => {
		setInstrument(INSTRUMENTS.PENCIL_BRUSH);
		brushColor === '#fff'
			? setBrushColor(COLORS[0].concat('7F'))
			: setBrushColor(brushColor.concat('7F'));
	};

	const eraser = () => {
		setInstrument(INSTRUMENTS.ERASER);
		setBrushColor('#fff');
	};

	const setActiveColor = (color: string) => {
		if (instrument === INSTRUMENTS.ERASER) {
			setInstrument(INSTRUMENTS.PENCIL);
		}
		instrument === INSTRUMENTS.PENCIL_BRUSH
			? setBrushColor(color.concat('7F'))
			: setBrushColor(color);
	};

	const currentFixColor =
		instrument === INSTRUMENTS.PENCIL_BRUSH
			? brushColor.slice(0, -2)
			: brushColor;

	return (
		<>
			<Header />
			{!ipfs && (
				<p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
			)}
			{drawPopup && saveData ? <SavePopup {...saveData} /> : !drawing ? <DrawPopup /> : null}
			<div className={cn('content', nightMode && 'night')}>
				<div className={styles.wrapper}>
					<div
						className={styles.breadcrumbs}
						onClick={() => navigate('/studio')}
					>
						<img className={styles.arrow_img} src={icons.Arrow} alt='arrow' />
						<span className={styles.breadcrumbs_text}>All canvases</span>
					</div>
					<div className={styles.canvas_wrap}>
						<ul className={cn(styles.colors, squareFormat && styles.square_colors)}>
							{COLORS.map((color) => {
								return (
									<li
										key={color}
										className={cn(
											styles.colors_item,
											currentFixColor === color && styles.active_color
										)}
										onClick={() => setActiveColor(color)}
									>
										<span
											className={styles.colors_item_value}
											style={{ background: color }}
										></span>
									</li>
								);
							})}
						</ul>
						<CountDown className={cn(styles.time_wrap, squareFormat && styles.square_time_wrap)} />
						<CanvasDraw
							ref={(canvasDraw) => (modify = canvasDraw)}
							disabled={pause || over}
							className={cn(
								styles.canvas,
								squareFormat && styles.square_canvas
							)}
							imgSrc={drawing}
							style={
								squareFormat
									? {
										width: '100%',
										minWidth: '50vw',
										height: 'auto',
										maxHeight: '100vh',
										aspectRatio: '1/1',
									}
									: {
										width: '100%',
										minWidth: '70vw',
										height: 'auto',
										maxHeight: '100vh',
										aspectRatio: '16/9',
									}
							}
							hideGrid={true}
							brushColor={brushColor}
							catenaryColor={brushColor}
							lazyRadius={0}
							brushRadius={brushRadius}
							onChange={(canvas) => changeCanvasImage(canvas)}
						/>
						<div className={styles.settings_wrap}>
							<div className={styles.settings}>
								<ul className={styles.settings_list}>
									<li
										className={cn(
											styles.settings_list_item,
											instrument === INSTRUMENTS.PENCIL &&
											styles.settings_list_item_active
										)}
										onClick={pencil}
									>
										<img
											className={styles.settings_image}
											src={icons.ToolbarPencil}
											alt='ToolbarPencil'
										/>
									</li>
									<li className={styles.settings_list_item}>
										<input
											className={styles.brash}
											min={2}
											max={50}
											type='range'
											onChange={(event) => {
												setBrushRadius(+event.target.value);
											}}
										/>
									</li>
									<li
										className={cn(
											styles.settings_list_item,
											instrument === INSTRUMENTS.PENCIL_BRUSH &&
											styles.settings_list_item_active
										)}
										onClick={pencilBrush}
									>
										<img
											className={styles.settings_image}
											src={icons.ToolbarBrush}
											alt='ToolbarBrush'
										/>
									</li>
									<li
										className={cn(
											styles.settings_list_item,
											instrument === INSTRUMENTS.ERASER &&
											styles.settings_list_item_active
										)}
										onClick={eraser}
									>
										<img
											className={styles.settings_image}
											src={icons.ToolbarShadow}
											alt='ToolbarShadow'
										/>
									</li>
									<li
										className={styles.settings_list_item}
										onClick={() => modify?.undo()}
									>
										Undo
									</li>
									<li
										className={styles.settings_list_item}
										onClick={() => modify?.clear()}
									>
										Clear
									</li>
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

export default Canvas;
