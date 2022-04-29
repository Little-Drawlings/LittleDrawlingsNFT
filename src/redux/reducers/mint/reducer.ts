import {IAction} from '../../types/actions';
// import MINT_TYPES from './types';

const initialState = {
    test: ''
};

const mintReducer = (state = initialState, action: IAction<string>) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default mintReducer;
