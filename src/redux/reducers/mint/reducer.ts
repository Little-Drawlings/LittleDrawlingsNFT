import { IAction } from '../../types/actions';
import MINT_TYPES from './types';

const initialState = {
	time: 0,
	mintFormat: '',
	mintPause: false,
	mintOver: false,
	openDrawPopup: false,
	openSavePopup: false,
	nightMode: false,
	balance: ''
};

const mintReducer = (
	state = initialState,
	action: IAction<string | boolean>
) => {
	switch (action.type) {
		case MINT_TYPES.SET_BALANCE:
			return {
				...state,
				balance: action?.data,
			};
		case MINT_TYPES.SET_NIGHT_MODE:
			return {
				...state,
				nightMode: action?.data,
			};
		case MINT_TYPES.SET_TIME:
			return {
				...state,
				time: action?.data,
			};
		case MINT_TYPES.SET_FORMAT:
			return {
				...state,
				mintFormat: action?.data,
			};
		case MINT_TYPES.SET_MINT_OVER:
			return {
				...state,
				mintOver: action?.data,
			};
		case MINT_TYPES.SET_MINT_PAUSE:
			return {
				...state,
				mintPause: action?.data,
			};
		case MINT_TYPES.SET_OPEN_DRAW_POPUP:
			return {
				...state,
				openDrawPopup: action?.data,
			};
		case MINT_TYPES.SET_OPEN_SAVE_POPUP:
			return {
				...state,
				openSavePopup: action?.data,
			};
		default:
			return state;
	}
};

export default mintReducer;
