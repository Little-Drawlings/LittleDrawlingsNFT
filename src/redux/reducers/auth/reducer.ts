import { IAction } from '../../types/actions';
import types from './types';

const initialState = {
	metaMaskData: null
};

const authReducer = (
	state = initialState,
	action: IAction<string | boolean>
) => {
	switch (action.type) {
		case types.SIGN_IN_METAMASK:
			return {
				...state,
				metaMaskData: action?.data,
			};
		default:
			return state;
	}
};

export default authReducer;
