import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'
import mintReducer from './mint/reducer';
import { MintAppState } from './../types/store';

const rootPersistConfig = {
	key: 'root',
	storage: sessionStorage
};

export interface RootState {
    mintReducer: MintAppState;
}

const rootReducer = combineReducers({
	mintReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
