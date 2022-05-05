import { IAction } from '../../types/actions';
import MINT_TYPES from './types';

const initialState = {
	goesTime: false,
	mintFormat: '',
};

const mintReducer = (
	state = initialState,
	action: IAction<string | boolean>
) => {
	switch (action.type) {
		case MINT_TYPES.SET_TIME:
			return {
				...state,
				goesTime: action?.data,
			};
		case MINT_TYPES.SET_FORMAT:
			return {
				...state,
				mintFormat: action?.data,
			};
		default:
			return state;
	}
};

export default mintReducer;
