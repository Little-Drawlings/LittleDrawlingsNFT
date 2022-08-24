import { IAction } from '../../types/actions';
import DRAWL_TYPES from './types';

const initialState = {
	activeDrawl: {},
	drawls: []
};

const drawlReducer = (
	state = initialState,
	action: IAction<string | boolean>
) => {
	switch (action.type) {
		case DRAWL_TYPES.GET_DRAWL:
			return {
				...state,
				activeDrawl: action?.data,
			};
		case DRAWL_TYPES.GET_ALL_DRAWLS:
			return {
				...state,
				drawls: action?.data,
			};
		default:
			return state;
	}
};

export default drawlReducer;
