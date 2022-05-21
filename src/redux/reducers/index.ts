import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { DrawlAppState, MintAppState } from './../types/store';
import mintReducer from './mint/reducer';
import drawlReducer from './drawl/reducer';

const rootPersistConfig = {
	key: 'root',
	storage: sessionStorage
};

export interface RootState {
	mintReducer: MintAppState;
	drawlReducer: DrawlAppState
}

const rootReducer = combineReducers({
	mintReducer,
	drawlReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
