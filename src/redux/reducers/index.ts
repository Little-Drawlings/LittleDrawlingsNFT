import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { AuthAppState, DrawlAppState, MintAppState } from './../types/store';
import mintReducer from './mint/reducer';
import drawlReducer from './drawl/reducer';
import authReducer from './auth/reducer';

const rootPersistConfig = {
	key: 'root',
	storage: sessionStorage
};

export interface RootState {
	mintReducer: MintAppState;
	drawlReducer: DrawlAppState;
	authReducer: AuthAppState
}

const rootReducer = combineReducers({
	mintReducer,
	drawlReducer,
	authReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
