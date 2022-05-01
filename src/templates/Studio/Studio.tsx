import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

import Header from '../../components/Header';
import DefaultButton from '../../components/Buttons/DefaultButton';

import { HEADER_BG } from '../../constants/data';
import icons from '../../constants/icons';

import styles from './Studio.module.scss';

const Studio: React.FC = () => {
	const [drawing, setDrawing] = useState();
	const [brushColor, setBrushColor] = useState('#FCA5A5');
	const [brushRadius, setBrushRadius] = useState(5);

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
					</div>
					<CanvasDraw
						className={styles.canvas}
						style={{ width: '100%', height: '60vh' }}
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
