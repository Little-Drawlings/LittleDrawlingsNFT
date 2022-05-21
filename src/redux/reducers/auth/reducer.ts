import { IAction } from '../../types/actions';

const initialState = {
};

const authReducer = (
	state = initialState,
	action: IAction<string | boolean>
) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default authReducer;
